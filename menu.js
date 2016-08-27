const { Menu } = require('electron')

module.exports = {
    applyCustomMenu: () => {
        const menuTemplate = [{
            role: 'window',
            submenu: [{
                role: 'minimize'
            }, {
                role: 'close'
            }]
        }, {
            label: 'Developer',
            submenu: [{
                label: 'Willy Ovalle',
                click() { require('electron').shell.openExternal('http://github.com/wovalle') }
            }]
        }]

        const menu = Menu.buildFromTemplate(menuTemplate)
        Menu.setApplicationMenu(menu)
    }
}
