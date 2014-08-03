module.exports = function(Product, Hype) {
	var ProductModel = Hype.Db.getModel('Product');

	Product.create = function(options) {
		var product = new ProductModel(options);
		
		Hype.notify('hype.product.create.before', product);

		product.save(function(err) {
			if (!err) {
				Hype.notify('hype.product.create.saved', product);
			}
		});
	}

    return Product;
};