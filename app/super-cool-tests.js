var Tests;

module.exports = function(Hype) {
// var Permission = Hype.Db.getModel('Permission'),
// 	AdminGroup = Hype.Db.getModel('AdminGroup'),
// 	PermissionCollection,
// 	AdminGroupCollection;

// Permission.find(function(err, results) {
// 	for (var i = 0; i < results.length; i++) {
// 		results[i].remove();
// 	}
// })
	Tests = function() {
		var Product = Hype.require('Product');

		// Create a product
		Product.create({
			name: 'Test product',
			shortDescription: 'Working',
			description: 'It is really working'
		});


	};

	return new Tests();

}