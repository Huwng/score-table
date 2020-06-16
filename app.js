// app.js is app start entry point

const { app, BrowserWindow, screen } = require('electron')
const fs = require('fs')

/**
 * app window
 * @type {Electron.BrowserWindow}
 */ 
let window


/**
 * sharing variable in main process
 */
global['shared'] = {
	path: {
		appData: app.getPath('appData'),
		dirname: __dirname
	}, 
	invoke: {
		firstUse: false
	}
}

app.on('ready', () => {
	// get primary screen properties
	let primaryScreen = screen.getPrimaryDisplay()
	// create main window
	window = new BrowserWindow({
		// height and width should be 80% compare to primary screen
		width: primaryScreen.workArea.width * 80 / 100,
		height: primaryScreen.workArea.height * 80 / 100,
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
		frame: false
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
	global['shared'].invoke.firstUse = checkFirstUse()
}


/**
 * checking whether app used before by user
 * by checking folder ${appdata}/Scoretable
 */
function checkFirstUse() {
	return !fs.existsSync(`${global['shared'].path.appData}/ScoreTable`)
}