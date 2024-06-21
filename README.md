# Simple Tooltip By StorePress

Tooltip based on css. Only control position based on JS.

- Support `prefers-reduced-motion` for accessibility.
- Support RTL.

## Usages

- `npm install`
- `npm run build`
- Load `./build/tooltip.css`
- Load `./build/tooltip.js`
- Add `data-storepress-tooltip="Tooltip Text"` attribute on any html element.

## Development

- `npm start`
- Please check `./src/tooltip.scss`
- Please check `./src/tooltip.js`

## Custom namespace

Lets create `data-example-tooltip`.

Create `custom-tooltip.scss` file

```scss
@charset "UTF-8";

@import "~@storepress/tooltip/src/mixins";

// 1st arg: $selector is for selector,
// 2nd arg: $content-attribute is for tooltip text attribute.
@include storepress-tooltip-init("[data-example-tooltip]", 'data-example-tooltip')
```

Create `custom-tooltip.js` file

```js
/**
 * External dependencies
 */
import { triggerEvent } from '@storepress/utils'

triggerEvent(document, 'storepress_tooltip_init_with', {
  element: '[data-example-tooltip]',
})

// OR

document.addEventListener('DOMContentLoaded', () => {
  document.dispatchEvent(new CustomEvent('storepress_tooltip_init_with', {
    detail: {
      element: '[data-example-tooltip]',
    },
  }))
})
```

## Re Init and destroy

- Destroy `document.dispatchEvent(new CustomEvent('storepress_tooltip_destroy'))`
- Init `document.dispatchEvent(new CustomEvent('storepress_tooltip_init'))`

