# Simple Tooltip By StorePress

Tooltip based on css. Only control position based on JS.

- Support `prefers-reduced-motion` for accessibility.
- Support RTL.

## Local Usages

- `npm install`
- `npm run build`
- Load `./build/tooltip.css`
- Load `./build/tooltip.js`
- Add `data-storepress-tooltip="Tooltip Text"` attribute on any html element.

## Development

- `npm start`
- Please check `./src/tooltip.scss`
- Please check `./src/tooltip.js`

## Package Usages

```shell
npm i @storepress/tooltip --save
```

Lets create `data-tooltip`.

```html
<span class="tooltip" data-tooltip="Tooltip Contents"></span>
```

Create `custom-tooltip.scss` file

```scss
@charset "UTF-8";

@import "~@storepress/tooltip/src/mixins";

[data-storepress-tooltip] {

  // $content-attribute is for tooltip text attribute.
  @include storepress-tooltip-init("data-tooltip")
}
```

Create `custom-tooltip.js` file

```js
/**
 * External dependencies
 */
import { StorePressTooltip } from '@storepress/tooltip'
import { triggerEvent } from '@storepress/utils'

document.addEventListener('DOMContentLoaded', () => {
  StorePressTooltip();
  triggerEvent(document, 'storepress_tooltip_init_with', {
    element: 'span.tooltip',
  })
});

// OR

document.addEventListener('DOMContentLoaded', () => {
  document.dispatchEvent(new CustomEvent('storepress_tooltip_init_with', {
    detail: {
      element: 'span.tooltip',
    },
  }))
})
```

## Re Init and destroy

- Destroy `document.dispatchEvent(new CustomEvent('storepress_tooltip_destroy'))`
- Init `document.dispatchEvent(new CustomEvent('storepress_tooltip_init'))`

