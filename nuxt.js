import { join, dirname } from 'path'
import { writeFileSync, mkdirSync } from 'fs'
import defaultsDeep from 'lodash/defaultsDeep'
import { requireOnce, setPublicDefaultOptions } from '@cloak-app/utils'
import kebabCase from 'lodash/kebabCase'
import snakeCase from 'lodash/snakeCase'
import consola from 'consola'
import { fetchCraftTranslations } from './plugins/fetch-translations'
export default function() {

	// Make a consola scope
	const log = consola.withTag('@cloak-app/i18n')

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
			file: join(__dirname, 'plugins/fetch-translations.js'),
		}))
	}})

	// Add the @nuxtjs/i18n module
	requireOnce(this, '@nuxtjs/i18n')

	// SSG unique JSON files for each locale's static translations
	if (this.options.cloak.i18n.generateJson) {
		this.nuxt.hook('generate:done', async function ({ options, distPath }) {
			log.info(`Creating ${locales.length} static string JSON files`)

			// Make a Craft client since we don't have access to the context here and
			// can't access the instance built by the @cloak-app/craft plugin. I'm
			// doing a dynamic import of @cloak-app/craft to lookahead to future
			// support of multiple adapters that I don't want to be explicit
			// dependencies of the package. This also supports using a mock for
			// testing.
			const $config = options.publicRuntimeConfig,
				{ makeCraftClient } = await import('@cloak-app/craft/factories'),
				$craft = options.craftMock || makeCraftClient($config.cloak.craft)

			// Loop through all locales...
			await Promise.all(locales.map(async locale => {

				// Get the static string JSON from the CMS
				const translations = await fetchCraftTranslations({
					$craft, locale,
					categories: $config.cloak.i18n.craft.categories,
				})

				// Write the data file
				const fileName = join(distPath, 'i18n', `${locale.code}.json`)
				mkdirSync(dirname(fileName), { recursive: true })
				writeFileSync(fileName, JSON.stringify(translations))
			}))

			// All done
			log.success('Created all static string JSON files')
		})
	}
}

// Required for published modules
module.exports.meta = require('./package.json')
