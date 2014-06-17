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
			store: 'Store',
			//view: 'View',
			created: { type: Date, default: Date.now },
			updated: { type: Date, default: Date.now }
		},
		// A category will be assigned to a store
		Store: {
			name: String, // My Store
			code: String, // default
			//views: ['View'], // [en_US, en_UK, de_DE, fr_FR, es_ES]
			created: { type: Date, default: Date.now },
			updated: { type: Date, default: Date.now }
		},
		View: {
			name: String, // English
			code: String, // en_US | de_DE
			url: String, // http://www.hypecommerce.com/ | http://www.hypecommerce.de/
			language: String, // en_US | de_DE
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
		},
		Language: {
			name: String, // English, German, Pirate
			code: String, // en_US, de_DE (where to look for .json translation files)
			created: { type: Date, default: Date.now },
			updated: { type: Date, default: Date.now }
		},
		// Media can be an image, mp4, wav, etc.
		Media: {
			filename: String,
			filepath: String,
			description: String,
			type: String, // mp4, wav, jpg, etc.
			created: { type: Date, default: Date.now },
			updated: { type: Date, default: Date.now }
		},
	},

	// Api configuration
	api: {
		routes: {
			'/test' : {
				method: 'get',
				callback: function(request, response) {
					response.send(200, 'hi test');
				}
			},

			// This will need to be moved to admin, but for testing let's find out
			'/setting': {
				method: 'get',
				callback: function(request, response) {

					// We need a way to get the dba in here
					// Where BookModel = SettingModel
					// return BookModel.find( function( err, books ) {
					// 	if( !err ) {
					// 		return response.send( books ); 
					// 	} else {
					// 		return console.log( err ); }
					// 	});

				}
			},

			'/setting/create': {
				method: 'post',
				callback: function(request, response) {
					
					var dba = response.locals.dba;

					var SettingModel = dba.getModel('setting');
					// var setting = new SettingModel({
					// 	path: 'module/hype/core/install',
					// 	value: '1'
					// });
					// setting.save(function( err ) {
					// 	if( !err ) {
					// 		return console.log( 'created' );
					// 	} else {
					// 		return console.log( err );
					// 	}
					// });

					// return response.send( setting );
					return response.send(200, 'done');
				}
			}
		}
	},
	// Admin configuration
	admin: {
		routes: {

		}
	}
};

module.exports = Core;