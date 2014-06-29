
// Should seed necessary data once
var Install = function(Hype) {

	this.up = function() {
		Hype.Log.log('Installing Admin-1.0.0.0');

		// var Admin = Hype.Model.user;
		// var admin = Admin.Db.create({
		// 	firstname: "Hype",
		// 	lastname: "Commerce",
		// 	username: "hype",
		// 	password: "hype"
		// });
		Hype.Log.log("Done install Admin-1.0.0.0");

	},

	this.down = function() {

	}
};

module.exports = Install;