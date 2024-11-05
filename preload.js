const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  getFileList: () => ipcRenderer.invoke("get-file-list"),
  stopButton: () => ipcRenderer.send("stop-clicked"),
  fileClicked: (fileName, volume) =>
    ipcRenderer.send("file-clicked", fileName, volume),
});
