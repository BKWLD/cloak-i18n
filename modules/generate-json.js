import { join, dirname } from 'path'
import { writeFileSync, mkdirSync } from 'fs'
import { fetchCraftTranslations } from '../plugins/fetch-translations'
import consola from 'consola'

/**
 * Create JSON files of the static string translations for each locale
 */
export default function() {

	// Make a consola scope
	const log = consola.withTag('@cloak-app/i18n')

	// React to geneating:done hook
	const moduleContainer = this
	this.nuxt.hook('generate:done', async function ({ options, distPath }) {

		// Log starting
		log.info(`Creating static string JSON files`)

		// Fetch translations through CMS adapter
		let translations
		if (options.cloak.craft) {
			translations = await getCraftTranslations(moduleContainer)
		} else {
			return log.warn('No CMS adapter found for generating JSON')
		}

		// // Write JSON files
		Object.entries(translations).forEach(([localeCode, messages]) => {
			const fileName = join(distPath, 'i18n', `${localeCode}.json`)
			mkdirSync(dirname(fileName), { recursive: true })
			writeFileSync(fileName, JSON.stringify(messages))
		})

		// All done
		log.success('Created static string JSON files')
	})
}

// Fetch translations from Craft's translations-admin plugin
async function getCraftTranslations(moduleContainer) {

	// Dynamically import Craft client so no explicit import required.
	const { makeModuleCraftClient } = await import('@cloak-app/craft/factories'),
		$craft = makeModuleCraftClient(moduleContainer),

		// Access deep vars
		i18nOptions = moduleContainer.options.cloak.i18n,
		locales = i18nOptions.locales,
		categories = i18nOptions.craft.categories

	// Loop through all locales and return an object with locale code keys and
	// values that are the translation message object
	return Object.fromEntries(await Promise.all(locales.map(async locale => {
		return [locale.code, await fetchCraftTranslations({
			$craft, iso: locale.iso, categories
		})]
	})))
}
