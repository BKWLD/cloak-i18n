###
Mock Axios calls to Craft API
###
import MockAdapter from 'axios-mock-adapter'

# Get translated stubs
import en from '../stubs/en.json'
import fr from '../stubs/fr.json'
stubs = { en, fr }

# Use the current locale's mocked data
export default ({ $craft, $config }) ->
	mockedResponse = stubs[$config.cloak.i18n.currentCode]
	axiosMock = new MockAdapter $craft
	axiosMock.onAny().reply(200, mockedResponse)
