// Require
var Checkout;

Checkout = {
	name: 'Checkout',
	enabled: false,
	depends: {
		'core': '>=1.0.0.0'
	},

	// Schemas
	models: {
		Checkout: {
			name: String,
			path: 'Url',
			parent: 'Checkout',
			store: 'Store',
			canFilter: Boolean,
			filters: ['Attribute'],
			metaDescription: String,
			metaTags: String,
			createdAt: Date,
			updatedAt: Date
		},
	},

	// Api configuration
	api: {
		routes: {
			// Route name + method must be unique, if conflicts are found the route won't be included in the final set
			'/cart/add/:id' : {
				method: 'post',
				callback: function(request, response) {
					response.send(200, 'getting category');
				}
			}
		}
	}
};

module.exports = Checkout;