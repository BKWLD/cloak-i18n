import { join } from 'path'
import { getFilenames } from '@cloak-app/utils'

/**
 * Setup auto-importing and translation files for locale-selector
 */
export default function() {

	// Allow components to be auto-imported by Nuxt
	this.nuxt.hook('components:dirs', dirs => {
		dirs.push({
			path: join(__dirname, '../components'),
			extensions: ['vue', 'js', 'coffee'],
			prefix: 'cloak-i18n',
			level: 2,
		})
	})

	// Add translation files from this package for locale-selector
	const { locales } = this.options.cloak.i18n
	this.nuxt.hook('i18n:extend-messages', messages => {
		const langDir = join(__dirname, '../lang')
		getFilenames(langDir).forEach(async filename => {

			// Get the lanaguge code from the filename
			const fileLanguageCode = filename.match(/^(\w+)\./)[1]

			// Load the lanaguge code content
			const translations = (await import(join(langDir, filename))).default

			// Key translations to the project locale codes.
			locales.forEach(locale => {
				if (locale.languageCode != fileLanguageCode) return
				messages.push({ [locale.code]: translations })
			})
		})
	})

}
