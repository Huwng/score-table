module.exports = [
	{
		label: "Confirm",
		callback: function() {
			showNotification('Create new user successfully')
			showLoadScreen()
			callCreate()
			updateLoadStatus(100)
			hideFloatButton()
			_$('#float-option-btn').click()
		}
	}, 
	{
		label: "Reset",
		callback: function() {
			_$('#float-option-btn').click()
			loadSubjectTemplate(_$('#sbj-tab').children[0], get_module('index/table').template)
		}
	}, 
	{
		label: "Add Subject",
		callback: function() {
			// showNotification('This feature is not supported now')
			showFloatAddSubject()
			_$('#float-add-subject-inp').value = ''
			_$('#float-option-btn').click()
		}
	},
	{
		label: "Import Subject data",
		callback: function() {
			showNotification('This feature is not supported now')
			_$('#float-option-btn').click()
		}
	},
	{
		label: "Preference",
		callback: function() {
			showNotification('This feature is not supported now')
			_$('#float-option-btn').click()
		}
	}
]