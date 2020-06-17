/**
 * select a document from document
 * @param {string} selector
 * @returns {HTMLElement}
 */
function _$(selector) { return document.querySelector(selector) }

/**
 * select all element with specific selector
 * @param {string} selector 
 * @returns {HTMLCollection}
 */
function $$(selector) {
	return document.querySelectorAll(selector)
}

/**
 * add click handle event to element
 * @param {HTMLElement} element 
 * @param {function} callback 
 */
function el_click(element, callback) {
	element.addEventListener('click', callback)
}

/**
 * get remote of main process
 * @returns {Electron.Remote}
 */
function getRemote() {
	return remote
}

/**
 * shared variable from main process
 * @returns {{path: {appData: string, dirname: string}, invoke: {firstUse: boolean, debug: function(string)}}}
 */
function getSharedvar() {
	return shared
}

/**
 * push a log to debug console
 * @param {string} msg 
 */
function pushlog(msg) {
	getSharedvar().invoke.debug(`---> ${msg}`)
}
