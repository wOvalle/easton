const eventsModule = (() => {
    const { ipcRenderer } = require('electron')
    const configuration = require('../configuration')

    //keyboard Event
    $(document).keyup((e) => {
        const key = String.fromCharCode(e.keyCode)

        if (e.keyCode == 27)
            router.changeRoute('home.html')
        else if (~['1', '2', '3'].indexOf(key) && configuration.getSetting('keyboard-events'))
            ipcRenderer.send('change-video', key)
    })

    //Board Status Events
    ipcRenderer.on('board-ready', (data) => {
        console.log('board-ready', data)
        $('.circuit-status').text('CONNECTED')
    })

    ipcRenderer.on('board-disconnected', (data) => {
        console.log('board-disconnected', data)
        $('.circuit-status').text('DISCONNECTED')
    })

    return {
        addEventListener: (event, fn) => {
            ipcRenderer.on(event, fn)
        },
        send: (event, data) => {
            ipcRenderer.send(event, data)
        }
    }
})()

window.eventsModule = eventsModule
