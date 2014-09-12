/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Product
 * @version     0.0.1
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

module.exports = function(Product, Hype) {
	var ProductModel = Hype.Db.getModel('Product');

	Product.create = function(options) {
		var product = new ProductModel(options);
		
		product.save(function(err) {
			if (!err) {
				Hype.notify('hype.product.create.saved', product);
			}
		});
	}

    return Product;
};