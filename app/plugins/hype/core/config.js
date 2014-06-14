// Require
var Core;

Core = {
	name: 'Core',
	version: '1.0.0.0',
	enabled: true,
	depends: {
		'category': '>=1.0.0.0'
	},

	// Schemas
	models: {
		Setting: {
			path: String,
			value: String,
			created: { type: Date, default: Date.now },
			updated: { type: Date, default: Date.now }
		},
		Store: {
			name: String,
			code: String,
			category: 'Category', // this is a string that we will map to the loaded module schema
			created: { type: Date, default: Date.now },
			updated: { type: Date, default: Date.now }
		},
		View: {
			name: String,
			code: String,
			url: String,
			language: String,
			currency: 'Currency',
			primary: Boolean,
			created: { type: Date, default: Date.now },
			updated: { type: Date, default: Date.now }
		},
		Currency: {
			name: String,
			character: String, // currency char, like B for Bitcoin or $ for Dollar
			decimals: Number,
			created: { type: Date, default: Date.now },
			updated: { type: Date, default: Date.now }
		}
	},

	// Frontend configuration
	frontend: {
		routes: {
			// Route name + method must be unique, if conflicts are found the route won't be included in the final set
			'/' : {
				method: 'get',
				callback: function(request, response) {
					response.send(200, 'hi world');
					
				}
			},
			'/test' : {
				method: 'get',
				callback: function(request, response) {
					response.send(200, 'hi test');
				}
			}
		}
	}
};

module.exports = Core;