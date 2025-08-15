/**
 * External dependencies
 */
import { createStorePressPlugin } from '@storepress/utils';

/**
 * Internal dependencies
 */
import { Plugin } from './Plugin';

const StorePressTooltip = createStorePressPlugin( {
	selector: '[data-storepress-tooltip]',
	options: {},
	plugin: Plugin,
	namespace: 'tooltip',
} );

StorePressTooltip.setup();

export default StorePressTooltip;
