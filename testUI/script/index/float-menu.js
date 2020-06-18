(function() {
	let float_btn = _$('#float-option-btn')
	let float_menu = _$('#float-option-menu')
	el_click(float_btn, function() {
		if (float_btn.classList.contains('active')) {
			float_btn.classList.remove('active')
			float_menu.classList.remove('active')
		} else {
			float_btn.classList.add('active')
			float_menu.classList.add('active')
		}
	})
}).call(this)