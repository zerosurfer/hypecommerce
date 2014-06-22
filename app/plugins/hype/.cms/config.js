// Require
var Cms;

Cms = {
	name: 'Cms',
	version: '1.0.0.0',
	enabled: false,
	depends: {
		'core': '>=1.0.0.0'
	},

	// Schemas
	models: {
		Page: {
			schema: {
				title: String,
				content: String,
				identifier: String,
				created: { type: Date, default: Date.now },
				updated: { type: Date, default: Date.now }
			},
			hasOne: {
				store: 'Store'
			}
		},
		Block: {
			schema: {
				title: String,
				content: String,
				code: String,
				created: { type: Date, default: Date.now },
				updated: { type: Date, default: Date.now }
			},
			hasOne: {
				store: 'Store'
			}
		}
	},

	// Api configuration
	api: {
		routes: {
			// Route name + method must be unique, if conflicts are found the route won't be included in the final set
			'/cms/:id' : {
				method: 'get',
				callback: function(request, response) {
					console.log(response.locals.dba.getModel('Page'));
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