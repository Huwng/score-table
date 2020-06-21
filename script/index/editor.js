(function() {
	_$('#editor-table').addEventListener('mouseenter', function() {
		// showNotification('Mouse Overed')
		_$('#element-slider').classList.add('active')
	})
	_$('#editor-table').addEventListener('mouseleave', function() {
		// showNotification('Mouse Leaved')
		_$('#element-slider').classList.remove('active')
	})
	showFloatButton()
	_$('#app-morebtn').classList.add('activable')
}).call(this)