// Should seed necessary data once
var Install = function(Hype) {
	this.up = function() {
		Hype.log('Installing Core-1.0.0.5');

		Hype.log("Done install Core-1.0.0.5");
	},

	this.down = function() {

	}
};

module.exports = Install;