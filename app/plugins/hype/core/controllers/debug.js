var DebugController;

DebugController = function() {

	this.routes = {
		'/debug' : {
			method: 'get',
			callback: function(request, response) {

				response.send(200, 'hi debug');
			}
		},
	};

	
}

module.exports = DebugController;