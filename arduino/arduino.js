const five = require("johnny-five")
const messenger = require('messenger')
client = messenger.createSpeaker(8000)

let board, buttons

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

board.on("ready", function() {
    var buttons = new five.Buttons({
        pins: ['A1', 'A2', 'A3']
    })

    buttons.on("press", function(event) {
        const pressedButton = buttonsObj[event.pin]
        console.log("Pressed: ", pressedButton)

        client.request('button-pressed', getVideoId(pressedButton), function(data) {
            console.log('Event sent to frontend: ', data)
        })
    })

})
