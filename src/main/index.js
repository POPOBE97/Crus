'use strict'

import { app, BrowserWindow, screen } from 'electron'

process.env['ELECTRON DISABLE SECURITY WARNINGS'] = 'true'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

if (process.platform === 'linux') {
  app.commandLine.appendSwitch('enable-experimental-web-platform-features', true)
} else {
  app.commandLine.appendSwitch('enable-web-bluetooth', true)
  app.commandLine.appendSwitch('enable-experimental-web-platform-features', true)
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    width: width > 800 ? 800 : width,
    height: height > 600 ? 600 : height,
    useContentSize: true,
    frame: process.platform === 'darwin',
    webPreferences: {
      devTools: process.platform === 'darwin',
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      experimentalFeatures: true
    }
  })

  // mainWindow.webContents.on('select-bluetooth-device', (event, deviceList, handler) => {
  //   event.preventDefault()
  //   console.log(deviceList)
  //   // if (deviceList && deviceList.length > 0) {
  //   //   for (let i = 0; i < deviceList.length; i++) {
  //   //     const device = deviceList[i]
  //   //     handler(device.deviceId)
  //   //   }
  //   // } else {
  //   //   handler('')
  //   // }
  // })

  // mainWindow.webContents.session.on('select-serial-port', (event, portList, webContents, handler) => {
  //   event.preventDefault()
  //   if (portList && portList.length > 0) {
  //     handler(portList[1].portId)
  //   } else {
  //     handler('')
  //   }
  // })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.loadURL(winURL)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

const {ipcMain} = require('electron')
ipcMain.on('exit', (evt, arg) => {
  app.quit()
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
