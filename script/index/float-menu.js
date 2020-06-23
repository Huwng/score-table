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

	// handle event when click button add subject
	el_click(_$('#confirm-add-subject'), function () {
		let trow = document.createElement('tr')
		let tcel = document.createElement('td')
		tcel.className = 'flex f-space-a'
		let checkbox = document.createElement('input')
		checkbox.type = 'checkbox'
		checkbox.click()
		let span = document.createElement('span')
		span.innerText = _$('#float-add-subject-inp').value
		tcel.appendChild(checkbox)
		tcel.appendChild(span)
		trow.appendChild(tcel)
		_$('#sbj-tab').children[0].appendChild(trow)
		hideFloatAddSubject()
	})
	// handle event when click button cancel add subject
	el_click(_$('#cancel-add-subject'), hideFloatAddSubject)
}).call(this)