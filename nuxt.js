import { join } from 'path'
import { requireOnce } from '@cloak-app/utils'
export default function() {

	// Have Nuxt transpile resources
	this.options.build.transpile.push('@cloak-app/i18n')

	// Allow components to be auto-imported by Nuxt
	this.nuxt.hook('components:dirs', dirs => {
		dirs.push({
			path: join(__dirname, './components'),
			extensions: ['vue', 'js', 'coffee'],
			prefix: 'cloak-i18n',
			level: 2,
		})
	})

	// Set default Nuxt options
	requireOnce(this, join(__dirname, 'modules/default-options'))

	// Add the @nuxtjs/i18n module
	requireOnce(this, '@nuxtjs/i18n')

	// SSG unique JSON files for each locale's static translations
	if (this.options.cloak.i18n.generateJson) {
		requireOnce(this, join(__dirname, 'modules/generate-json'))
	}
}

// Required for published modules
module.exports.meta = require('./package.json')
