# @cloak-app/i18n

Localization conventions for Cloak + Craft.  This assumes that there is a unique site (aka Netlify app) per locale.

- [View demo](https://cloak-i18n.netlify.app)
- [Edit CodeSandbox](https://githubbox.com/BKWLD/cloak-i18n)

## Usage

```vue
<locale-selector />
```

## Install

1. Install with `yarn add @cloak-app/i18n`
2. Add to `nuxt.config` with `buildModules: ['@cloak-app/i18n/nuxt']`

### Module Options

- `cloak.i18n:`
  - `currentCode` - The `code` code (see the `locales` object) of the **current** locale.  Defaults to `process.env.CMS_SITE`.  See the [@nuxtjs/i18n `defaultLocale` option](https://i18n.nuxtjs.org/options-reference/#defaultlocale).
  - `locales` - An array of objects for defining the list of supported locales. This array is similar to the [@nuxtjs/i18n `locales` option](https://i18n.nuxtjs.org/options-reference/#locales). The objects look like:
    ```js
    {
      name: 'English',
      code: 'en', // Should be an ISO code
      domain: 'cloak-i18n.netlify.app'
    }
    ```

## Components

### `locale-selector`

Renders a select-style menu for choosing a locale.

## Contributing

Run `yarn dev` to open a Nuxt dev build of [the demo directory](./demo).
