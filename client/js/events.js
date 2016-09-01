const eventsModule = (() => {
    const { ipcRenderer } = require('electron')
    const configuration = require('../configuration')

    $(document).keyup((e) => {
        const key = String.fromCharCode(e.keyCode)

        if (e.keyCode == 27)
            router.changeRoute('home.html')
        else if (~['1', '2', '3'].indexOf(key) && configuration.getSetting('keyboard-events'))
            ipcRenderer.send('change-video', key)
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
