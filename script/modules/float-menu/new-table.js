module.exports = [
	{
		label: "Confirm",
		callback: function() {
			showNotification('This feature is not supported now')
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
			showNotification('This feature is not supported now')
			_$('#float-option-btn').click()
		}
	},
	{
		label: "Import Subject data",
		callback: function() {
			showNotification('This feature is not supported now')
			_$('#float-option-btn').click()
		}
	}
]