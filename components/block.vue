<!-- Renders a i18n block -->

<template lang='pug'>

section.i18n-block(:class='classes') Heya world

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
export default

	props:

		# The max-width class
		maxWidthClass:
			type: String
			default: -> @$config.cloak?.i18N?.blockMaxWidthClass || ''

	computed:

		# Root classes
		classes: -> @maxWidthClass

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped>

.example-block
	border 1px dashed currentColor
	padding 1em
	margin-v 1em

</style>
