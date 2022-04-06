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

	// Load plugin that mocks Craft data and inject it right after the
	// @cloak-app/craft plugin. This was necessary to ensure that we're mocking
	// before the fetch-translations.coffee.
	extendPlugins(plugins) {
		const craftPluginIndex = plugins.findIndex(
			plugin => plugin.src.includes('plugins.craft')
		)
		plugins.splice(craftPluginIndex + 1, 0, '~/plugins/mock-craft')
		return plugins
	},

	// @nuxt/content can't be loaded from module
	modules: ['@nuxt/content'],
}
