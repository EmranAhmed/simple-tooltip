function Plugin (element) {
	const calculatePosition = () => {
		removeStyles()
		removeClasses()

		const rect = this.$element.getBoundingClientRect()
		const style = window.getComputedStyle(this.$element)
		const tooltipBody = window.getComputedStyle(this.$element, 'before')

		const tooltipWidth = parseInt(
			tooltipBody.getPropertyValue('width'),
			10,
		)
		const tooltipHeight = parseInt(
			tooltipBody.getPropertyValue('height'),
			10,
		)
		const tooltipAngle = parseInt(
			style.getPropertyValue('--tooltip-angle'),
			10,
		)
		const tooltipEdge = parseInt(
			style.getPropertyValue('--tooltip-edge'),
			10,
		)
		const tooltipOffset = parseInt(
			style.getPropertyValue('--tooltip-offset'),
			10,
		)
		const tooltipPadding = parseInt(
			style.getPropertyValue('--tooltip-padding'),
			10,
		)
		const calculatedPosition =
			tooltipHeight +
			tooltipAngle +
			tooltipEdge +
			tooltipOffset +
			tooltipPadding

		this.$element.classList.toggle(
			'storepress-tooltip-position-bottom',
			rect.top < calculatedPosition,
		)

		this.$element.classList.toggle(
			'storepress-tooltip-position-top',
			rect.top > calculatedPosition,
		)

		const width = tooltipWidth / 2
		const position = rect.left + rect.width / 2

		// left
		const left = width - position
		const isLeft = width > position

		// right
		const computedRight = width + position
		const isRight = document.body.clientWidth < computedRight
		const right = document.body.clientWidth - computedRight

		if (isLeft) {
			this.$element.style.setProperty(
				'--_tooltip-position',
				`${left + tooltipEdge}px`,
			)
		}

		if (isRight) {
			this.$element.style.setProperty(
				'--_tooltip-position',
				`${right - tooltipEdge}px`,
			)
		}
	}

	/**
	 * Sets up the initial state and attaches event listeners.
	 * This is the final step in the setup process.
	 */
	const initial = () => {
		this.$element.addEventListener('focusin', calculatePosition, { signal: this.signal, passive: true })
		this.$element.addEventListener('pointerenter', calculatePosition, { signal: this.signal, passive: true })
	}

	const removeStyles = () => {
		this.$element.style.removeProperty('--_tooltip-position')
	}

	const removeClasses = () => {
		this.$element.classList.remove(
			'storepress-tooltip-position-top',
			'storepress-tooltip-position-bottom',
		)
	}

	const removeEvents = () => {
		this.controller.abort()
	}

	/**
	 * Resets the plugin to its initial state,
	 * clear applied styles, clear added classes and removes event listeners.
	 */
	const reset = () => {
		removeStyles()
		removeClasses()
		removeEvents()
	}

	/**
	 * Creates and returns the public API object for the plugin instance.
	 *
	 * @return {{reset: function(): void}} An object with public methods.
	 */
	const expose = () => ({
		reset,
	})

	/**
	 * The main initialization function that orchestrates the entire setup of the plugin instance.
	 * It sets properties, prepares conditions, and kicks off the initial evaluation.
	 *
	 * @return {Object} The exposed public API for the instance.
	 */
	const init = () => {
		this.$element = element
		this.controller = new AbortController()
		this.signal = this.controller.signal

		initial()

		return expose()
	}

	return init()
}

export { Plugin }
