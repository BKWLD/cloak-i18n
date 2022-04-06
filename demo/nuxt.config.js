// Nuxt config
export default {

	// Load boilerplate and this package's module
	buildModules: [
		'../nuxt',
		'@cloak-app/boilerplate/nuxt',
		'@cloak-app/demo-theme/nuxt',
	],

	// Cloak settings
	cloak: {

		// Boilerplate settings
		boilerplate: {
			siteName: '@cloak-app/i18n demo',
		},

		// Example settings for this package
		i18n: {
			locales: [
				{
					name: 'English',
					code: 'en',
					domain: 'cloak-i18n.netlify.app'
				},
				{
					name: 'French',
					code: 'fr',
					domain: 'cloak-i18n-fr.netlify.app'
				},
			]
		}
	},

	// @nuxt/content can't be loaded from module
	modules: ['@nuxt/content'],
}
