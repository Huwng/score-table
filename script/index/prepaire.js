(function() {
    /**
     * shared variable from main process
     */
    let shared_var = getSharedvar()
    let fs = getFS()
    if (shared_var.invoke.firstUse) {
        // append sign up screen
        shared_var.invoke.debug('preparing for first use')
        // append folder ${appdata}/Scoretable
        try { fs.mkdirSync(`${shared_var.path.appData}/ScoreTable`)}
        catch (err) { showNotification(err) }
        // append file ${appdata}/Scoretable/user$.db
        try { fs.appendFileSync(`${shared_var.path.appData}/ScoreTable/Table.json`,) } 
        catch (error) { showNotification('' + error) }
        // append file ${appdata}/Scoretable/user$.db

        // append Create table panel
        showCreateTablePanel()
        // set window title to "Create new table"
        setTitle('Create new table')
    }
}).call(this)