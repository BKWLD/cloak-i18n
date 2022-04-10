import { addPluginAfter } from '@cloak-app/utils'

// Nuxt config
export default {

	// Load boilerplate and this package's module
	buildModules: [
		'@cloak-app/boilerplate',
		'@cloak-app/demo-theme',
	],
	modules: [
		'../nuxt',
		'@cloak-app/craft',
		'@nuxt/content',
	],

	// Cloak settings
	cloak: {

		// Boilerplate settings
		boilerplate: {
			siteName: '@cloak-app/i18n demo',
		},

		// Example settings for this package
		i18n: {

			// Default to French for demo
			currentCode: 'fr',

			// Testing with English and French
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
			],

			// The mocked data uses the "Articles" category
			craft: {
				categories: [
					'Articles'
				]
			}
		}
	},

	// Load plugin that mocks Craft data
	extendPlugins(plugins) {
		return addPluginAfter(plugins, 'craft-client', '~/plugins/mock-craft')
	}
}
