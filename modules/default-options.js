import { join } from 'path'
import defaultsDeep from 'lodash/defaultsDeep'
import kebabCase from 'lodash/kebabCase'
import snakeCase from 'lodash/snakeCase'
import { setPublicDefaultOptions } from '@cloak-app/utils'

/**
 * Set default options for this package and nuxt/i18n
 */
export default function() {

	// Use ENV to determine the default locale code.  If it's based on CMS_SITE,
	// we switch to kebab case because Craft sites don't support dashes in
	// handles but ISO codes use them.
	const defaultLocaleCode = process.env.LOCALE_CODE ||
		kebabCase(process.env.CMS_SITE) || 'en'

	// Set default options
	setPublicDefaultOptions(this, 'i18n', {
		currentCode: defaultLocaleCode,
		locales: [{
			code: defaultLocaleCode,
			domain: process.env.URL,
		}],
		generateJson: false,
		craft: {
			categories: undefined
		},
	})

	// Configure @nuxtjs/i18n
	const { currentCode, locales } = this.options.cloak.i18n
	defaultsDeep(this.options, { i18n: {

		// Support domain based locales
		differentDomains: true,
		detectBrowserLanguage: false,

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
			file: join(__dirname, '../plugins/fetch-translations.js'),
		}))
	}})

}
