(function () {
    /**
     * shared variable from main process
     */
    let shared_var = getSharedvar()
    let fs = getFS()
    if (!fs.existsSync(`${shared_var.path.appData}/ScoreTable/`)) {
        // append sign up screen
        shared_var.invoke.debug('preparing for first use')
        // append folder ${appdata}/Scoretable
        try {
            fs.mkdirSync(`${shared_var.path.appData}/ScoreTable`)
        } catch (err) {
            showNotification(err)
        }
        // append file Table.json
        try {
            fs.appendFileSync(`${shared_var.path.appData}/ScoreTable/Table.json`,)
        } catch (error) {
            showNotification('' + error)
        }
        // append file ${appdata}/Scoretable/user$.db
        try {
            let user_json_data = {
                'admin': get_module('modules/cryption').hash('admin'),
                'user': get_module('modules/cryption').hash('')
            }
            fs.writeFileSync(`${shared_var.path.appData}/ScoreTable/user$.db`, JSON.stringify(user_json_data), 'utf8')
        } catch (err) {
            showNotification('' + err)
        }
        // append Create table panel
        showCreateTablePanel()
        // set window title to "Create new table"
        setTitle('Create new table')
    } else
        hideFloatButton()
    /** @type {{'admin', 'user'}} */
    let userdata
    try {
        userdata = JSON.parse(fs.readFileSync(`${shared_var.path.appData}/ScoreTable/user$.db`, { encoding: 'utf8' }))
        // console.log(userdata)
    } catch (err) {
        showNotification('' + err)
    }
    showLoginScreen(userdata.admin, userdata.user)
    if (shared_var.invoke.firstUse) hideLoginScreen()


    //! FUNCTION zone
    function showCreateTablePanel() {
        loadSubjectTemplate(_$('#sbj-tab').children[0], get_module('index/table').template)
        setOptionFloatMenu(get_module('modules/float-menu/new-table'))
        _$('#new-table-screen').classList.add('active')
        showFloatButton()
    }
    //! FUNCTION zone
}).call(this)