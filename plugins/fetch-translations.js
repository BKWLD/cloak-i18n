/*
 * Fetch static translations from Craft for nuxt/i18n
 */
import snakeCase from 'lodash/snakeCase'
export default async function({ i18n, $craft, $config }, localeCode) {

	// Get the iso for the selected locale
	const locale = i18n.locales.find(locale => locale.code == localeCode)

	// If JSON files are generated and this is being invoked on the client, use
	// those JSON files.
	if ($config.cloak.i18n.generateJson && process.client) {
		try {
			const generateDir = $config._app.basePath || "/";
			const response = await fetch(`${generateDir}i18n/${localeCode}.json`);
			if (!response.ok) throw "Static JSON not found";
			return await response.json();

			// If not found, fallback to the CMS
		} catch (e) {
			console.error(e);
		}
	}

	// Lookup translations given the CMS
	if ($craft) return await fetchCraftTranslations({
		$craft,
		iso: locale.iso,
		categories: $config.cloak.i18n.craft.categories,
	})

	// Require an adapter
	throw "No CMS adapter found for fetching translations"
}

// Query Craft for translation messages
export async function fetchCraftTranslations({$craft, iso, categories}) {

	// Get translations for the locale from Craft
	const response = await $craft.execute({
		query: craftStaticMessagesQuery,
		variables: { categories, iso }
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
