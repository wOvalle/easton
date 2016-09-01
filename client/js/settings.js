const settings = (() => {
    const configuration = require('../configuration')

    const eventHandler = (event) => {
        const type = event.target.type
        const name = event.target.name

        console.log(`Event detected in ${type}-${name}: `, event)

        if (type === 'file') {
            const filePath = event.target.files[0].path
            configuration.setSetting(name, filePath)
            $(`span[name=${name}]`).text(filePath)

        } else if (type === 'checkbox') {
            const checked = event.target.checked

            configuration.setSetting(name, checked)
        }
    }

    const init = () => {
        //bind events
        $('input')
            .each((i, f) => {
                $(f).on('change', eventHandler)
            })

        //Set current state
        const currentSettings = configuration.getAllSettings()
        Object.keys(currentSettings).forEach(key => {
            let e = $(`input[name=${key}`)[0]

            if (e.type === 'checkbox')
                e.checked = currentSettings[key]

            if (e.type === 'file')
                $(`span[name=${key}]`).text(currentSettings[key])

        })

    }

    return {
        init
    }

})()
