/*
 * Mock Axios calls to Craft API
 */
import MockAdapter from 'axios-mock-adapter'
import { makeCraftClient } from '@cloak-app/craft/factories'

// Get translated stubs
import en from '../stubs/en.json'
import fr from '../stubs/fr.json'
const stubs = { en, fr }

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
		if (payload.variables.iso == 'en') return [200, stubs.en]
		else if (payload.variables.iso == 'fr') return [200, stubs.fr]

		// A request didn't match expectations
		throw 'Unexepcted request'
	})
}
