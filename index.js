const {ipcMain, BrowserWindow, app} = require('electron')
const menu = require('./menu')
menu.applyCustomMenu()

if (process.mas) app.setName('Arduino Video Changer')

require('electron-reload')(__dirname + '/client')


app.on('ready', function(){
    var mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: app.getName()
    })

    mainWindow.loadURL('file://' + __dirname + '/client/index.html')
})

ipcMain.on('change-video', (event, arg) => {
  event.sender.send('change-video', arg)
})

