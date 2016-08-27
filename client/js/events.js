const eventsModule = (() => {
    const { ipcRenderer } = require('electron')

    $(document).keyup((e) => {
        const key = String.fromCharCode(e.keyCode)

        if (e.keyCode == 27)
            router.changeRoute('home.html')
        else if (~['1', '2', '3'].indexOf(key))
            ipcRenderer.send('change-video', key)
    })
    return {
        addEventListener: (event, fn) => {
            ipcRenderer.on(event, fn)
        }
    }
})()

window.eventsModule = eventsModule
