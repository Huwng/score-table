(function() {
    /**
     * shared variable from main process
     */
    let shared_var = getSharedvar()
    if (shared_var.invoke.firstUse) {
        // append sign up screen
        shared_var.invoke.debug('preparing for first use')
        // append folder ${appdata}/Scoretable
        fs.mkdirSync(`${shared_var.path.appData}/ScoreTable`)
        // append file ${appdata}/Scoretable/user$.db
        try {
            fs.appendFileSync(`${shared_var.path.appData}/ScoreTable/Table.json`,)
        } catch (error) {
            console.log(error)
        }
        // append Create table panel

        // set window title to ""
        setTitle()
    }
}).call(this)