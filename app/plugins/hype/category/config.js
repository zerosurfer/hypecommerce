// Require
var Category;

Category = {
	name: 'Category',
	enabled: true,
	depends: {
	},

	// Schemas
	models: {
		Category: {
			name: String,
			path: 'Url',
			parent: 'Category',
			canFilter: Boolean,
			filters: 'Attribute',
			metaDescription: String,
			metaTags: String,
			createdAt: Date,
			updatedAt: Date
		},
	},

	// Server routes
	frontend: {
		routes: {
			// Route name + method must be unique, if conflicts are found the route won't be included in the final set
			'/category/:id' : {
				method: 'get',
				callback: function(request, response) {
					response.send(200, 'getting category');
				}
			}
		}
	}
};

module.exports = Category;