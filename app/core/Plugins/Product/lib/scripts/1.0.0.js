var Install;

module.exports = function(Hype) {

	Install = function() {

		this.up = function() {
			var	count = 0,
				Product = Hype.require('Product'),
				products = [
				{
					name: 'Sample virtual product',
					type: 'virtual',
					description: 'This is a sample virtual product. Lorem ipsum dolar',
					shortDescription: 'Lorem ipsum',
					metaTitle: 'Sample virtual product',
		            metaTags: ['virtual','sample','product','test'],
		            sku: 'v-00001',
		            enabled: true,
		            visible: false,
		            search: false,
		            urlKey: 'sample-virtual-product',
		            price: 29.99,
		            salePrice: 19.99
				},
				{
					name: 'Sample simple product',
		            type: 'simple',
		            description: 'This is a sample simple product, Lorem ipsum dolar',
		            shortDescription: 'Ipsum dolar',
		            metaDescription: 'This is a sample simple product',
		            metaTitle: 'Sample simple product',
		            metaTags: ['simple','sample','product','test'],
		            sku: 's-00001',
		            weight: 1.05,
		            weightUnit: 'lbs',
		            enabled: true,
		            visible: true,
		            search: true,
		            urlKey: 'sample-simple-product',
		            quantity: 100,
		            maxShoppingCart: 5,
		            minShoppingCart: 1,
		            inStock: true,
		            manageInventory: true,
		            price: 59.99
				}
			];

			// Start by declaring a listening event so that we can create each product in order
			Hype.listen('hype.product.create.saved', function(productModel) {
				if (count + 1 < products.length) {
					count++;
					Product.create(products[count]);
				}
			});

			// Kick off the process
			Product.create(products[count]);

			Hype.log("Installing initial products");
		},

		this.down = function() {
			Hype.log("Uninstalling product");
		}
	}
	
	return new Install();
}