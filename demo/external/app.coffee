import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import TranslationsDemo from '../components/translations-demo'
import { LOCALES } from '../services/i18n'

# Instantiate VueI18n to expect french locale
currentLocaleCode = 'fr-CA'
Vue.use VueI18n
i18n = new VueI18n locale: currentLocaleCode

# Add the full locales array where @nuxt/i18n would put it
i18n.locales = LOCALES.map (locale) ->
	[languageCode, countryCode] = locale.code.split('-')
	countryCode = (countryCode || languageCode).toLowerCase()
	{ ...locale, languageCode, countryCode }

# Load translations for async injection. You could also wait to intiialize
# Vue until we have translations to prevent flicker of translation keypath.
axios.get('https://cloak-i18n.netlify.app/i18n/fr-CA.json')
.then ({ data }) -> i18n.mergeLocaleMessage currentLocaleCode, data

# Load translatins from this package
import("@cloak-app/i18n/lang/#{currentLocaleCode}")
.then ({ data }) -> i18n.mergeLocaleMessage currentLocaleCode, data

# Initialize Vue app
new Vue
	el: '#app'
	i18n: i18n
	components: { TranslationsDemo }

