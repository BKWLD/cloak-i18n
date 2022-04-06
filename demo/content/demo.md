# [@cloak-app/i18n](https://github.com/BKWLD/cloak-i18n)

## Locale Switcher

This locale switcher component comes with the package.

<cloak-i18n-locale-selector>
</cloak-i18n-locale-selector>


```vue
<cloak-i18n-locale-selector>
</cloak-i18n-locale-selector>
```

## Using Translations

This component uses `$t()` to resolve the button text using static string translation via [`@nuxtjs/i18n`](https://i18n.nuxtjs.org).

<translations-demo></translations-demo>

```vue
<button class="translations-demo">
  {{ $t('articles.read') }}
</button>
```
