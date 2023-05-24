;(function (window) {
  const items = document.querySelectorAll('.item')

  items.forEach((item) => {

    item.addEventListener('mouseenter', (event) => {

      const rect = item.getBoundingClientRect()

      console.log('Hello', rect)

      const afterElement = window.getComputedStyle(item, ':after')
      const beforeElement = window.getComputedStyle(item, ':before')
      const offset = 2

      const afterTopWidth = parseInt(
        afterElement.getPropertyValue('border-top-width'), 10)

      const beforeHeight = parseInt(beforeElement.getPropertyValue('height'),
        10)

      const beforeWidth = parseInt(beforeElement.getPropertyValue('width'),
        10)

      const topPosition = beforeHeight + afterTopWidth + offset

      item.classList.toggle('tooltip-move-to-bottom',
        rect.top < topPosition)

      item.classList.toggle('tooltip-move-to-top',
        rect.top > topPosition)

      const width = (beforeWidth / 2)
      const position = rect.left + (rect.width / 2)

      // left
      const left = width - position
      const isLeft = width > position

      // right
      const computedRight = width + position
      const isRight = document.body.clientWidth < computedRight
      const right = document.body.clientWidth - computedRight

      item.style.setProperty('--dynamic-position', `0px`)

      if (isLeft) {
        item.style.setProperty('--dynamic-position', `${left + offset}px`)
      }

      if (isRight) {
        item.style.setProperty('--dynamic-position', `${right - offset}px`)
      }
    })
  })

}(window))