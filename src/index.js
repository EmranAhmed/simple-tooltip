/**
 * External dependencies
 */
import {
	createPluginInstance,
	triggerEvent,
	getPluginInstance,
	getWeakMap,
	toUpperCamelCase,
} from '@storepress/utils';

/**
 * Internal dependencies
 */
import { Plugin } from './Plugin';

function createPlugin(
	$defaultSelectors,
	defaultOptions,
	pluginObject,
	namespace
) {
	const mapName = toUpperCamelCase( namespace );
	const initEventType = `storepress_${ namespace }_init`.toLowerCase();
	const destroyEventType = `storepress_${ namespace }_destroy`.toLowerCase();
	const reloadEventType = `storepress_${ namespace }_reload`.toLowerCase();

	return {
		get controller() {
			const map = getWeakMap( mapName );

			// Create new AbortController for document
			let controller = map.get( document );
			if ( controller instanceof AbortController ) {
				controller.abort(); // Remove existing events
			}

			controller = new AbortController();
			map.set( document, controller );
			return controller;
		},

		get signal() {
			return this.controller.signal;
		},

		get instance() {
			return {
				set( element, options ) {
					return createPluginInstance(
						element,
						options,
						pluginObject
					);
				},

				get( element ) {
					return getPluginInstance( element );
				},

				init( $selector, options ) {
					const instance = this.set( $selector, options );

					if ( ! instance || instance.length === 0 ) {
						return;
					}

					for ( const { element, reset } of instance ) {
						if ( element && typeof reset === 'function' ) {
							element.removeEventListener( 'destroy', reset, {
								passive: true,
								once: true,
							} );
							element.addEventListener( 'destroy', reset, {
								passive: true,
								once: true,
							} );
						}
					}
				},

				destroy( $selector ) {
					const instance = this.get( $selector );
					if ( ! instance || instance.length === 0 ) {
						return;
					}
					for ( const { destroy } of instance ) {
						if ( typeof destroy === 'function' ) {
							destroy();
						}
					}
				},

				reload( $selector, options ) {
					this.destroy( $selector );
					this.init( $selector, options );
				},
			};
		},

		setup() {
			const handleInit = ( event ) => {
				const defaultSettings = {};
				const settings = {
					...defaultSettings,
					...event.detail?.settings,
				};
				const element = event.detail?.element;

				if ( Array.isArray( element ) ) {
					for ( const el of element ) {
						this.instance.init( el, settings );
					}
				} else {
					this.instance.init( element, settings );
				}
			};

			const handleDestroy = ( event ) => {
				const element = event.detail?.element;

				if ( Array.isArray( element ) ) {
					for ( const el of element ) {
						this.instance.destroy( el );
					}
				} else {
					this.instance.destroy( element );
				}
			};

			const handleReload = ( event ) => {
				const defaultSettings = {};
				const settings = {
					...defaultSettings,
					...event.detail?.settings,
				};
				const element = event.detail?.element;

				if ( Array.isArray( element ) ) {
					for ( const el of element ) {
						this.instance.reload( el, settings );
					}
				} else {
					this.instance.reload( element, settings );
				}
			};

			const options = {
				passive: true,
				signal: this.signal,
			};

			// Init.
			document.addEventListener( initEventType, handleInit, options );

			// Destroy.
			document.addEventListener(
				destroyEventType,
				handleDestroy,
				options
			);

			// Reload.
			document.addEventListener( reloadEventType, handleReload, options );
		},

		clear( $selector = $defaultSelectors ) {
			this.destroy( $selector );
			this.controller.abort( 'clear' );
		},

		init( $selector = $defaultSelectors, settings ) {
			triggerEvent( document, initEventType, {
				element: $selector,
				settings,
			} );
		},

		destroy( $selector = $defaultSelectors ) {
			triggerEvent( document, destroyEventType, {
				element: $selector,
			} );
		},

		reload( $selector = $defaultSelectors, settings ) {
			triggerEvent( document, reloadEventType, {
				element: $selector,
				settings,
			} );
		},
	};
}

const StorePressTooltip = createPlugin(
	'[data-storepress-tooltip]',
	{},
	Plugin,
	'Tooltip'
);

StorePressTooltip.setup();

export default StorePressTooltip;
