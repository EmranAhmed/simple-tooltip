function Plugin( element ) {
	// For FireFox.
	const getPseudoElementSize = ( $element, pseudoElement ) => {
		// Create a temporary element to measure the pseudo-element
		const temp = document.createElement( 'div' );
		const computedStyle = window.getComputedStyle(
			$element,
			pseudoElement
		);
		const contentAttr = computedStyle.getPropertyValue( 'content' );
		const match = contentAttr.match( /attr\(([^)]+)\)/ );
		const attributeName = match ? match[ 1 ] : false;

		// Copy text contents.
		temp.textContent = attributeName
			? $element.getAttribute( attributeName )
			: '';

		// Copy relevant styles.
		temp.style.position = 'absolute';
		temp.style.display = 'block';
		temp.style.visibility = 'hidden';
		temp.style.height = computedStyle.height;
		temp.style.width = computedStyle.width;
		temp.style.padding = computedStyle.padding;
		temp.style.margin = computedStyle.margin;
		temp.style.border = computedStyle.border;
		temp.style.boxSizing = computedStyle.boxSizing;
		temp.style.fontSize = computedStyle.fontSize;
		temp.style.lineHeight = computedStyle.lineHeight;
		temp.style.maxWidth = computedStyle.maxWidth;
		temp.style.miHeight = computedStyle.miHeight;

		document.body.appendChild( temp );
		const data = {
			height: temp.offsetHeight,
			width: temp.offsetWidth,
		};

		document.body.removeChild( temp );

		return data;
	};

	const removeStyles = () => {
		this.$element.style.removeProperty( '--_tooltip-position' );
	};

	const removeClasses = () => {
		this.$element.classList.remove(
			'storepress-tooltip-position-top',
			'storepress-tooltip-position-bottom',
			'ios-safari-hover'
		);
	};

	const removeEvents = () => {
		this.controller.abort();
	};

	const calculatePosition = () => {
		removeStyles();
		removeClasses();

		const rect = this.$element.getBoundingClientRect();
		const style = window.getComputedStyle( this.$element );
		const tooltipBody = window.getComputedStyle(
			this.$element,
			'::before'
		);

		let tooltipWidth = parseInt(
			tooltipBody.getPropertyValue( 'width' ),
			10
		);
		let tooltipHeight = parseInt(
			tooltipBody.getPropertyValue( 'height' ),
			10
		);

		const tooltipAngle = parseInt(
			style.getPropertyValue( '--tooltip-angle' ),
			10
		);
		const tooltipEdge = parseInt(
			style.getPropertyValue( '--tooltip-edge' ),
			10
		);
		const tooltipOffset = parseInt(
			style.getPropertyValue( '--tooltip-offset' ),
			10
		);
		const tooltipPadding = parseInt(
			style.getPropertyValue( '--tooltip-padding' ),
			10
		);

		if ( isNaN( tooltipHeight ) ) {
			const { height, width } = getPseudoElementSize(
				this.$element,
				'::before'
			);

			tooltipHeight = height - tooltipPadding;
			tooltipWidth = width - tooltipPadding;
		}

		const calculatedPosition =
			tooltipHeight +
			tooltipAngle +
			tooltipEdge +
			tooltipOffset +
			tooltipPadding;

		this.$element.classList.toggle(
			'storepress-tooltip-position-bottom',
			rect.top < calculatedPosition
		);

		this.$element.classList.toggle(
			'storepress-tooltip-position-top',
			rect.top > calculatedPosition
		);

		const width = tooltipWidth / 2;
		const position = rect.left + rect.width / 2;

		// left
		const left = width - position;
		const isLeft = width > position;

		// right
		const computedRight = width + position;
		const isRight = document.documentElement.clientWidth < computedRight;
		const right = document.documentElement.clientWidth - computedRight;

		if ( isLeft ) {
			const tooltipPosition = this.isRTL
				? ( left + tooltipEdge ) * -1
				: left + tooltipEdge;
			this.$element.style.setProperty(
				'--_tooltip-position',
				`${ tooltipPosition }px`
			);
		}

		if ( isRight ) {
			const tooltipPosition = this.isRTL
				? ( right - tooltipEdge ) * -1
				: right - tooltipEdge;
			this.$element.style.setProperty(
				'--_tooltip-position',
				`${ tooltipPosition }px`
			);
		}
	};

	const isiOSSafari = () => {
		const ua = window.navigator.userAgent;
		const iOS = new RegExp( 'iPad|iPhone|iPod', 'i' ).test( ua );
		const isWebKit = new RegExp( 'WebKit', 'i' ).test( ua );
		const isChrome = new RegExp( 'CriOS', 'i' ).test( ua );

		return iOS && isWebKit && ! isChrome;
	};

	/**
	 * Resets the plugin to its initial state,
	 * clear applied styles, clear added classes and removes event listeners.
	 */
	const reset = () => {
		removeStyles();
		removeClasses();
		removeEvents();
	};

	/**
	 * Creates and returns the public API object for the plugin instance.
	 *
	 * @return {{reset: function(): void}} An object with public methods.
	 */
	const expose = () => ( {
		reset,
	} );

	/**
	 * Sets up the initial state and attaches event listeners.
	 * This is the final step in the setup process.
	 */

	const initial = () => {
		// To fix iOS Safari "sticky hover" issues.
		if ( isiOSSafari() ) {
			this.$element.addEventListener(
				'touchstart',
				() => {
					this.$element.classList.add( 'ios-safari-hover' );
				},
				{ signal: this.signal, passive: true }
			);

			document.addEventListener(
				'touchstart',
				( event ) => {
					if ( ! this.$element.contains( event.target ) ) {
						this.$element.classList.remove( 'ios-safari-hover' );
					}
				},
				{ signal: this.signal, passive: true }
			);
		}

		this.$element.addEventListener( 'pointerenter', calculatePosition, {
			signal: this.signal,
			passive: true,
		} );

		if ( this.$element.hasAttribute( 'tabindex' ) ) {
			this.$element.addEventListener( 'focusin', calculatePosition, {
				signal: this.signal,
				passive: true,
			} );
		}

		if ( this.isImageTooltip ) {
			this.$element.classList.add( 'storepress-tooltip-type-image' );
		}
	};

	/**
	 * The main initialization function that orchestrates the entire setup of the plugin instance.
	 * It sets properties, prepares conditions, and kicks off the initial evaluation.
	 *
	 * @return {Object} The exposed public API for the instance.
	 */
	const init = () => {
		this.$element = element;
		this.isRTL = !! this.$element.closest( '[dir="rtl"]' )?.dir;
		this.controller = new AbortController();
		this.signal = this.controller.signal;
		this.isImageTooltip =
			this.$element.style.getPropertyValue( '--tooltip-image' ).length >
			0;

		initial();

		return expose();
	};

	return init();
}

export { Plugin };
