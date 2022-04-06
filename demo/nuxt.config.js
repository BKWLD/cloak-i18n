// Nuxt config
export default {

	// Load boilerplate and this package's module
	buildModules: [
		'@cloak-app/boilerplate/nuxt',
		'@cloak-app/demo-theme/nuxt',
		'../nuxt',
		'@cloak-app/craft/nuxt',
	],

	// Cloak settings
	cloak: {

		// Boilerplate settings
		boilerplate: {
			siteName: '@cloak-app/i18n demo',
		},

		// Example settings for this package
		i18n: {
			currentCode: 'en-US',
			locales: [
				{
					name: 'English',
					code: 'en-US',
					domain: 'cloak-i18n.netlify.app'
				},
				{
					name: 'French',
					code: 'fr',
					domain: 'cloak-i18n-fr.netlify.app'
				},
			],
			craft: {
				categories: [
					'Articles'
				]
			}
		}
	},

	// @nuxt/content can't be loaded from module
	modules: ['@nuxt/content'],
}
