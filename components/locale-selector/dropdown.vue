<!-- Simple dropdown / select functionality -->

<template lang='pug'>

.dropdown

	//- The button that toggles open and closed
	.toggle(:class='{ open }' @click='toggle')
		slot(name='toggle')

		//- Toggle icon slot with default
		.toggle-icon: slot(name='toggle-icon')
			.caret(v-html='defaultToggleIcon')

	//- The items in the dropdown
	transition: .slot(v-if='open'): slot

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
export default

	data: ->
		open: false
		defaultToggleIcon: '''
			<svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m512 176-64-64-192 192-192-192-64 64 255.999 256z"/></svg>
		'''

	methods:

		# Toggle open and closed
		toggle: -> @open = !@open

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped>

.toggle

	// Make a button shape
	button()
	border 1px solid currentColor
	height 2em
	padding-h 1em
	border-radius 0.5em

	// Expand to fill width
	width 100%

	// Align children
	flex-center()

.toggle-icon
	margin-left 2em

.caret

	// Open animation
	transition transform .3s
	.open &
		transform rotate(180deg)

	// Make the icon fit in
	>>> svg
		fill currentColor
		square 0.75em

// Align the slot above
.slot
	position absolute
	top 0
	transform translateY(-100%)
	margin-top -4px // Shift a couple pixels up

	// Make a simple default background
	background rgba(black, .75)
	border-radius 0.5em

	// Animate it in
	&.v-enter-active, &.v-leave-active
		transition opacity .2s, transform .2s
	&.v-enter, &.v-leave-to
		opacity 0
		transform translateY(calc(-100% + 5px))

</style>
