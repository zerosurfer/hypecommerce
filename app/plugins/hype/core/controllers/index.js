var IndexController;

IndexController = function() {

	this.routes = {
		'/test' : {
			method: 'get',
			callback: function(request, response) {
				response.send(200, 'hi test');
			}
		}
	};

	
}

module.exports = IndexController;