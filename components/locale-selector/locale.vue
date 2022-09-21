<!-- A locale in the local selector -->

<template lang='pug'>

.locale

	//- Conditional link to country
	component.country-link(:is='countryLink' :href='url')

		//- Flag icon
		.flag: img(
			v-if='flag'
			:src='flag'
			:alt='`${locale.country} ${$t("locale_selector.flag")}`')

		//- Country name
		.name {{ name }}

	//- Optional language selector
	.languages(v-if='!listLanguages && languageLocales.length > 1')
		a.language(
			v-for='languageLocale in languageLocales'
			:key='languageLocale.languageCode'
			:aria-label='languageLocale.language'
			:href='makeUrl(languageLocale.code)')
			| {{ languageLocale.languageCode }}

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
export default

	props:
		locale: Object # The locale object
		isLabel: Boolean # Disables links on country
		redirectHome: Boolean # Make links to homepages rather than current page
		listLanguages: Boolean # Display language instead of country names
		languageLocales: # List of alternative language options for the locale
			type: Array
			default: -> []

	computed:

		# Make the name
		name: -> if @listLanguages then @locale.language else @locale.country

		# Make the URL to the flag icon from CDN
		flag: ->
			endpoint = 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.6.2'
			"#{endpoint}/flags/4x3/#{@locale.countryCode}.svg"

		# The element to use on country links
		countryLink: -> if @isLabel then 'span' else 'a'

		# Make the country level link
		url: -> @makeUrl @locale.code unless @isLabel

	methods:

		# Make the URL to a locale code. These helper functions come
		# from @nuxtjs/i18n
		makeUrl: (code) ->
			if @redirectHome
			then @localePath '/', @locale.code
			else @switchLocalePath @locale.code

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped>
@import './vars.styl'

.locale
	display flex
	align-items center
	white-space nowrap // Don't allow width to shrink

// Make a placeholder shape for the flag
.flag
	display inline-block
	width (4/3) * 1em
	height 1em
	background rgba(black, 0.1)

	// Push text to right
	margin-right 0.5em

	// Removes whitespace above image
	line-height 0

.country-link
	flex-center()

// Improve vertical centering of text with respect to flag and button
.name, .languages
	position relative
	top 2px

.languages
	white-space nowrap

.language
	font-size .75em
	text-transform uppercase

	// Seperate languages with bullets
	&:before
		content '•'
		font-size .5em
		margin-h .5em
		display inline-block
		vertical-align middle

</style>
