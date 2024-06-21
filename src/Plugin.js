function Plugin(element) {
	const calculatePosition = () => {
		this.$element.style.removeProperty('--_tooltip-position');
		this.$element.classList.remove(
			'storepress-tooltip-position-top',
			'storepress-tooltip-position-bottom'
		);

		const rect = this.$element.getBoundingClientRect();
		const style = window.getComputedStyle(this.$element);
		const tooltipBody = window.getComputedStyle(this.$element, 'before');

		const tooltipWidth = parseInt(
			tooltipBody.getPropertyValue('width'),
			10
		);
		const tooltipHeight = parseInt(
			tooltipBody.getPropertyValue('height'),
			10
		);
		const tooltipAngle = parseInt(
			style.getPropertyValue('--tooltip-angle'),
			10
		);
		const tooltipEdge = parseInt(
			style.getPropertyValue('--tooltip-edge'),
			10
		);
		const tooltipOffset = parseInt(
			style.getPropertyValue('--tooltip-offset'),
			10
		);
		const tooltipPadding = parseInt(
			style.getPropertyValue('--tooltip-padding'),
			10
		);
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
		const isRight = document.body.clientWidth < computedRight;
		const right = document.body.clientWidth - computedRight;

		if (isLeft) {
			this.$element.style.setProperty(
				'--_tooltip-position',
				`${left + tooltipEdge}px`
			);
		}

		if (isRight) {
			this.$element.style.setProperty(
				'--_tooltip-position',
				`${right - tooltipEdge}px`
			);
		}
	};

	const addEvents = () => {
		this.$element.addEventListener('focusin', calculatePosition);
		this.$element.addEventListener('pointerenter', calculatePosition);
	};

	const removeEvents = () => {
		this.$element.style.removeProperty('--_tooltip-position');
		this.$element.classList.remove(
			'storepress-tooltip-position-top',
			'storepress-tooltip-position-bottom'
		);

		this.$element.removeEventListener('focusin', calculatePosition);
		this.$element.removeEventListener('pointerenter', calculatePosition);
	};

	const unregister = () => {
		removeEvents();
	};

	// Expose to public.
	const expose = () => ({
		unregister,
	});

	// Do what you need and return expose fn.
	const register = () => {
		this.$element = element;

		addEvents();

		return expose();
	};

	return register();
}

export { Plugin };
