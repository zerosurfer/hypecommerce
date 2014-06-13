// Require
var Cms;

Cms = {
	name: 'Cms',
	enabled: true,
	depends: {
		'core': '>=1.0.0.0'
	},

	// Schemas
	models: {
		Page: {
			title: String,
			content: String,
			identifier: String,
			createdAt: Date,
			updatedAt: Date
		},
		Block: {
			title: String,
			content: String,
			code: String,
			createdAt: Date,
			updatedAt: Date
		}
	},

	// Server routes
	routes: {
		// Route name + method must be unique, if conflicts are found the route won't be included in the final set
		'cms/:id' : {
			method: 'get',
			callback: function(request, response) {
				console.log(request);
				console.log(response);
			}
		}
	}
};

module.exports = Cms;