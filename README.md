# @cloak-app/i18n

Localization conventions for Cloak + Craft.

- [View demo](https://cloak-i18n.netlify.app)
- [Edit CodeSandbox](https://githubbox.com/BKWLD/cloak-i18n)

## Install

1. Install with `yarn add @cloak-app/i18n`
2. Add to `nuxt.config` with `buildModules: ['@cloak-app/i18n/nuxt']`
3. Install and configure a Cloak CMS package, like [`@cloak-app/craft`](https://github.com/BKWLD/cloak-craft).
  - CMS packages **must** be added *after* the `@cloak-app/i18n/nuxt` module in `buildModules` so that their injected clients are available to the [`fetch-translations.coffee`](./plugins/fetch-translations.coffee) plugin.
  - Currently only `@cloak-app/craft` is supported

### Dependencies

- This package expects that there is a unique Netlify Site for every locale.  In other words, when you switch locales, you are switching domains.
- If using Craft, you're expected to use the [Translations Admin](https://plugins.craftcms.com/translations-admin) plugin fror static translations.

### Module Options

- `cloak.i18n:`
  - `currentCode` - The `code` code (see the `locales` object) of the **current** locale.  Defaults to `process.env.LOCALE_CODE` and then `process.env.CMS_SITE` (which gets auto kebab-cased).  See the [@nuxtjs/i18n `defaultLocale` option](https://i18n.nuxtjs.org/options-reference/#defaultlocale).
  - `locales` - An array of objects for defining the list of supported locales. This array is similar to the [@nuxtjs/i18n `locales` option](https://i18n.nuxtjs.org/options-reference/#locales). The objects look like:
    ```js
    {
      name: 'English',
      code: 'en', // Should be an ISO code
      domain: 'cloak-i18n.netlify.app'
    }
    ```
  - `craft.categories` - An array of category titles from [Translations Admin](https://plugins.craftcms.com/translations-admin).  If undefined, it's treated as `["site"]` by Translations Admin.

## Components

### `<cloak-i18n-locale-selector />`

Renders a select-style menu for choosing a locale.

## Contributing

Run `yarn dev` to open a Nuxt dev build of [the demo directory](./demo).
