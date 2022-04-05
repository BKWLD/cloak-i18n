# @cloak-app/i18n

Localization conventions for Cloak + Craft.

- [View demo](https://cloak-i18n.netlify.app)
- [Edit CodeSandbox](https://githubbox.com/BKWLD/cloak-i18n)

## Usage

```vue
<cloak-i18n />
```

## Install

1. Install with `yarn add @cloak-app/i18n`
2. Add to `nuxt.config` with `buildModules: ['@cloak-app/i18n/nuxt']`

### Project Dependencies

- `.max-w*` styles (included in Cloak via `whitespace.styl`)

### Module Options

- `cloak.i18n:`
  - `maxWidthClass` - The default max-width class to use for the block.

## Components

### `cloak-i18n-block`

Renders a Block to be used within a Tower.

- props:
  - `maxWidthClass` - A `max-w-*` class to apply to the block

## Contributing

Run `yarn dev` to open a Nuxt dev build of [the demo directory](./demo).
