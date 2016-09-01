$(() => {
    const { ipcRenderer } = require('electron')
    const close = $('.exit')
    const minimize = $('.minimize')
    const back = $('.back')

    $(document).on('click', 'a.click-async', (event) => {
        event.preventDefault()
        event.stopPropagation()

        const url = $(event.target).prop('href')
        const lastPortionStartsAt = url.lastIndexOf('/')

        const route = url.substring(lastPortionStartsAt + 1, url.length)

        router.changeRoute(route)
    })

    router.changeRoute()

    $('.developer').on('click', (event) => {
        event.preventDefault()
        event.stopPropagation()

        const url = $(event.target).data('url')
        console.log('url', url)
        ipcRenderer.send('open-external', url)
    })

    close.on('click', () => {
        ipcRenderer.send('window-close')
    })

    minimize.on('click', () => {
        ipcRenderer.send('window-minimize')
    })

    back.on('click', () => {
        if (!router.isInDefaultRoute())
            router.changeRoute()
    })
})
