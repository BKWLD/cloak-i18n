# [@cloak-app/i18n](https://github.com/BKWLD/cloak-i18n)

## Locale Switcher

This locale switcher component comes with the package.

<cloak-i18n-locale-selector>
</cloak-i18n-locale-selector>

```vue
<cloak-i18n-locale-selector />
```

## Using Translations

This component uses `$t()` to resolve the button text using static string translation via [`@nuxtjs/i18n`](https://i18n.nuxtjs.org).  You can edit the `currentCode` in [`nuxt.config.js`](https://github.com/BKWLD/cloak-i18n/blob/master/demo/nuxt.config.js) to switch languages.

<translations-demo></translations-demo>

```vue
<button class="translations-demo">
  {{ $t('articles.read') }}
</button>
```

## Usage Outside of Nuxt

[This demo](./external.html) shows how to consume static JSON rendered by this package with a manually bootstrapped instance of vue-i18n for usage outside of Nuxt.  Be sure to read the source of [app.coffee](https://github.com/BKWLD/cloak-i18n/blob/master/demo/external/app.coffee) which is used to generate the JS in that demo.
