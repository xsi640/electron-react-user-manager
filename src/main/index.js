const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const {ipcMain} = require('electron')
const regIPCMessage = require('./regipcmessage')

let win

function createWindow() {
    regIPCMessage();
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            experimentalFeatures: true
        }
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, '../../public/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    if (process.env.NODE_ENV == 'development')
        win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})