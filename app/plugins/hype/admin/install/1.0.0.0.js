var when = require('when');
// Should seed necessary data once
var Install = function(Hype) {

	this.up = function() {
		var loaded = when.defer();
		Hype.Log.log('Installing Admin-1.0.0.0');

		// var Admin = Hype.Model.user;
		// var admin = Admin.Db.create({
		// 	firstname: "Hype",
		// 	lastname: "Commerce",
		// 	username: "hype",
		// 	password: "hype"
		// });
		loaded.resolve();
		Hype.Log.log("Done install Admin-1.0.0.0");

		return loaded.promise;
	},

	this.down = function() {

	}
};

module.exports = Install;