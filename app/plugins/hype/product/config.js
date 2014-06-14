// Require
var Product;

Product = {
	name: 'Product',
	enabled: true,
	depends: {
	},

	// Schemas
	models: {
		Product: {
			name: String,
			path: 'Url',
			sku: String,
			inventory: Number,
			description: String,
			shortDescription: String,

			type: String, // virtual, simple, grouped, configurable
			attributes: ['Attribute'],
			displayAttributes: ['Attribute'],
			createdAt: Date,
			updatedAt: Date
		},
		Attribute: {
			name: String,
			code: String,
			type: String, // multiselect, text, textarea, image
			createdAt: Date,
			updatedAt: Date
		}
	},

	// Server routes
	frontend: {
		routes: {
			// Route name + method must be unique, if conflicts are found the route won't be included in the final set
			'/product/:id' : {
				method: 'get',
				callback: function(request, response) {
					response.send(200, 'getting product');
				}
			}
		}
	}
};

module.exports = Product;