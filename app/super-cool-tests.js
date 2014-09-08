var Tests;

module.exports = function(Hype) {
	Tests = function() {
		Hype.debug("Running some really silly tests");
		var Checkout = Hype.require('Checkout');

		//Checkout.place();

	};

	return new Tests();

}