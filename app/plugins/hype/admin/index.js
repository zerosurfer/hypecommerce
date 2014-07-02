// Require
var Admin;

module.exports = function(Hype) {
	Admin = {
		name: 'Admin',
		version: '1.0.0.0',
		enabled: true,
		depends: {
		},

		// Models get appended automatically from the models folder
		models: {},

		// Api configuration
		api: require('./api')(Hype),

		// Helpers
		helpers: {},

	};

	return Admin;

};