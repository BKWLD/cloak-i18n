<!-- Renders a select menu for choosing a locale -->

<template lang='pug'>

//- Wrap in dropdown component
cloak-i18n-locale-selector-dropdown.locale-selector

	//- The Button that opens the dropdown
	template(#toggle)
		cloak-i18n-locale(
			is-label
			:locale='locale'
			:language-locales='currentLocaleLanguages')

	//- Make the list of locales
	ul.locales: li(
		v-for='locales, countryCode of otherLocalesByCountry'
		:key='countryCode')

		//- A locale option
		cloak-i18n-locale(
			:locale='locales[0]'
			:language-locales='locales')

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
import groupBy from 'lodash/groupBy'
export default

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

		# Get locales besides that for the current country
		otherLocales: -> @locales.filter (locale) =>
			locale.countryCode != @locale.countryCode

		# Group the locales list by country, ignoring current locale
		otherLocalesByCountry: -> groupBy @otherLocales, 'countryCode'

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
	padding-h cloak-i18n-locale-selector-toggle-padding-h
	> :not(:first-child)
		margin-top cloak-i18n-locale-selector-options-padding-v

</style>
