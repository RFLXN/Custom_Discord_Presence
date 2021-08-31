import {app, BrowserWindow, ipcMain, Menu, Tray} from "electron";
import * as path from "path";
import handler from "./ipc";
import Discord from "./discord/discord";
import {loadData} from "./local-data";

// load saved data

let window: BrowserWindow;
let tray: Tray;

const windowSettings = {
    title: "Custom Discord Presence",
    icon: path.join(__dirname, "./icon.png"),
    width: 570,
    height: 800,
    resizable: false,
    fullscreen: false,
    autoHideMenuBar: true,
    fullscreenable: false,
    webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        devTools: false,
        contextIsolation: false
    }
};

function createWindow() {
    window = new BrowserWindow(windowSettings);
    window.loadFile(path.join("./web/index.html"));

    if (window != undefined && !window.isDestroyed()) {
        // send local data to reload input form
        loadData().then(d => {
            window.webContents.send("response-initial-data", d);
        });
    }
}

function closeApp() {
    if (window != undefined && !window.isDestroyed()) {
        window.close();
    }

    if (tray != undefined && !tray.isDestroyed()) {
        tray.destroy();
    }

    Discord.instance.destroy();

    if (process.platform != "darwin") {
        app.quit();
    }
}

// main
app.on("ready", async () => {
    // init window
    createWindow();

    // init system tray
    tray = new Tray(path.join(__dirname, "./icon.png"));
    const trayMenu = Menu.buildFromTemplate([
        {
            label: "Open",
            type: "normal",
            click: () => {
                if (window == undefined || window.isDestroyed()) {
                    createWindow();
                }
            }
        },
        {
            label: "Exit",
            type: "normal",
            click: () => {
                closeApp();
            }

        }
    ]);
    tray.setToolTip("Custom Discord Presence");
    tray.setContextMenu(trayMenu);

    // open window when tray double clicked
    tray.on("double-click", () => {
        if (window == undefined || window.isDestroyed()) {
            createWindow();
        }
    });
});

// ignore quit process when window closed
app.on("window-all-closed", () => {
});

// send initial data
ipcMain.on("request-initial-data", event => {
    loadData().then(initData => {
        event.reply("response-initial-data", initData);
    });
});

// discord presence data handler
ipcMain.on("request-apply", async (event, args) => {
    await handler(event, args);
});