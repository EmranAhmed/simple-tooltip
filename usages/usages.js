/**
 * External dependencies
 */
import StorePressTooltip from '../src/index'

document.addEventListener('DOMContentLoaded', () => {
	// StorePressTooltip.init()
	//StorePressTooltip.setup()
	// StorePressTooltip.setup()
	StorePressTooltip.init()
	/*StorePressTooltip.init()
	StorePressTooltip.init()
	StorePressTooltip.init()
	StorePressTooltip.init()

	StorePressTooltip.destroy()*/

	setTimeout(()=>{
		StorePressTooltip.clear()
	}, 4000)

	setTimeout(()=>{
		StorePressTooltip.setup()
		StorePressTooltip.init()
	}, 8000)
})
