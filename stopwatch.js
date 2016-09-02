const stopwatch = (()=>{
	return {
		start: (interval, fn) => setTimeout(fn, interval),
		stop: (timerObj) => clearTimeout(timerObj),
		startInterval: (interval, fn) => setInterval(fn, interval), 
		stopInterval: (timerObj) => clearInterval(timerObj)
	}

})()

module.exports = stopwatch