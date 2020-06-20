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
 * return an fs module
 * @returns {typeof import "fs"}
 */
function getFS() {
    return fsmodule
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

/**
 * set Window title in navigation bar
 * @param {string} title 
 */
function setTitle(title = "") {
    _$('#app-title').innerHTML = title
} 

/**
 * set option float menu with template
 * @param {Array<{label: string, callback: function}>} template 
 */
function setOptionFloatMenu(template) {
    _$('#float-option-menu').innerHTML = ''
    for (let i = 0; i < template.length; ++i) {
        let span = document.createElement('span')
        let inner = document.createElement('div')
        inner.classList.add('innerspan')
        inner.innerHTML = template[i].label
        span.appendChild(inner)
        span.addEventListener('click', template[i].callback)
        _$('#float-option-menu').appendChild(span)
    }
}

/**
 * action should be done before application to quit
 */
function beforeQuit() {
    getSharedvar().invoke.debug('app is ready to quit')
}

function showLoginScreen(adpascode, userpascode) {
    _$('#login-screen').classList.add('active')
    _$('#login-screen').classList.add(`$${adpascode}`)
    _$('#login-screen').classList.add(`_${userpascode}`) 
}

function hideLoginScreen() {
    _$('#login-screen').classList.remove('active')
}

function showFloatAddSubject() {
    _$('#float-add-subject').classList.add('active') 
}

function hideFloatAddSubject() {
    _$('#float-add-subject').classList.remove('active')
}

function showFloatButton() {
    _$('#float-option-btn').classList.remove('hidden')
}

function hideFloatButton() {
    _$('#float-option-btn').classList.add('hidden')
}

function showLoadScreen() {
    _$('#loading-editor').classList.add('active')
}

function hideLoadScreen() {
    _$('#loading-editor').classList.remove('active')
}

function updateLoadStatus(percent) {
    _$('#loading-editor').children[0].children[1].children[0].innerHTML = `LOADING EDITOR... ${percent}%`
}

function loginAsAdmin() {
    getRemote().getCurrentWindow().openDevTools()
}

/**
 * push a notification popup to screen
 * @param {string} message 
 */
function showNotification(message) {
    _$('#notification').children[0].innerHTML = message
    _$('#notification').classList.add('active')
    pushlog(message)
    setTimeout(() => {_$('#notification').classList.remove('active')}, 6000)
}


/**
 * load template array of subject, append them to subject select table
 * @param {HTMLElement} table
 * @param {Array<string>} template 
 */
function loadSubjectTemplate(table, template) {
    table.innerHTML = ''
    for (let i = 0; i < template.length; ++i) {
        let trow = document.createElement('tr')
        let tcel = document.createElement('td')
        tcel.className = 'flex f-space-a'
        let checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.click()
        let span = document.createElement('span')
        span.innerText = template[i]
        tcel.appendChild(checkbox)
        tcel.appendChild(span)
        trow.appendChild(tcel)
        table.appendChild(trow)
    }
}
