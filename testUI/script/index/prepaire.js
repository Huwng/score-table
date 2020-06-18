(function() {
    /**
     * shared variable from main process
     */
    let shared_var = getSharedvar()
    if (shared_var.invoke.firstUse) {
        // append sign up screen
        shared_var.invoke.debug('preparing for first use')
        // append folder ${appdata}/Scoretable

        // append file ${appdata}/Scoretable/user$.db

        // append Create table panel

        // set window title to ""
        setTitle()
    }
}).call(this)