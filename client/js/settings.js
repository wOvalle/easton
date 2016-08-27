const settings = (() => {
    const settings_file = './settings.json'
    let settings;

    //DOM cache
    const vid1 = $('input[name="video1"]')
    const vid2 = $('input[name="video2"]')
    const vid3 = $('input[name="video3"]')
    const autoplay = $('input[name="autoplay"]')
    const saveButton = $('.btn-save')

    const initialize = (opts) => {
        fetch(set => {
            autoplay.prop('checked', set.autoplay)

            $('input[type="file"').each(
                (i, v) => $(v).closest('td').find('span').text(set.videos[v.name]) 
            )

        })
    }

    const get = (cb) => {
        if(settings) cb(settings)
        else fetch(cb)
    }

    const fetch = cb => {
        fs.readFile(settings_file, function (err, data) {
            settings = $.parseJSON(data)
            cb(settings)

        })
    }

    const save = (set) => {
        fs.writeFile(settings_file, JSON.stringify(set), function(err) {
            if (err) {
                alert("An error ocurred creating the file " + err.message)
            }

            alert("The file has been succesfully saved")
        })
    }

    const clickHandler = () => {
        const newSettings = parseSettings()

        newSettings.videos =
            newSettings.videos
            .filter(v => v && v.files.length)
            .map(v => {
                return {
                    path: v.files[0].path,
                    name: v.name
                }
            })
            .reduce((o, v) => { //converting from array to obj
                o[v.name] = v.path
                return o
            }, {})

        fetch(set => {
            settings.autoplay = newSettings.autoplay
            $.extend(settings.videos, newSettings.videos)
            save(settings)
        })
    }

    const parseSettings = () => {
        return {
            videos: [
                vid1[0],
                vid2[0],
                vid3[0],
            ],
            autoplay: autoplay.prop('checked')
        }
    }

    saveButton.on('click', clickHandler)

    return {
        initialize,
        get
    }
})()

window.settings = settings

