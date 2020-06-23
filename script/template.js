const { template } = get_module('index/table')
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
    let writeData = loadDataOjectFromTable()
    get_module('index/table').write(JSON.stringify(writeData))
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
    let check = setInterval(function() {
        if (getLoadStatus() >= 100) {
            showNotification('Load table complete')
            _$('#editor').classList.add('active')
            _$('#new-table-screen').classList.remove('active')
            clearInterval(check)
            /**@type {Array<{label: string, callback: function}>} */
            let sbTemplate = get_module('modules/float-menu/editor-side-bar')
            // append side bar template here
        }
    }, 500)
}

function hideLoadScreen() {
    _$('#loading-editor').classList.remove('active')
}

function updateLoadStatus(percent) {
    _$('#loading-editor').children[0].children[1].children[0].innerHTML = `LOADING EDITOR... ${percent}%`
}

function getLoadStatus() {
    return _$('#loading-editor').children[0].children[1].children[0].innerHTML.split(' ')[2].replace('%', '') * 1
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

function callCreate() {
    _$('#editor-table').children[0].innerHTML = ''
    callLoad(createEmptytable())
}



/**
 * 
 * @param {{name: string, dateCreate: string, dateModified: string, data: Array<{subject: string, marks: {type1: Array<number>, type2: Array<number>, type3: Array<number>}}>}}  tableData
 */
function callLoad(tableData) {
    setTitle(`Score Table - ${tableData.name}`)
    updateLoadStatus(70)
    for (let i = 0; i < tableData.data.length; ++i)
        createSubjectRow(tableData.data[i])
    updateLoadStatus(90)
}

/**
 * 
 * @param {{subject: string, marks: {type1: [], type2: [], type3: []}}} subjectData 
 */
function createSubjectRow(subjectData) {
    let row = document.createElement('tr')
    let cellName = document.createElement('td')
    cellName.appendChild(document.createElement('div'))
    cellName.children[0].appendChild(document.createElement('span'))
    cellName.children[0].children[0].innerHTML = subjectData.subject
    row.appendChild(cellName)
    let sumup = 0, count = 0
    for (let index = 0; index < 3; ++index) {
        let cellMarks = document.createElement('td')
        cellMarks.appendChild(document.createElement('div'))
        for (let i = 0; i < subjectData.marks[`type${index + 1}`].length; ++i) {
            cellMarks.children[0].appendChild(document.createElement('span'))
            cellMarks.children[0].children[i].innerHTML = subjectData.marks[`type${index + 1}`][i]
            sumup += subjectData.marks[`type${index + 1}`][i] * (index + 1)
            count += index + 1
        }
        row.appendChild(cellMarks)
    }
    let cellAvg = document.createElement('td')
    cellAvg.appendChild(document.createElement('div'))
    cellAvg.children[0].appendChild(document.createElement('span'))
    cellAvg.children[0].children[0].innerHTML = Math.round(sumup / ((count > 0) ? count : 1) * 10) / 10
    row.appendChild(cellAvg)
    el_click(row, function () {
        appendEditPopup(row)
    })
    row.addEventListener('mouseenter', function () {
        appendHoverEffect(row)
    })
    _$('#editor-table').children[0].appendChild(row)
    return row
}

/**
 * 
 * @param {HTMLElement} row 
 */
function appendEditPopup(row) {
    showNotification(row + ' is clicked')
}

/**
 * 
 * @param {HTMLElement} row 
 */
function appendHoverEffect(row) {
    _$('#element-slider').style.top = row.offsetTop + 'px'
}

function getCreateTableData() {
    let createList = { name: '', subjects: [] }
    createList.name = _$('#get-table-name').value
    for (let i = 0; i < _$('#sbj-tab').children[0].children.length; ++i)
        // console.log(i)
        if (_$('#sbj-tab').children[0].children[i].children[0].children[0].checked)
            createList.subjects.push(_$('#sbj-tab').children[0].children[i].children[0].children[1].innerHTML)
    return createList
}

function createEmptytable() {
    let tableTemplate = getCreateTableData()
    updateLoadStatus(10)
    /**@type {{name: string, dateCreate: string, dateModified: string, data: Array<{subject: string, marks: {type1: Array<number>, type2: Array<number>, type3: Array<number>}}>}} */
    let tableData = {
        name: '',
        dateCreate: new Date().toLocaleDateString(),
        dateModified: new Date().toLocaleDateString(),
        data: []
    }
    updateLoadStatus(20)
    tableData.name = _$('#get-table-name').value
    for (let i = 0; i < tableTemplate.subjects.length; ++i) {
        tableData.data.push({
            subject: tableTemplate.subjects[i],
            marks: {
                type1: [],
                type2: [],
                type3: []
            }
        })
    }
    updateLoadStatus(50)
    return tableData
}

function loadDataOjectFromTable() {
    /**@type {{name: string, dateCreate: string, dateModified: string, data: Array<{subject: string, marks: {type1: Array<number>, type2: Array<number>, type3: Array<number>}}>}} */
    let tableData = {
        name: '',
        dateCreate: null,
        dateModified: new Date().toString(),
        data: []
    }
    tableData.name = _$('#app-title').innerHTML.split(' - ')[1]
    for (let i = 0; i < _$('#editor-table').children[0].children.length; ++i) {
        tableData.data.push({
            subject: _$('#editor-table').children[0].children[i].children[0].children[0].children[0].innerHTML,
            marks: {
                type1: function() {
                    let uax = []
                    for (let ex = 0; ex < _$('#editor-table').children[0].children[i].children[1].children[0].children.length; ++ex) {
                        uax.push(_$('#editor-table').children[0].children[i].children[1].children[0].children[ex].innerHTML * 1)
                    }
                    return uax
                }(),
                type2: function() {
                    let uax = []
                    for (let ex = 0; ex < _$('#editor-table').children[0].children[i].children[1].children[0].children.length; ++ex) {
                        uax.push(_$('#editor-table').children[0].children[i].children[2].children[0].children[ex].innerHTML * 1)
                    }
                    return uax
                }(),
                type3: function() {
                    let uax = []
                    for (let ex = 0; ex < _$('#editor-table').children[0].children[i].children[1].children[0].children.length; ++ex) {
                        uax.push(_$('#editor-table').children[0].children[i].children[3].children[0].children[ex].innerHTML * 1)
                    }
                    return uax
                }()
            }
        })
    }
    return tableData
}