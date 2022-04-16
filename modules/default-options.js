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

		// Fallback to english by default
		vueI18n: {
			fallbackLocale: 'en',
		},

		// Configure where to load static strings from.
		langDir: '~/',

		// Massage @cloak-app/i18n locales into the format expected by @nuxtjs/i18n
		locales: locales.map(locale => defaultsDeep(locale, {
			iso: locale.iso || locale.code,
			file: join(__dirname, '../plugins/fetch-translations.js'),

			// Make vars used by Craft (where the site handle is snake-cased)
			site: locale.site || snakeCase(locale.code),

			// Make vars used by locale selector
			countryCode: locale.countryCode || makeCountryCode(locale.code),
			languageCode: locale.languageCode ||  makeLanguageCode(locale.code),
		}))
	}})

}

// If there is a slash in the code, assume the latter part is the country
// code and return it.  This may return null
function makeCountryCode(code) {
	const match = code.match(/\-(\w+)$/)
	if (match) return match[1].toLowerCase()
}
// If there is a slash in the code, assume the former part is the lanuage
// code and return it.  Otherwise, if no slash, assume this is a code for a
// lanaguage only (ie "fr") with no country part
function makeLanguageCode(code) {
	const match = code.match(/^(\w+)\-/)
	if (match) return match[1].toLowerCase()
	else return code
}

