# Simple Tooltip By StorePress

It's a lightweight, dependency-free JavaScript solution for creating dynamic, configurable tooltips on web pages. 
The library is initialized declaratively via data attributes and can be controlled programmatically through a simple JavaScript API and custom events.


## Features

- Declarative Setup: Easily add tooltips directly in your HTML using `data-*` attributes.

- Dynamic Positioning: Automatically adjusts tooltip position (top/bottom) and handles horizontal overflow to stay within the viewport.

- CSS-Driven: The plugin calculates positioning but relies on your CSS for the actual appearance, giving you full control over styling.

- JavaScript API: Provides a simple API to initialize, destroy, re-initialize, and get instances of tooltips.

- Event-Based: Uses a custom event system (`storepress_tooltip_init`,`storepress_tooltip_reload`, `storepress_tooltip_destroy`) for global control.

- Support `prefers-reduced-motion` for accessibility.

- Support RTL.

## Basic Usage

The easiest way to use the library is by adding the `data-storepress-tooltip` attribute to any HTML element. 
The plugin will automatically detect and initialize these elements on `DOMContentLoaded`.

The content of the tooltip is defined using the CSS content property on the `::before` or `::after` pseudo-element.

### HTML

Add the `data-storepress-tooltip` attribute to an element. 
You can set the tooltip's text using another data attribute, like `data-tooltip-text`, which we'll use in the CSS.

```html
<button type="button" data-storepress-tooltip="This is a tooltip!">Hover over me</button>

<a href="#" data-storepress-tooltip="Another tooltip here.">Or me!</a>
```

## Local Usages

- `npm install`
- `npm run build`
- Load `./build/style-tooltip.css`
- Load `./build/storepress-utils.js`
- Load `./build/tooltip.js`
- Add `data-storepress-tooltip="Tooltip Text"` attribute on any HTML element.

## Development

- `npm start`
- Please check `./src/style.scss`
- Please check `./src/index.js`

## Package Usages

```shell
npm i @storepress/tooltip @storepress/utils --save
```

Let's create tooltip from HTML Attribute `data-tooltip`.

```html
<span class="tooltip" data-tooltip="Tooltip Contents"></span>
```

Create `custom-tooltip.scss` file

```scss
@charset "UTF-8";

@use "~@storepress/tooltip/src/mixins" as plugin;

:where([data-tooltip]) {
  // $content-attribute is for tooltip text attribute.
  @include plugin.init("data-tooltip");
}

// Changing colors
// See: "~@storepress/tooltip/src/mixins" variables() mixins.
[data-tooltip] {
  --tooltip-text-color: #ffffff;
  --tooltip-background-color: #e31616;
}
```

Create `custom-tooltip.js` file

```js
/**
 * External dependencies
 */
import StorePressTooltip from '@storepress/tooltip'
import { triggerEvent } from '@storepress/utils'

document.addEventListener('DOMContentLoaded', () => {
  StorePressTooltip()
  triggerEvent(document, 'storepress_tooltip_init', {
    element: ['[data-tooltip]'],
  })
})

// OR with native CustomEvent

document.addEventListener('DOMContentLoaded', () => {
  StorePressTooltip()
  document.dispatchEvent(new CustomEvent('storepress_tooltip_init', {
    detail: {
      element: ['[data-tooltip]'],
    },
  }))
})
```

## Reload and Destroy

```js
import { triggerEvent } from '@storepress/utils'
// Reload
triggerEvent(document, 'storepress_tooltip_reload', {
  element: ['[data-tooltip]'],
})

// Destroy
triggerEvent(document, 'storepress_tooltip_destroy', {
  element: ['[data-tooltip]'],
})
```

