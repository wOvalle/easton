const { ipcMain, BrowserWindow, app } = require('electron')
const menu = require('./menu')
const messenger = require('messenger')
const arduino = messenger.createListener(8000)
let mainWindow = {}

menu.applyCustomMenu()

if (process.mas) app.setName('Arduino Video Changer')

require('electron-reload')(__dirname + '/client')

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: app.getName()
    })

    mainWindow.loadURL('file://' + __dirname + '/client/index.html')
})

app.on('window-all-closed', app.quit)

ipcMain.on('change-video', (event, arg) => {
    console.log('change-video', `video${arg}`)

    event.sender.send('change-video', arg)
})

arduino.on('button-pressed', function(event, data) {
    console.log('Received From Arduino: ', data)
    event.reply('success')
    mainWindow.webContents.send('change-video', data);
})


//implement close, minimize button at https://github.com/bojzi/sound-machine-electron-guide/blob/master/app/css/index.css .close .settings