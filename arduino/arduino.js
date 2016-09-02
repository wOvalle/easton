const five = require("johnny-five")
const client = require('messenger').createSpeaker(8000)
const stopwatch = require('../stopwatch')
let board, buttons, timer

board = new five.Board({
    repl: false
})

const buttonsObj = {
    15: "A1",
    16: "A2",
    17: "A3",
    18: "A4",
    19: "A5",
    20: "A6",
    21: "A7"
}

const getVideoId = (button) => button.split('')[1]

const sendKeepAlive = () => client.request('keepalive')

board.on("ready", () => {
    buttons = new five.Buttons({
        pins: ['A1', 'A2', 'A3']
    })

    client.request('board-ready', (data) => {
        console.log('Event sent to frontend: ', data)
    })

    buttons.on("press", (event) => {
        const pressedButton = buttonsObj[event.pin]
        console.log("Pressed: ", pressedButton)

        client.request('button-pressed', getVideoId(pressedButton), (data) => {
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