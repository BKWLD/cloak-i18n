<!-- A locale in the local selector -->

<template lang='pug'>

.locale

	//- Flag icon
	img.flag(:src='flag')

	//- Country name
	.county {{ locale.country }}

	//- Optional language selector
	ul.languages(v-if='languages.length > 1')
		li.language(
			v-for='languageLocale in languages'
			:key='languageLocale.languageCode')
			a(:href='switchLocalePath(locale.code)')

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
export default

	props:
		locale: Object # The locale object
		languages: # List of alternative language options for the locale
			type: Array
			default: -> []

	data: -> flag: null # Will store the path to the flag

	# Load image from flag-icons NPM package
	created: ->
		@flag = await import("flag-icons/flags/4x3/#{@locale.countryCode}.svg")
		@flag = @flag.default if @flag.default

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped>

.locale
	flex-center()

.flag
	height 1em
	margin-right 0.5em

</style>
