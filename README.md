# Simple Tooltip By StorePress

It's a lightweight, dependency-free JavaScript solution for creating dynamic, configurable tooltips on web pages. 
The library is initialized declaratively via "data-*" attributes and can be controlled programmatically through a simple JavaScript API and custom events.


## Features

- Declarative Setup: Easily add tooltips directly in your HTML using `data-*` attributes.

- Dynamic Positioning: Automatically adjusts tooltip position (top/bottom) and handles horizontal overflow to stay within the viewport.

- CSS-Driven: The plugin calculates positioning but relies on your CSS for the actual appearance, giving you full control over styling.

- JavaScript API: Provides a simple API to initialize, destroy, re-initialize, and get instances of tooltips.

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

<div class="storepress-tooltip-type-image" style="--tooltip-image: url('images/sample.jpg')" data-storepress-tooltip="Monotone ctallysyndicatemarketpositioning.">Text</div>
```

## Local Usages

- `npm install`
- `npm run build`
- Load `./build/style-tooltip.css`
- Load `./build/storepress-utils.js`
- Load `./build/tooltip.js`
- Add `data-storepress-tooltip="Tooltip Text"` attribute on any HTML element.
- Add `data-storepress-tooltip="Image Tooltip Text" and class="storepress-tooltip-type-image" and style="--tooltip-image: url('images/sample.jpg')"` attribute on any HTML element for image tooltip.

## Development

- `npm start`
- Please check `./src/style.scss`
- Please check `./src/index.js`

## Package Usages

```shell
npm i @storepress/tooltip @storepress/utils --save
```

Let's create tooltip from HTML Attribute `data-storepress-tooltip`.

```html
<span data-storepress-tooltip="Tooltip Contents">For Text Tooltip</span>
<span class="storepress-tooltip-type-image" style="--tooltip-image: url('images/sample.jpg')" data-storepress-tooltip="Tooltip Contents"> For Image tooltip </span>
```

Create `custom-tooltip.scss` file

```scss
@charset "UTF-8";

@use "~@storepress/tooltip/src/mixins" as plugin;

:where([data-storepress-tooltip]) {
  // $content-attribute is for tooltip text attribute.
  @include plugin.init("data-storepress-tooltip");
}

// Changing colors
// See: "~@storepress/tooltip/src/mixins" variables() mixins.
[data-storepress-tooltip] {
  --tooltip-text-color: #ffffff;
  --tooltip-background-color: #e31616;
}
```

Create `scripts.js` file

```js
/**
 * External dependencies
 */
import StorePressTooltip from '@storepress/tooltip'

document.addEventListener('DOMContentLoaded', () => {
  StorePressTooltip.init()
})

```

## Reload and Destroy

```js
/**
 * External dependencies
 */
import StorePressTooltip from '@storepress/tooltip'

document.addEventListener('DOMContentLoaded', () => {
  StorePressTooltip.reload()
})

document.addEventListener('DOMContentLoaded', () => {
  StorePressTooltip.destroy()
})
```

## Control from external script

```js
/**
 * External dependencies
 */
import { getStorePressPlugin } from '@storepress/utils'

// getStorePressPlugin is also available globally by: StorePress.Utils.getStorePressPlugin

document.getElementById('custom-button').addEventListener('click', () => {
  const Tooltip = getStorePressPlugin('tooltip')
  Tooltip.destroy()
  Tooltip.init()
  
  Tooltip.setup()
  Tooltip.clear()
})


const $tooltips1 = StorePress.Utils.getPluginInstance('li.item', 'tooltip')
const $tooltips2 = StorePress.Utils.getStorePressPlugin('tooltip').get('li.item')
const $tooltips3 = StorePress.Utils.getStorePressPlugin('tooltip').get()
```

## Publish

- Add Tag - `git tag $(node -p "require('./package.json').version") && git push origin "$_"`
- Delete Tag - `git tag -d $(node -p "require('./package.json').version") && git push origin --delete "$_"`
- Publish - `npm publish`
