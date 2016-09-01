const player = (() => {
    const configuration = require('../configuration')

    //DOM cache
    const player = $('video').get(0)
    let settings

    const init = () => {
        settings = configuration.getAllSettings()
        player.src = settings['video1']

        if(settings['autoplay'] === true)
            player.play()
    }

    const changeVideo = (e, arg) => {
        player.src = settings[`video${arg}`]
        player.play()
    }

    const playPause = (e) => {
        if (e.target.paused)
            e.target.play()
        else
            e.target.pause()
    }

    //events
    eventsModule.addEventListener('change-video', changeVideo)
    $(player).on('click', playPause)

    init()
})()
