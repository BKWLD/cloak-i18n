import { addPluginAfter } from '@cloak-app/utils'
import { makeCraftMock } from './plugins/mock-craft'
import { LOCALES } from './services/i18n'

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
			locales: LOCALES,

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
