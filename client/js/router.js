const router = (($) => {
	const defaultRoute = 'home.html'
	const parentContainer = '.parentContainer'
	let currentRoute = ''

	return {
		changeRoute: (route) => {
			route = route || defaultRoute
			$('.parentContainer').load(`${route}`)
			currentRoute = route
		},
		getDefaultRoute: () => defaultRoute,
		getCurrentRoute: () => currentRoute,
		isInDefaultRoute: () => defaultRoute === currentRoute
	}
})

module.exports = router