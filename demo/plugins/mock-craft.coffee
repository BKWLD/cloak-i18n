###
Mock Axios calls to Craft API
###
import MockAdapter from 'axios-mock-adapter'

# Get translated mocks
import en from '../mocks/en.json'
import fr from '../mocks/fr.json'
mocks = { en, fr }

# Use the current locale's mocked data
export default ({ $craft, $config }) ->
	mockedResponse = mocks[$config.cloak.i18n.currentCode]
	axiosMock = new MockAdapter $craft
	axiosMock.onAny().reply(200, mockedResponse)
