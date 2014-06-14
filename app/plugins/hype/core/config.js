// Require
var Core;

Core = {
	name: 'Core',
	version: '1.0.0.0',
	enabled: true,
	depends: {
	},

	// Schemas
	models: {
		Setting: {
			path: String, // module/group/setting
			value: String, // some value
			created: { type: Date, default: Date.now },
			updated: { type: Date, default: Date.now }
		},
		// A category will be assigned to a store
		Store: {
			name: String, // My Store
			code: String, // default
			views: ['View'], // [en_US, en_UK, de_DE, fr_FR, es_ES]
			created: { type: Date, default: Date.now },
			updated: { type: Date, default: Date.now }
		},
		View: {
			name: String, // English
			code: String, // en_US
			url: String, // http://www.hypecommerce.com/
			language: String, // en_US
			currency: 'Currency', // Currency.character = $
			primary: Boolean, // true
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