(function () {
	let admincode = _$('#login-screen').classList.toString().match(/\$.*\s/g)[0]
	admincode = admincode.slice(1, admincode.length - 1)
	if (admincode == '') showNotification('UNINDENTIFIED ADMIN')
	let usercode = _$('#login-screen').classList.toString().match(/_.*/g)[0]
	usercode = usercode.slice(1, usercode.length)
	if (usercode == '') {
		showNotification('UNINDENTIFIED USER')
		usercode = get_module('modules/cryption').hash('')
	}
	console.log(admincode)
	el_click(_$('#smt-login'), function () {
		// showNotification('Login temporarily unable')
		if (get_module('modules/cryption').check(_$('#inp-pass').value, admincode)) {
			showNotification('Login as ADMIN successfully')
			loginAsAdmin()
			showLoadScreen()
		}
		else if (get_module('modules/cryption').check(_$('#inp-pass').value, usercode)) {
			showNotification('Login successfully')
			showLoadScreen()
		} else {
			showNotification(`Login unsuccessfully: PASSWORD '${_$('#inp-pass').value}' IS INCORRECT`)
		}
	})
}).call(this)