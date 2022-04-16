<!-- A locale in the local selector -->

<template lang='pug'>

.locale-selector-locale

	//- Flag icon

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
		locale: Object
		languages:
			type: Array
			default: -> []

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped>



</style>
