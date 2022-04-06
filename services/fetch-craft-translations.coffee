###
Fetch static translations from Craft for nuxt/i18n
###
# import { execute } from 'library/services/craft'
# import snakeCase from 'lodash/snakeCase'
# import getTranslations from 'library/queries/craft/static-translations.gql'
export default ({ i18n, $axios }, localeCode) ->

	console.log('file', $axios)

	# # Get the iso for the selected locale
	# locale = i18n.locales.find ({ code }) -> code == localeCode

	# # Get translations for the locale from Craft
	# response = await execute
	# 	variables: iso: locale.iso
	# 	query: getTranslations

	# # Make nested object expected by nuxt/i18n where messages are contained
	# # within category objects
	# return response.messages.reduce (obj, message) ->
	# 	category = snakeCase message.category
	# 	obj[category] = {} unless obj[category]
	# 	obj[category][message.key] = message.message || ''
	# 	return obj
	# , {}
