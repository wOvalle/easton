const counter = (() => {
    const configuration = require('../configuration')

    const counterPort = configuration.getSetting('counter-port')
    const counterSpan = $('.counter')

    let i = 0

        const updateCounter = (event, args) => {
        	if(counterPort == args)
            	counterSpan.text(++i)
        }

        eventsModule.addEventListener('button-pressed', updateCounter)
})()
