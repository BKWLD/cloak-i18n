###
Render the i18n block from Craft block data
###
export default
	functional: true
	props: block: Object
	render: (create, { props: { block }, data }) ->
		create 'cloak-i18n-block', {
			...data
			props: block
		}
