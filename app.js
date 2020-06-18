// app.js is app start entry point

const { app, BrowserWindow } = require('electron')
//require('electron-reload')(__dirname)
const fs = require('fs')

/**
 * app window
 * @type {Electron.BrowserWindow}
 */
let window

/**
 * sharing variable in main process
 */
global.shared = {
    path: {
        appData: app.getPath('appData'),
        dirname: __dirname
    },
    invoke: {
        firstUse: false,
        debug: function(msg) { console.log(msg) }
    }
}

app.on('ready', () => {
    preload()
        // create main window 
    window = new BrowserWindow({
            // height and width
            width: 1100,
            height: 600,
            // force min width and min height
            minWidth: 500,
            minHeight: 300,
            // node setting for window
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
                spellcheck: false
            },
            // window should be shown after it ready
            show: false,
            // make window framelessly
            frame: false,
            // make window transparent
            transparent: true
        })
        // fetch index.html to main window
    window.loadURL(`file:///${__dirname}/src/index.html`)
        // when window is ready, show it
    window.once('ready-to-show', window.show)
})

/**
 * action pre-loading
 * - check first use 
 *  - if first use, active signup screen
 */
function preload() {
    global.shared.invoke.firstUse = checkFirstUse()
}


/**
 * checking whether app used before by user
 * by checking folder ${appdata}/Scoretable
 */
function checkFirstUse() {
    return !fs.existsSync(`${global.shared.path.appData}/ScoreTable`)
}