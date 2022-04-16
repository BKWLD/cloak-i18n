<!-- Renders a i18n block -->

<template lang='pug'>

ul.locale-selector
	li(v-for='locale in $i18n.locales' :key='locale.code')
		a(:href='switchLocalePath(locale.code)')
			| {{ locale.countryCode ? $t(`locale_selector.countries.${locale.countryCode}`) : '' }}
			| {{ $t(`locale_selector.languages.${locale.languageCode}`) }}

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
export default {}
</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped>

.locale-selector
	border 1px dashed currentColor
	padding 1em
	margin-v 1em

</style>
