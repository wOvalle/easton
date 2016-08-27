(() => {
    const { remote } = require('electron')
    const currentWindow = remote.getCurrentWindow()
    //DOM cache
    const $player = $('video')
    const player = $player.get(0)
    let videos;

    const init = () => {
        settings.get(set => {
            videos = set.videos
            player.src = set.videos.video1
        })

    }

    const changeVideo = (e, arg) => {
        console.log('change-video', `video${arg}`, videos[`video${arg}`])
        player.src = videos[`video${arg}`]
        player.play();
        currentWindow.height = player.height
        currentWindow.width = player.width
    }

    const playPause = (e) => {
        if (e.target.paused)
            e.target.play();
        else
            e.target.pause();
    }

    //events
    eventsModule.addEventListener('change-video', changeVideo)
    $player.on('click', playPause)


    init()
})()
