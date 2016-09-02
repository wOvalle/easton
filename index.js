const { ipcMain, BrowserWindow, app, shell } = require('electron')
const arduino = require('messenger').createListener(8000)
const stopwatch = require('./stopwatch')

let mainWindow = {}, timer

if (process.mas) app.setName('Arduino Video Changer')

require('electron-reload')(__dirname + '/client')

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: app.getName(),
        frame: false,
        resizable: false
    })

    mainWindow.loadURL('file://' + __dirname + '/client/index.html')
})

app.on('window-all-closed', app.quit)

ipcMain.on('window-minimize', () => {
    mainWindow.minimize()
})

ipcMain.on('window-close', () => {
    app.quit()
})

ipcMain.on('change-video', (event, arg) => {
    console.log('change-video', `video${arg}`)

    event.sender.send('change-video', arg)
})

ipcMain.on('open-external', (event, arg) => {
    shell.openExternal(arg)
})

ipcMain.on('window-player-open', () => {
    console.log('fired!')

})

ipcMain.on('window-player-exit', (event, arg) => {
    mainWindow.setBounds({
        height: 600
    })
})

arduino.on('button-pressed', (event, data) => {
    console.log('Received From Arduino: ', data)
    event.reply('success')
    mainWindow.webContents.send('change-video', data)
})

arduino.on('board-ready', (event, data) => {
    console.log('Received From Arduino: ', data)
    event.reply('success')
    mainWindow.webContents.send('board-ready', data)
    timer = stopwatch.start(5000, sendArduinoError)
})

arduino.on('keepalive', (event, data) => {
    console.log('keepalive')
    mainWindow.webContents.send('board-ready', data)
    event.reply('success')
    stopwatch.stop(timer)
    timer = stopwatch.start(5000, sendArduinoError)
})

const sendArduinoError = () => {
    console.error('Arduino seems to be disconnected')
    mainWindow.webContents.send('board-disconnected')
    stopwatch.stop(timer)
}

process.on('uncaughtException', (error) => {
    console.log(error)
})
