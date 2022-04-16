<!-- Simple dropdown / select functionality -->

<template lang='pug'>

.dropdown

	//- The button that toggles open and closed
	button.toggle(:class='{ open }' @click='open = !open')
		slot(name='toggle')

	//- The items in the dropdown
	.slot(v-if='open'): slot

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
export default

	data: -> open: false

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped>

.toggle
	border 1px solid currentColor
	flex-center()
	height 2em
	padding-h 1em
	border-radius 0.5em

</style>
