<!-- A simple demo that translations are working -->

<template lang='pug'>

button.translations-demo
	| {{ $t('articles.read') }}
	|  ({{ $n(21.99, 'currency') }})

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped>

.translations-demo
	border 1px solid currentColor
	padding 0.5em 1em
	border-radius 0.5em

</style>
