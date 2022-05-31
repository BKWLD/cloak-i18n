
/**
 * Take an array of @cloak-app/i18n locales and format them like VueI18n expects
 * for it's numberFormats option
 * https://kazupon.github.io/vue-i18n/guide/number.html#custom-formatting
 */
export function makeNumberFormats(locales) {
	return Object.fromEntries(locales

		// Remove locales with no currency
		.filter(({ currency }) => !!currency)

		// Create array expected by fromEntries
		.map(({ code, currency }) => ([
			code,
			{
				currency: {
					style: 'currency',
					currency,
				}
			}
		]))
	)
}
