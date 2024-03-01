import { contextBridge, ipcRenderer } from "electron/renderer"

contextBridge.exposeInMainWorld("main", {
    setWindowSize: (w: number, h: number) => {
        ipcRenderer.send("set-window-size", { w, h })
    },
    getWindowSize: () => {
        return ipcRenderer.invoke("get-window-size")
    },
    getAllSongs: () => {
        return ipcRenderer.invoke("get-all-music-files")
    },

    log: (message: string) => {
        ipcRenderer.send("log", message)
    },
})
