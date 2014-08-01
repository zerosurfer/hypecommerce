module.exports = function(Product, Hype, _) {
    
	var ProductModel = Hype.Db.getModel('Product');

	Product.create = function(options) {

		console.log(Hype);
		var product = new ProductModel(options);

		product.save(function(err) {
			if (!err) {
				console.log('aww yeaa');
			}
		});
	}

    return Product;
};