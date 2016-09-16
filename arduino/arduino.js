const five = require("johnny-five")
const client = require('messenger').createSpeaker(8000)
const stopwatch = require('../stopwatch')
const configuration = require('../configuration')

let board, buttons, timer

board = new five.Board({
    repl: false
})

const getSavedButtons = () => {
    const settings = configuration.getAllSettings()
    const buttons = 
        Object
        .keys(settings)
        .filter( k => k.includes('select'))
        .map(k => settings[k])

        console.log('configuration-buttons', buttons)
        return buttons.length >= 3 ? buttons : ['2', '3', '4']
}

const getVideoId = (pin) => {
    console.log('buttonPressed: ', pin)
    return pin
}

const sendKeepAlive = () => client.request('keepalive')

board.on("ready", () => {
    buttons = new five.Buttons({
        pins: getSavedButtons()
    })

    client.request('board-ready', (data) => {
        console.log('Event sent to frontend: ', data)
    })

    buttons.on("press", (event) => {
        console.log(`Pressed: ${event.pin}, Sent: video${getVideoId(event.pin)}`)

        client.request('button-pressed', getVideoId(event.pin), (data) => {
            console.log('Event sent to frontend: ', data)
        })
    })

    if(timer) stopwatch.stop(timer)
    timer = stopwatch.startInterval(1000, sendKeepAlive)
})

board.on('close', () => {
    console.log('connection closed')
    stopwatch.stopInterval(timer)
})