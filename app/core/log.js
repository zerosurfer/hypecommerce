var Log;

Log = function(message, priority) {
	var date, timestamp;

	if (priority === undefined) {
		priority = 'INFO';
	}
	
	// Add a timestamp
	date = new Date();
	timestamp = '[' +  date.toUTCString() + '] ';
	message = timestamp + message;

	// Log appropriately
	switch(priority) {
		case 'DEBUG' :
			console.debug(message);
			break;
		case 'INFO' :
			console.log(message);
			break;
		case 'WARN' :
			console.warn(message);
			break;
		case 'ERROR' :
			console.error(message);
			break;
	}
	return this;
}

module.exports = Log;