import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import TranslationsDemo from '../components/translations-demo'

# Instantiate VueI18n to expect french lcoale
Vue.use VueI18n
i18n = new VueI18n locale: 'fr-CA'

# Load translations for async injection. You could also wait to intiialize
# Vue until we have translations to prevent flicker of translation keypath.
axios.get('https://cloak-i18n.netlify.app/i18n/fr-CA.json')
.then ({ data }) -> i18n.setLocaleMessage 'fr-CA', data

# Initialize Vue app
new Vue
	el: '#app'
	i18n: i18n
	components: { TranslationsDemo }

