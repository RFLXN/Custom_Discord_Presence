import {app, BrowserWindow, ipcMain} from "electron";
import * as path from "path";
import handler from "./ipc";
import Discord from "./discord/discord";

let window: BrowserWindow;

app.on("ready", () => {
    // init window
    window = new BrowserWindow({
        title: "Custom Discord Presence",
        width: 570,
        height: 800,
        resizable: false,
        fullscreen: false,
        autoHideMenuBar: true,
        fullscreenable: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            devTools: true,
            contextIsolation: false
        }
    });
    window.loadFile(path.join("../web/index.html"));
});

app.on("window-all-closed", () => {
    Discord.instance.destroy();
    if (process.platform != "darwin") {
        app.quit();
    }
});

ipcMain.on("request-apply", async (event, args) => {
    await handler(event, args);
});