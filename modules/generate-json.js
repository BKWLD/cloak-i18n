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
	this.nuxt.hook('generate:done', async function ({ options, distPath }) {

		// Log starting
		const $config = options.publicRuntimeConfig,
			locales = $config.cloak.i18n.locales
		log.info(`Creating ${locales.length} static string JSON files`)

		// Make a Craft client since we don't have access to the context here and
		// can't access the instance built by the @cloak-app/craft plugin. I'm
		// doing a dynamic import of @cloak-app/craft to lookahead to future
		// support of multiple adapters that I don't want to be explicit
		// dependencies of the package. This also supports using a mock for
		// testing.
		const { makeCraftClient } = await import('@cloak-app/craft/factories'),
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
