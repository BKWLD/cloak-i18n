<!-- A locale in the local selector -->

<template lang='pug'>

.locale

	//- Flag icon
	a(:href='url'): img.flag(:src='flag')

	//- Country name
	a.county(:href='url') {{ locale.country }}

	//- Optional language selector
	.languages(v-if='languageLocales.length > 1')
		a.language(
			v-for='languageLocale in languageLocales'
			:key='languageLocale.languageCode'
			:href='switchLocalePath(languageLocale.code)')
			| {{ languageLocale.languageCode }}

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
export default

	props:
		locale: Object # The locale object
		languageLocales: # List of alternative language options for the locale
			type: Array
			default: -> []

	data: -> flag: null # Will store the path to the flag

	# Load image from flag-icons NPM package
	created: ->
		@flag = await import("flag-icons/flags/4x3/#{@locale.countryCode}.svg")
		@flag = @flag.default if @flag.default

	computed:

		# The primary url for the locale
		url: -> @switchLocalePath @locale.code

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped>

.locale
	flex-center()

.flag
	height 1em
	margin-right 0.5em

.languages
	flex-center()

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
