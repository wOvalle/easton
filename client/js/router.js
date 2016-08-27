const router = (($) => {
	const defaultRoute = 'home.html'
	const parentContainer = '.parentContainer'

	return {
		changeRoute: (route) => {
			route = route || defaultRoute
			$('.parentContainer').load(`${route}`)
		}

	}
})

module.exports = router