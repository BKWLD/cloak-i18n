<!-- Renders a select menu for choosing a locale -->

<template lang='pug'>

//- Wrap in dropdown component
cloak-i18n-locale-selector-dropdown.locale-selector

	//- The Button that opens the dropdown
	template(#toggle)
		cloak-i18n-locale(
			is-label
			:locale='locale'
			:language-locales='currentLocaleLanguages'
			:list-languages='listLanguages')

	//- Make the list of locales
	ul.locales: li(
		v-for='locales, countryCode of dropdownLocales'
		:key='countryCode')

		//- A locale option
		cloak-i18n-locale(
			:locale='locales[0]'
			:language-locales='locales'
			:redirect-home='redirectHome'
			:list-languages='listLanguages')

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
import groupBy from 'lodash/groupBy'
export default

	props:
		redirectHome: Boolean # Make links to homepages rather than current page
		listLanguages: Boolean # List language instead of country names

	computed:

		# Get the current locale object
		locale: -> @locales.find ({ code }) => code == @$i18n.locale

		# Get the language locales of the current locale
		currentLocaleLanguages: -> @locales.filter (locale) =>
			locale.countryCode == @locale.countryCode

		# Add extra info to localeslist
		locales: -> @$i18n.locales.map (locale) => {
			...locale
			country: @$t "locale_selector.countries.#{locale.countryCode}"
			language: @$t "locale_selector.languages.#{locale.languageCode}"
		}

		# Make list of locales for the dropdown
		dropdownLocales: ->
			if @listLanguages
			then groupBy @otherLocales, 'languageCode'
			else groupBy @otherLocales, 'countryCode'

		# Get locales besides that for the current country
		otherLocales: -> @locales.filter (locale) =>
			locale.countryCode != @locale.countryCode

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped>
@import './vars.styl'

// Collapse to minimum needed width
.locale-selector
	position relative
	display inline-block

// The container of the locale menu options
.locales
	padding-v cloak-i18n-locale-selector-options-padding-v
	padding-h cloak-i18n-locale-selector-padding-h
	> :not(:first-child)
		margin-top cloak-i18n-locale-selector-options-padding-v

</style>
