/**
 * External dependencies
 */
import { createPluginInstance, triggerEvent } from '@storepress/utils';

/**
 * Internal dependencies
 */
import './style.scss';
import { Plugin } from './Plugin';

function StorePressTooltip() {
	const Tooltip = {
		getInstance(element) {
			return createPluginInstance(element, false, Plugin);
		},

		initWith($selector = '[data-storepress-tooltip]') {
			for (const { element, unregister } of this.getInstance($selector)) {
				element.addEventListener('destroy', unregister);
			}
		},

		init() {
			for (const { element, unregister } of this.getInstance(
				'[data-storepress-tooltip]'
			)) {
				element.addEventListener('destroy', unregister);
			}
		},

		destroy() {
			for (const { destroy } of this.getInstance(
				'[data-storepress-tooltip]'
			)) {
				destroy();
			}
		},

		destroyWith($selector = '[data-storepress-tooltip]') {
			for (const { destroy } of this.getInstance($selector)) {
				destroy();
			}
		},
	};

	document.addEventListener('storepress_tooltip_init', () => {
		Tooltip.init();
	});

	document.addEventListener('storepress_tooltip_destroy', () => {
		Tooltip.destroy();
	});

	document.addEventListener('storepress_tooltip_init_with', (event) => {
		const selector = event.detail?.element;
		Tooltip.initWith(selector);
	});

	document.addEventListener('storepress_tooltip_destroy_with', (event) => {
		const selector = event.detail?.element;
		Tooltip.destroyWith(selector);
	});
}

document.addEventListener('DOMContentLoaded', () => {
	StorePressTooltip();
	triggerEvent(document, 'storepress_tooltip_init');
});

export default StorePressTooltip;
