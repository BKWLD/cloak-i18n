import { join } from 'path'
import defaultsDeep from 'lodash/defaultsDeep'
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

	// Set default options
	defaultsDeep(this.options, { cloak: { i18n: {
		currentCode: process.env.CMS_SITE || 'en',
		locales: [{
			name: 'English',
			code: 'en',
			url: 'https://cloak-i18n.netlify.app',
		}],
	}}})

	// Get the current locale and throw an error if it coudln't be matched
	const { currentCode, locales } = this.options.cloak.i18n;
	// 	currentLocale = this.options.cloak.i18n.locales.find(locale => {
	// 	return locale.code == currentCode
	// })
	// if (!currentLocale) throw `Unexpected locale: ${currentCode}`

	// // Relay package options to runtime config
	// defaultsDeep(this.options.publicRuntimeConfig, { cloak: { i18n: {
	// 	...this.options.cloak.i18n,
	// 	currentLocale,
	// }}})

	// Configure @nuxtjs/i18n
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
			file: join(__dirname, 'build/static-translations.coffee'),
		}))
	}})

	// Add the @nuxtjs/i18n module
	this.requireModule('@nuxtjs/i18n')
}

// Required for published modules
module.exports.meta = require('./package.json')
