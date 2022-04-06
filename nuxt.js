import { join } from 'path'
import defaultsDeep from 'lodash/defaultsDeep'
import kebabCase from 'lodash/kebabCase'
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
	defaultsDeep(this.options, { cloak: { i18n: {
		currentCode: defaultLocaleCode,
		locales: [{
			name: 'English',
			code: defaultLocaleCode,
			domain: process.env.URL,
			craft: {
				categories: undefined
			},
		}],
	}}})

	// Relay package options to runtime config
	defaultsDeep(this.options.publicRuntimeConfig, {
		cloak: { i18n: this.options.cloak.i18n }
	})

	// Configure @nuxtjs/i18n
	const { currentCode, locales } = this.options.cloak.i18n
	defaultsDeep(this.options, { i18n: {

		// Support domain based locales
		differentDomains: true,
		detectBrowserLanguage: false,
		vuex: false,

		// This was throwing errors
		parsePages: false,

		// Set the current locale based on the CMS_SITE env var.  Fallback to the
		// en-US locale when one isn't provided.
		lazy: true, // Only loads one locale
		defaultLocale: currentCode,

		// Configure where to load static strings from.
		langDir: '~/',

		// Massage @cloak-app/i18n locales into the format expected by @nuxtjs/i18n
		locales: locales.map(locale => defaultsDeep(locale, {
			iso: locale.code,
			file: join(__dirname, 'plugins/fetch-translations.coffee'),
		}))
	}})

	// Add the @nuxtjs/i18n module
	this.requireModule('@nuxtjs/i18n')
}

// Required for published modules
module.exports.meta = require('./package.json')
