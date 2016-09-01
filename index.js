const { ipcMain, BrowserWindow, app, shell } = require('electron')
const arduino = require('messenger').createListener(8000)
let mainWindow = {}

if (process.mas) app.setName('Arduino Video Changer')

require('electron-reload')(__dirname + '/client')

app.on('ready', function() {
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

ipcMain.on('window-minimize', function() {
    mainWindow.minimize();
});

ipcMain.on('window-close', function() {
    app.quit();
});

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

arduino.on('button-pressed', function(event, data) {
    console.log('Received From Arduino: ', data)
    event.reply('success')
    mainWindow.webContents.send('change-video', data)
})
