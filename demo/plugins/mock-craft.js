/*
 * Mock Axios calls to Craft API
 */
import MockAdapter from 'axios-mock-adapter'
import { makeCraftClient } from '@cloak-app/craft/factories'

// Get translated stubs
import en from '../stubs/en.json'
import es from '../stubs/es.json'
import fr from '../stubs/fr.json'

// Nuxt plugin
export default function ({ $craft }) {
	addMocks($craft)
}

// Make a new Craft instance with mocks
export function makeCraftMock() {
	const $craft = makeCraftClient()
	addMocks($craft)
	return $craft
}

// Add mock to axios instances
export function addMocks(client) {

	// Make mock instance
	const mock = new MockAdapter(client)

	// Listen to all requests...
	mock.onAny().reply(config => {
		const payload = JSON.parse(config.data)

		// Return a json stub based on request vars
		if (payload.variables?.iso.match(/^en/)) return [200, en]
		else if (payload.variables?.iso.match(/^es/)) return [200, es]
		else if (payload.variables?.iso.match(/^fr/)) return [200, fr]

		// A request didn't match expectations
		throw 'Unexepcted request: ' + config.data
	})
}
