import { join } from 'path'
import defaultsDeep from 'lodash/defaultsDeep'
import { requireOnce, setPublicDefaultOptions } from '@cloak-app/utils'
import kebabCase from 'lodash/kebabCase'
import snakeCase from 'lodash/snakeCase'
export default function() {

	// Have Nuxt transpile resources
	this.options.build.transpile.push('@cloak-app/i18n')

	// Allow components to be auto-imported by Nuxt
	this.nuxt.hook('components:dirs', dirs => {
		dirs.push({
			path: join(__dirname, './components'),
			extensions: ['vue', 'js', 'coffee'],
			prefix: 'cloak-i18n',
			level: 2,
		})
	})

	// Use ENV to determine the default locale code.  If it's based on CMS_SITE,
	// we switch to kebab case because Craft sites don't support dashes in
	// handles but ISO codes use them.
	const defaultLocaleCode = process.env.LOCALE_CODE ||
		kebabCase(process.env.CMS_SITE) || 'en'

	// Set default options
	setPublicDefaultOptions(this, 'i18n', {
		currentCode: defaultLocaleCode,
		locales: [{
			name: 'English',
			code: defaultLocaleCode,
			domain: process.env.URL,
			craft: {
				categories: undefined
			},
		}],
	})


	// Configure @nuxtjs/i18n
	const { currentCode, locales } = this.options.cloak.i18n
	defaultsDeep(this.options, { i18n: {

		// Support domain based locales
		differentDomains: true,
		detectBrowserLanguage: false,
		strategy: 'no_prefix', // Prevents duplicate routes from being created

		// Conservative defaults
		parsePages: false, // This was throwing errors
		vuex: false, // Not really sure what this does

		// Set the current locale
		lazy: true, // Only loads one locale
		defaultLocale: currentCode,

		// Configure where to load static strings from.
		langDir: '~/',

		// Massage @cloak-app/i18n locales into the format expected by @nuxtjs/i18n
		locales: locales.map(locale => defaultsDeep(locale, {
			iso: locale.iso || locale.code,
			site: locale.site || snakeCase(locale.code), // Helper for Craft sites
			file: join(__dirname, 'plugins/fetch-translations.coffee'),
		}))
	}})

	// Add the @nuxtjs/i18n module
	requireOnce(this, '@nuxtjs/i18n')
}

// Required for published modules
module.exports.meta = require('./package.json')
