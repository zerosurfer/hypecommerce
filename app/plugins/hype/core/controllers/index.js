var IndexController;

IndexController = function() {

	this.routes = {
		'/test' : {
			method: 'get',
			callback: function(request, response) {

				response.send(200, 'hi test');
			}
		},

		// This will need to be moved to admin, but for testing let's find out
		'/setting': {
			method: 'get',
			callback: function(request, response) {

				// We need a way to get the dba in here
				// Where BookModel = SettingModel
				// return BookModel.find( function( err, books ) {
				// 	if( !err ) {
				// 		return response.send( books ); 
				// 	} else {
				// 		return console.log( err ); }
				// 	});

			}
		},

		'/setting/create': {
			method: 'post',
			callback: function(request, response) {
				

				// return response.send( setting );
				return response.send(200, 'done');
			}
		}
	};

	
}

module.exports = IndexController;