// Require
var Cms;

Cms = {
	name: 'Cms',
	version: '1.0.0.0',
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

	// Frontend configuration
	frontend: {
		routes: {
			// Route name + method must be unique, if conflicts are found the route won't be included in the final set
			'/cms/:id' : {
				method: 'get',
				callback: function(request, response) {
					response.send(200, 'getting cms');
				}
			}
		}
	},
	// Admin configuration
	admin: {
		routes: {
			'/cms': {
				method: 'get',
				callback: function(request, response) {
					console.log(request);
					console.log(response);
				}
			},
			'/cms/create': {
				method: 'post'
			},
			'/cms/edit/:id': {
				method: 'put'
			},
			'/cms/delete/:id': {
				method: 'delete'
			}
		}
	}
};

module.exports = Cms;