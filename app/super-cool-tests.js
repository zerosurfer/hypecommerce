var Tests;

module.exports = function(Hype) {
	Tests = function() {
		Hype.log("Running some really silly tests");
		// var Product = Hype.require('Product');

		// // Create a product
		// Product.create({
		// 	name: 'My test product',
		// 	shortDescription: 'Quick test',
		// 	description: 'I cannot believe this works!',
		// 	price: 10.00
		// });
	};

	return new Tests();

}