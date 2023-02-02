// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron')

// As an example, here we use the exposeInMainWorld API to expose the browsers
// and node versions to the main window.
// They'll be accessible at "window.versions".
process.once('loaded', () => {
  contextBridge.exposeInMainWorld('versions', process.versions)
  contextBridge.exposeInMainWorld('electron', {
    doThing: 42,
    requestSystemInfo: () => ipcRenderer.send('get-system-info'),
    getSystemInfo: setState =>
      ipcRenderer.on('system-info', (event, info) => {
        console.log('🚀 ~ file: preload.js:19 ~ getSystemInfo: ~ info', info)

        setState(info)
      }),
    cleanSystemInfo: () => ipcRenderer.removeAllListeners('system-info')
  })
})
