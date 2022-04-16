/*
 * Fetch static translations from Craft for nuxt/i18n
 */
import snakeCase from 'lodash/snakeCase'
export default async function({i18n, $craft, $config}, localeCode) {

	// Get the iso for the selected locale
	const locale = i18n.locales.find(locale => locale.code == localeCode)

	// Lookup translations given the CMS
	if ($craft) return await fetchCraftTranslations({
		$craft,
		locale,
		categories: $config.cloak.i18n.craft.categories,
	})

	// Require an adapter
	throw "No CMS adapter found for fetching translations"
}

// Query Craft for translation messages
export async function fetchCraftTranslations({$craft, locale, categories}) {

	// Get translations for the locale from Craft
	const response = await $craft.execute({
		query: craftStaticMessagesQuery,
		variables: {
			categories,
			iso: locale.iso,
		}
	})

	// Make nested object expected by nuxt/i18n where messages are contained
	// within category objects
	return response.messages.reduce(function(obj, message) {
		const category = snakeCase(message.category)
		if (!obj[category]) obj[category] = {}
		obj[category][message.key] = message.message || ''
		return obj
	}, {})
}

// Fetch the translations for the locale (specified by iso)
const craftStaticMessagesQuery = `
	query(
		$iso: [String]="en-US"
		$categories: [String]="site") {
		messages: staticMessages(
			language: $iso
			category: $categories
		) {
			key
			message
			category
		}
	}
`
