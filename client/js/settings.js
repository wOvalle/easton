const settings = (() => {
    const configuration = require('../configuration')

    const availablePorts = ['2', '3', '4', '5', '6', '7', '8', 'A1', 'A2', 'A3', 'A4', 'A5']

    const eventHandler = (event) => {
        const type = event.target.type
        const name = event.target.name

        console.log(`Event detected in ${type}~${name}: `, event)

        if (type === 'file') {
            const filePath = event.target.files[0].path
            configuration.setSetting(name, filePath)
            $(`span[name=${name}]`).text(filePath)

        } else if (type === 'checkbox') {
            const checked = event.target.checked

            configuration.setSetting(name, checked)
        } else if (type === 'select-one') {
            const selected = event.target.value
            configuration.setSetting(name, selected)
        }
    }

    const init = () => {
        //bind events
        $('input, select')
            .each((i, f) => {
                $(f).on('change', eventHandler)
            })

        //Fill Dropdowns
        const selects = $('select')
        availablePorts.forEach(p => {
            $('select').append($('<option />').val(p).text(p))
        })

        //Set current state
        const currentSettings = configuration.getAllSettings()

        Object.keys(currentSettings).forEach(key => {
            let e = $(`input[name=${key}],select[name=${key}]`).get(0)

            if (e.type === 'checkbox')
                e.checked = currentSettings[key]

            if (e.type === 'file')
                $(`span[name=${key}]`).text(currentSettings[key])

            if (e.type === 'select-one')
                e.value = currentSettings[key]
        })
    }

    return {
        init,
        configuration
    }
})()
