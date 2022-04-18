# @cloak-app/i18n

Localization conventions for Cloak + Craft.

- [View demo](https://cloak-i18n.netlify.app)
- [Edit CodeSandbox](https://githubbox.com/BKWLD/cloak-i18n)

## Install

1. Install with `yarn add @cloak-app/i18n`
2. Add to nuxt.config with `modules: ['@cloak-app/i18n']`
3. Install and configure a Cloak CMS package, like [`@cloak-app/craft`](https://github.com/BKWLD/cloak-craft).
    - CMS packages **must** be added *after* the `@cloak-app/i18n` module in `modules` so that their injected clients are available to the [`fetch-translations.coffee`](./plugins/fetch-translations.coffee) plugin.
    - Currently only `@cloak-app/craft` is supported
4. Add `this.$nuxtI18nHead({ addSeoAttributes:true })` to your head, probably in your default layout, as described in [the @nuxtjs/i18n docs](https://i18n.nuxtjs.org/seo/#setup)
    - Adding to the nuxt.config conflicts with [@nuxtjs/gtm](https://github.com/nuxt-community/gtm-module/issues/136)

### Module Options

Set these properties within `cloak: { i18n: { ... } }` in the nuxt.config:

- `currentCode` - The `code` code (see the `locales` object) of the **current** locale.  Defaults to `process.env.LOCALE_CODE` and then `process.env.CMS_SITE` (which converts `_` to `-` to convert Craft handle to ISO code).  See the [@nuxtjs/i18n `defaultLocale` option](https://i18n.nuxtjs.org/options-reference/#defaultlocale).
- `locales` - An array of objects for defining the list of supported locales. This array is similar to the [@nuxtjs/i18n `locales` option](https://i18n.nuxtjs.org/options-reference/#locales). The objects look like:
  ```js
  {
    code: 'en', // Should be an ISO code
    domain: 'https://cloak-i18n.netlify.app'
  }
  ```
- `generateJson` - Boolean to enable static generation of JSON files for each locale's static strings.  You would enable this if you wanted to use the static strings outside of Nuxt, like as part of components that are used in a Shopify theme.  The JSON is written to `/dist/i18n/{code}.json` where `{code}` comes from the `locales` array.
- `craft.categories` - An array of category titles from [Translations Admin](https://plugins.craftcms.com/translations-admin).  If undefined, it's treated as `["site"]` by Translations Admin.

### Project Dependencies

- This package expects that there is a unique Netlify Site for every locale.  In other words, when you switch locales, you are switching domains.
- If using Craft, you're expected to use the [Translations Admin](https://plugins.craftcms.com/translations-admin) plugin fror static translations.

## Usage

### Static Strings

This package uses [@nuxtjs/i18n](https://i18n.nuxtjs.org) which, itself, consumes [`vue-i18n`](https://kazupon.github.io/vue-i18n). Thus, look to their docs for a deeper explanantion for how to translate text. The most common helper you'll use is [`$t()`](https://kazupon.github.io/vue-i18n/api/#vue-injected-methods).  For example:

```vue
<button>{{ $t('articles.read_me') }}</button>
```

### Components

`<cloak-i18n-locale-selector />`

Renders a select-style menu for choosing a locale.

## Contributing

Run `yarn dev` to open a Nuxt dev build of [the demo directory](./demo).
