// Require
var Product;

Product = {
	name: 'Product',
	enabled: true,
	depends: {
		'core': '>=1.0.0.0'
	},

	// Schemas
	models: {
		Product: {
			name: String,
			path: 'Url',
			store: 'Store',
			sku: String,
			inventory: Number,
			description: String,
			shortDescription: String,
			type: String, // virtual, simple, grouped, configurable
			attributes: ['Attribute'], // Attributes the product has
			displayAttributes: ['Attribute'], // Attributes displayed on the view page
			createdAt: Date,
			updatedAt: Date
		},
		Attribute: {
			name: String, // Meta Description
			code: String, // meta_description
			type: String, // multiselect, text, textarea, image
			createdAt: Date,
			updatedAt: Date
		},

		AttributeGroup: {
			name: String, // Default
			attributes: ['Attribute'], // Meta Description, Meta Tags
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