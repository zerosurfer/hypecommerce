var when = require('when');
// Should seed necessary data once
var Install = function(Hype) {
	this.up = function() {

		var loaded = when.defer();

		Hype.Log.log('Installing Core-1.0.0.5');
		loaded.resolve();
		Hype.Log.log("Done install Core-1.0.0.5");

		return loaded.promise;
	},

	this.down = function() {

	}
};

module.exports = Install;