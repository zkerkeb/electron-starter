// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge,ipcRenderer } = require("electron");

// As an example, here we use the exposeInMainWorld API to expose the browsers
// and node versions to the main window.
// They'll be accessible at "window.versions".
process.once("loaded", () => {
  contextBridge.exposeInMainWorld("versions", process.versions);
  contextBridge.exposeInMainWorld("electron", {
    getStatus : () => ipcRenderer.send('GET_STATUS'),
    storeStatus: (setState) => ipcRenderer.on('SET_STATUS', (event, status) => {
       setState({...status, set:true})
    }),
    getSources: () => ipcRenderer.send('GET_SOURCES'),
    storeSources: (setState) => ipcRenderer.on('ALL_SOURCES', (event, sources) => {
      setState(sources)
    }),
  });
});


