const five = require("johnny-five")
const client = require('messenger').createSpeaker(8000)
const stopwatch = require('../stopwatch')
let board, buttons, timer

board = new five.Board({
    repl: false
})

const buttonsObj = {
    2: "1",
    3: "2",
    4: "3"
}

const getVideoId = (pin) => {
    const buttonPressed = buttonsObj[pin]
    console.log('buttonPressed', buttonPressed)
    return buttonPressed
}

const sendKeepAlive = () => client.request('keepalive')

board.on("ready", () => {
    buttons = new five.Buttons({
        pins: [2, 3, 4]
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