import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use VueI18n

import TranslationsDemo from '../components/translations-demo'

i18n = new VueI18n
	locale: 'fr'
	messages:
		en: articles: read: 'Read'
		fr: articles: read: 'Lire'

new Vue
	el: '#app'
	i18n: i18n
	components: { TranslationsDemo }

