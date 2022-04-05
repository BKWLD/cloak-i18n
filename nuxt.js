import { join } from 'path'
export default function() {

	// Have Nuxt transpile resources
	this.options.build.transpile.push('@cloak-app/i18n')

	// Allow components to be auto-imported by Nuxt
	this.nuxt.hook('components:dirs', dirs => {
		dirs.push({
			path: join(__dirname, './adapters'),
			extensions: ['js', 'coffee'],
			prefix: 'cloak-i18n',
			level: 2,
		})
		dirs.push({
			path: join(__dirname, './components'),
			extensions: ['vue', 'js', 'coffee'],
			prefix: 'cloak-i18n',
			level: 2,
		})
	})

	// Relay package options to runtime config
	this.options.publicRuntimeConfig.cloak = {
		...this.options.publicRuntimeConfig.cloak,
		i18N: {
			blockMaxWidthClass: 'max-w',
			...this.options.cloak?.i18N,
		}
	}
}

// Required for published modules
module.exports.meta = require('./package.json')
