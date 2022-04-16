import { addPluginAfter } from '@cloak-app/utils'
import { makeCraftMock } from './plugins/mock-craft'

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

			// Testing with English and French
			locales: [
				{
					code: 'en-US',
					domain: 'https://cloak-i18n.netlify.app'
				},
				{
					code: 'en-CA',
					domain: 'https://cloak-i18n-en-ca.netlify.app'
				},
				{
					code: 'fr-CA',
					domain: 'https://cloak-i18n-fr-ca.netlify.app'
				},
				{
					code: 'es',
					domain: 'https://cloak-i18n-es.netlify.app'
				},
			],

			// Create JSON fields for use in the external demo
			generateJson: true,

			// The mocked data uses the "Articles" category
			craft: {
				categories: [
					'Articles'
				]
			}
		}
	},

	// Make a mock that is used in nuxt hooks of this module
	craftMock: makeCraftMock(),

	// Load plugin that mocks runtime crat data data
	extendPlugins(plugins) {
		return addPluginAfter(plugins, 'craft-client', '~/plugins/mock-craft')
	}
}
