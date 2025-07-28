/**
 * External dependencies
 */
import {
	createPluginInstance,
	triggerEvent,
	getPluginInstance,
} from '@storepress/utils'

/**
 * Internal dependencies
 */
import { Plugin } from './Plugin'

function StorePressTooltip () {

	const Tooltip = {
		getInstance (element, options) {
			return createPluginInstance(element, options, Plugin)
		},

		getPluginInstance (element) {
			return getPluginInstance(element)
		},

		initWith ($selector, options) {
			const instance = this.getInstance($selector, options)

			for (const { element, reset } of instance) {
				element.addEventListener('destroy', reset)
			}

			return instance
		},

		destroyWith ($selector) {
			const instance = this.getPluginInstance($selector)
			for (const { destroy } of instance) {
				destroy()
			}
		},

		reInitWith ($selector, options) {
			this.destroyWith($selector)
			this.initWith($selector, options)
		},
	}

	// Init.
	document.addEventListener(
		'storepress_tooltip_init',
		(event) => {
			const defaultSettings = {}
			const settings = { ...defaultSettings, ...event.detail?.settings }
			const element = event.detail?.element

			if (Array.isArray(element)) {
				for (const el of element) {
					Tooltip.initWith(el, settings)
				}
			} else {
				Tooltip.initWith(element, settings)
			}
		},
		{ passive: true },
	)

	// Destroy.
	document.addEventListener(
		'storepress_tooltip_destroy',
		(event) => {
			const element = event.detail?.element

			if (Array.isArray(element)) {
				for (const el of element) {
					Tooltip.destroyWith(el)
				}
			} else {
				Tooltip.destroyWith(element)
			}
		},
		{ passive: true },
	)

	// Reload.
	document.addEventListener(
		'storepress_tooltip_reload',
		(event) => {
			const defaultSettings = {}
			const settings = { ...defaultSettings, ...event.detail?.settings }
			const element = event.detail?.element

			if (Array.isArray(element)) {
				for (const el of element) {
					Tooltip.reInitWith(el, settings)
				}
			} else {
				Tooltip.reInitWith(element, settings)
			}
		},
		{ passive: true },
	)
}

document.addEventListener('DOMContentLoaded', () => {
	StorePressTooltip()
	triggerEvent(document, 'storepress_tooltip_init', {
		element: ['[data-storepress-tooltip]'],
	})
})

export default StorePressTooltip
