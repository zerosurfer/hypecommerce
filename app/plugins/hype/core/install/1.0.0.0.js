// Should seed necessary data once
var Install = function(Hype) {
	Hype.Log.log('Installing Core-1.0.0.0');

	var Currency = Hype.Model.currency;

	// Adds currencies
	new Currency({
		name: 'US Dollar',
		character: '$',
		decimals: 2
	}).save();

	new Currency({
		name: 'Euro',
		character: '€',
		decimals: 2
	}).save();

	new Currency({
		name: 'Bitcoin',
		character: 'B',
		decimals: 8
	}).save();

	Hype.Log.log("Done install Core-1.0.0.0");
};

module.exports = Install;