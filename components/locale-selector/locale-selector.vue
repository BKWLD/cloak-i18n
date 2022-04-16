<!-- Renders a i18n block -->

<template lang='pug'>

.locale-selector

	//- The Button that opens the dropdown
	button.current-locale
		cloak-i18n-locale(:locale='locale')


	//-
		li(v-for='locale in $i18n.locales' :key='locale.code')
			a(:href='switchLocalePath(locale.code)')
				| {{ locale.countryCode ? $t(`locale_selector.countries.${locale.countryCode}`) : '' }}
				| {{ $t(`locale_selector.languages.${locale.languageCode}`) }}

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

.current-locale
	border 1px solid currentColor
	flex-center()
	height 2em
	padding 1em
	border-radius 0.5em

</style>
