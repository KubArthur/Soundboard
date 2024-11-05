const path = require("path");
const axios = require("axios");
const fs = require("fs");
const { app, BrowserWindow, ipcMain } = require("electron");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 500,
    resizable: false,
    transparent: true,
    roundedCorners: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: true,
    },
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle("get-file-list", async () => {
    const dbPath = path.join(__dirname, "db");
    try {
      const files = fs.readdirSync(dbPath);
      return files;
    } catch (error) {
      console.error("Erreur lors de la lecture du dossier db:", error);
      return [];
    }
  });

  ipcMain.on("file-clicked", (event, fileName, volume) => {
    const trimmedFileName = fileName.slice(0, -4) + " v" + volume;

    axios
      .post("http://localhost:3000/play", {
        fileName: trimmedFileName,
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la commande:", error);
      });
  });

  ipcMain.on("stop-clicked", (event) => {
    axios.post("http://localhost:3000/stop").catch((error) => {
      console.error("Erreur lors de l'envoi de la commande:", error);
    });
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
