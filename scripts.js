;(function (window) {
  const items = document.querySelectorAll('[data-storepress-tooltip]')

  function setPosition (event) {

    const element = event.target

    element.style.removeProperty('--_tooltip-position')

    const rect = element.getBoundingClientRect()
    const style = window.getComputedStyle(element)

    const tooltipHeight = parseInt(style.getPropertyValue('--tooltip-height'), 10)
    const tooltipWeight = parseInt(style.getPropertyValue('--tooltip-width'), 10)
    const tooltipAngle = parseInt(style.getPropertyValue('--tooltip-angle'), 10)
    const tooltipEdge = parseInt(style.getPropertyValue('--tooltip-edge'), 10)
    const tooltipOffset = parseInt(style.getPropertyValue('--tooltip-offset'), 10)

    const calculatedPosition = tooltipHeight + tooltipAngle + tooltipEdge + tooltipOffset

    element.classList.toggle('storepress-tooltip-position-bottom', rect.top < calculatedPosition)

    element.classList.toggle('storepress-tooltip-position-top', rect.top > calculatedPosition)

    const width = (tooltipWeight / 2)
    const position = rect.left + (rect.width / 2)

    // left
    const left = width - position
    const isLeft = width > position

    // right
    const computedRight = width + position
    const isRight = document.body.clientWidth < computedRight
    const right = document.body.clientWidth - computedRight

    if (isLeft) {
      element.style.setProperty('--_tooltip-position', `${left + tooltipEdge}px`)
    }

    if (isRight) {
      element.style.setProperty('--_tooltip-position', `${right - tooltipEdge}px`)
    }
  }

  function resetPosition (event) {
    const element = event.target

    element.style.removeProperty('--_tooltip-position')
    element.classList.remove('storepress-tooltip-visible', 'storepress-tooltip-position-top', 'storepress-tooltip-position-bottom')
  }

  items.forEach((item) => {

    if (!item.hasAttribute('tabindex')) {
    //  item.setAttribute('tabindex', 0)
    }

   // item.addEventListener('focusin', setPosition)
   // item.addEventListener('focusin', setPosition)
    // item.addEventListener('pointerout', resetPosition)
   item.addEventListener('pointerenter', setPosition)
  })

}(window))