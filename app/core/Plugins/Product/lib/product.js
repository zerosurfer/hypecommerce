module.exports = function(Product, Hype) {
	var ProductModel = Hype.Db.getModel('Product');

	Product.create = function(options) {
		var product = new ProductModel(options);
		console.log("We got a new ProductModel " + product);
		// product.save(function(err) {
		// 	if (!err) {
		// 		console.log('aww yeaa');
		// 	}
		// });
	}

    return Product;
};