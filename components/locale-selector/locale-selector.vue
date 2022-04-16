<!-- Renders a select menu for choosing a locale -->

<template lang='pug'>

//- Wrap in dropdown component
cloak-i18n-locale-selector-dropdown.locale-selector

	//- The Button that opens the dropdown
	template(#toggle): cloak-i18n-locale(:locale='locale')

	//- The the choices of locale
	li(v-for='locales, countryCode of localesByCountry' :key='countryCode')
		cloak-i18n-locale(
			:locale='locales[0]'
			:language-locales='locales')

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
import groupBy from 'lodash/groupBy'
export default

	computed:

		# Add extra info to localeslist
		locales: -> @$i18n.locales.map (locale) => {
			...locale
			country: @$t "locale_selector.countries.#{locale.countryCode}"
			language: @$t "locale_selector.languages.#{locale.languageCode}"
		}

		# Group the locales list by country
		localesByCountry: -> groupBy @locales, 'countryCode'

		# Get the current locale object
		locale: -> @locales.find ({ code }) => code == @$i18n.locale

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped>



</style>
