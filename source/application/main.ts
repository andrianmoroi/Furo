import { getAllMusicFiles, isDev } from './common'
import { app, BrowserWindow } from 'electron'
import { ipcMain } from 'electron/main'
import * as path from 'path'

const createWindow = () => {
    const win = new BrowserWindow({
        width: 500,
        height: 250,
        autoHideMenuBar: true,
        titleBarStyle: 'hidden',
        fullscreenable: false,
        fullscreen: false,
        maximizable: false,
        title: "Furo",
        webPreferences: {
            preload: path.join(__dirname, "preload-scripts/preload.js")
        },
    })

    win.loadFile('index.html')

    ipcMain.on("set-window-size", (e, size) => {
        const { w, h } = size

        win.setSize(w, h)
    })

    ipcMain.handle("get-window-size", (e) => {
        const [w, h] = win.getSize()

        return { w, h }
    })

    ipcMain.handle("get-all-music-files", async (e) => {
        return await getAllMusicFiles()
    })

    ipcMain.on("log", (_, message) => console.log(message))
}

app.whenReady().then(() => {

    createWindow()

    app.on('activate', () => {

        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

import electronReload from 'electron-reload'

if (isDev()) {
    electronReload(
        `${__dirname}\\..\\..`,
        {
            electron: require(`${__dirname}\\..\\..\\node_modules\\electron`)
        }
    )
}