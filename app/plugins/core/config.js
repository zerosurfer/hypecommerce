// Require
var Core;

Core = {
	module: 'Core',
	enabled: true,
	depends: {
	},

	// Schemas
	models: {
		Settings: {
			path: String,
			value: String,
			createdAt: Date,
			updatedAt: Date
		}
	},

	// Server routes
	routes: {
		// Route name + method must be unique, if conflicts are found the route won't be included in the final set
		'/' : {
			method: 'get',
			callback: function(request, response) {
				console.log(request);
				console.log(response);
			}
		}
	}
};

module.exports = Core;