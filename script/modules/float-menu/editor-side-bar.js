module.exports = [
	{
		label: 'Editor',
		callback: function() {
			_$('#editor').classList.add('active')
		}
	}, 
	{
		label: 'Summary',
		callback: function() {
			showNotification('Summary Feature current unavailable')
		}
	}, 
	{
		label: 'Save Table',
		callback: function() {
			showNotification('Table current can\'t be save')
		}
	},
	{
		label: 'Table info',
		callback: function() {
			showNotification('Table info current can\'t be opened')
		}
	}
]