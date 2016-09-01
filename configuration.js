const nconf = require('nconf')

const setSetting = (settingKey, settingValue) => {
    nconf.set(settingKey, settingValue)
    nconf.save()
}

const getSetting = (settingKey) => {
    nconf.load()
    return nconf.get(settingKey)
}

const getAllSettings = () => {
    nconf.load()
    return nconf.get()
}

const getUserHome = () => {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME']
}

nconf.file({file: getUserHome() + '/easton-config.json'})

module.exports = {
    setSetting,
    getSetting,
    getAllSettings
}