/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Admin
 * @version     0.0.1.0
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

var Install;

module.exports = function(Hype) {

	Install = function() {

		this.up = function() {
			Hype.log("Installing Admin 0.0.0.1");
			// Create the groups first, after the groups are created go ahead and create the permissions


			// var groupSuperusers,
			// 	groupMarketing,
			// 	groupSales,
			// 	groupDeveloper,
			// 	permissionSales,
			// 	permissionProduct,
			// 	permissionCms,
			// 	permissionCategory,
			// 	mongoosePermissionSales,
			// 	mongoosePermissionProduct,
			// 	mongoosePermissionCms,
			// 	mongoosePermissionCategory,
			// 	modelAdminGroup,
			// 	modelPermission;

			// modelAdminGroup = Hype.dba.getModel('AdminGroup');
			// modelPermission = Hype.dba.getModel('Permission');

			// // Create the permissions
			// permissionSales = {
			// 	'label' : 'Sales',
			// 	'read' : true,
			// 	'write': true,
			// 	'execute': true,
			// 	'path': 'modules/sales/*'
			// };

			// permissionProduct = {
			// 	'label' : 'Product',
			// 	'read' : true,
			// 	'write': true,
			// 	'execute': true,
			// 	'path': 'modules/product/*'
			// };

			// permissionCms = {
			// 	'label' : 'Cms',
			// 	'read' : true,
			// 	'write': true,
			// 	'execute': true,
			// 	'path': 'modules/cms/*'
			// };

			// permissionCategory = {
			// 	'label' : 'Category',
			// 	'read' : true,
			// 	'write': true,
			// 	'execute': true,
			// 	'path': 'modules/category/*'
			// };

			// modelPermission.create(permissionSales, function(err, mongoosePermissionSales) {

			// });
			// mongoosePermissionProduct = modelPermission.create(permissionProduct);
			// mongoosePermissionCms = modelPermission.create(permissionCms);
			// mongoosePermissionCategory = modelPermission.create(permissionCategory);

			// groupSuperusers = {
			// 	'label' : 'Superusers',
			// 	'permissions': [
			// 		mongoosePermissionSales,
			// 		mongoosePermissionCategory,
			// 		mongoosePermissionCms,
			// 		mongoosePermissionProduct
			// 	]
   //          };

			// groupMarketing = {
			// 	'label' : 'Marketing',
			// 	'permissions': [
			// 		mongoosePermissionCategory,
			// 		mongoosePermissionCms,
			// 		mongoosePermissionProduct
			// 	]
   //          };

			// groupSales = {
			// 	'label' : 'Sales',
			// 	'permissions': [
			// 		mongoosePermissionSales,
			// 	]
   //          };
			
			// groupDeveloper = {
			// 	'label' : 'Developer',
			// 	'permissions': [
					
			// 	]
   //          };

			// modelAdminGroup.create([
			// 	groupSuperusers, 
			// 	groupMarketing,
			// 	groupSales,
			// 	groupDeveloper
			// ])
		},

		this.down = function() {
			Hype.log("Uninstalling Admin 0.0.0.1");
		}
	}
	
	return new Install();
}