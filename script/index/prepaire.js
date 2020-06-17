(function() {
	/**
	 * shared variable from main process
	 * @type {{path: {appData: string, dirname: string}, invoke: {firstUse: boolean}}}
	 */
	let shared_var = getSharedvar()
	if (shared_var.invoke.firstUse) {
		// append sign up screen
		console.log('this is first use')
	}
}).call(this)