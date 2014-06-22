// Should seed necessary data once
var Install = function(Hype) {
	Hype.Log.log('in install');

	var currency = Hype.Model.currency;
	console.log(currency.load(1));
	// Insert default config
	// Insert default currencies
	// Insert default attributes
	// Insert default attribute groups (will be flexible, not strict per product)

	// Finish the install
	// Insert "module/hype/core/install:true" into the Settings db object
};

module.exports = Install;