(function() {
	/** remote caller to main process */
	const remote = require('electron').remote
	/**
	 * shared variable from main process
	 * @type {{path: {appData: string, dirname: string}, invoke: {firstUse: boolean}}}
	 */
	let shared_var = remote.getGlobal('shared')
	if (shared_var.invoke.firstUse) {
		// append sign up screen
	}
})