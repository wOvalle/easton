const player = (() => {
    const configuration = require('../configuration')

    //DOM cache
    const player = $('video').get(0)
    let settings,
        currentVideo

    const init = () => {
        settings = configuration.getAllSettings()
        currentVideo = 'video4'
        player.src = settings[currentVideo]

        if(settings['autoplay'] === true)
            player.play()
    }

    const changeVideo = (e, arg) => {
        console.log('change-video', arg)
        if(currentVideo !== 'video4' && arg !== '4') return;
        currentVideo = `video${arg}`
        player.src = settings[currentVideo]
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

    $(player).on('ended', () => {
        console.log('ended, current video', currentVideo)
        changeVideo(null, '4')
    })

    eventsModule.send('window-player-open')

    init()
})()
