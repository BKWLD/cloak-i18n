###
Fetch static translations from Craft for nuxt/i18n
###
import snakeCase from 'lodash/snakeCase'
import getTranslations from '../queries/craft-translations.gql'
export default ({ i18n, $craft, $config }, localeCode) ->

	# Get the iso for the selected locale
	locale = i18n.locales.find ({ code }) -> code == localeCode

	# Lookup translations given the CMS
	switch
		when $craft then await fetchCraftTranslations {
			$craft
			locale
			categories: $config.cloak.i18n.craft.categories
		}
		else throw "No CMS adapter found for fetching translations"

# Query Craft for translation messages
fetchCraftTranslations = ({ $craft, locale, categories }) ->

	# Get translations for the locale from Craft
	response = await $craft.execute
		query: getTranslations
		variables: {
			categories
			iso: locale.iso
		}

	# Make nested object expected by nuxt/i18n where messages are contained
	# within category objects
	return response.messages.reduce (obj, message) ->
		category = snakeCase message.category
		obj[category] = {} unless obj[category]
		obj[category][message.key] = message.message || ''
		return obj
	, {}
