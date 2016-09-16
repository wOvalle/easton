const player = (() => {
    const configuration = require('../configuration')

    //DOM cache
    const player = $('video').get(0)
    let settings,
        currentVideo,
        onHoldVideo


    const init = () => {
        settings = configuration.getAllSettings()
        currentVideo = 'video4'
        onHoldVideo = settings[currentVideo]
        player.src = settings[currentVideo]

        if(settings['autoplay'] === true)
            player.play()
    }

    const changeVideo = (e, arg) => {
        console.log('changeVideo', arg)
        

        const videoNumber = 
        Object
        .keys(settings)
        .filter(k => k.indexOf('select') !== -1 && settings[k] == arg)
        .join()
        .slice(-1)

        if(currentVideo !== 'video4' && arg !== 'hold') return

        currentVideo = arg === 'hold' ? 'video4' : `video${videoNumber}`
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
    eventsModule.addEventListener('button-pressed', changeVideo)
    $(player).on('click', playPause)

    $(player).on('ended', () => {
        console.log('ended, current video:', currentVideo)
        changeVideo(null, 'hold')
    })

    eventsModule.send('window-player-open')

    init()
})()
