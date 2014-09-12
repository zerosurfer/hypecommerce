/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Admin
 * @version     0.0.1
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

var Install;

module.exports = function(Hype) {

	Install = function() {

		this.up = function() {
			Hype.log("Installing Admin 0.0.0.1");

			// Get the admin module to listen for events
			var admin = Hype.require('Admin'),
				Permission = Hype.Db.getModel('Permission'),
				AdminGroup = Hype.Db.getModel('AdminGroup'),
				permissions = [],
				groups = [],
				models = {}, // store all the returned mongoose models
				i = 0,
				j = 0;

			// Setup our permissions
			permissions = [
				{
					'label' : 'Sales',
					'read' : true,
					'write': true,
					'execute': true,
					'path': 'modules/sales/*'
				},
				{
					'label' : 'Product',
					'read' : true,
					'write': true,
					'execute': true,
					'path': 'modules/product/*'
				},
				{
					'label' : 'Cms',
					'read' : true,
					'write': true,
					'execute': true,
					'path': 'modules/cms/*'
				},
				{
					'label' : 'Category',
					'read' : true,
					'write': true,
					'execute': true,
					'path': 'modules/category/*'
				}
			];

			// Setup our groups
			// permissionStr will populate the right models in "permissions" property and unset itself
			groups = [
				{
					'label' : 'Superusers',
					'permissionStr': [
						'Category',
						'Cms',
						'Product',
						'Sales'
					]
	            },
	            {
					'label' : 'Marketing',
					'permissionStr': [
						'Category',
						'Cms',
						'Product'
					]
	            },
	            {
					'label' : 'Sales',
					'permissionStr': [
						'Product',
						'Sales'
					]
	            },
	            {
					'label' : 'Developer',
					'permissionStr': [
						'Category',
						'Cms',
						'Product',
						'Sales'
					]
	            },
			];
			
			// Listen to create a permission
			admin.listen('admin:createPermission', function(e) {
				var tmpModel;
				// Create the new permission
				if (i < permissions.length) {
					Hype.log("Creating permission " + e.label);
					// Create the new permission
					tmpModel = new Permission(e);
					// Add the model to the models object for later use
					tmpModel.save(function(err) {
						if (err) return handleError(err);

						models[e.label] = tmpModel;

						i++;
						admin.notify('admin:createPermission', permissions[i]);
					});

				} else {
					admin.notify('admin:createGroup', groups[j]);
				}
			});

			// Listen to create a group
			admin.listen('admin:createGroup', function(e) {
				var tmpModel,
					label,
					p;

				if (j < groups.length) {
					Hype.log("Creating group " + e.label);

					// Create the permissions property if it doesn't exist
					if (e.permissions === undefined) {
						e.permissions = [];
					}
					// Add the permissions based on the strings
					for(p = 0; p < e.permissionStr.length; p++) {
						label = e.permissionStr[p];
						// Push the new model on
						e.permissions.push(models[label]._id);
					}

					for (var key in e) {
					    if (key == 'permissionStr') {
					        delete e[key];
					    }
					}

					// Create the new group
					tmpModel = new AdminGroup(e);
					tmpModel.save(function(err) {
						j++;
						admin.notify('admin:createGroup', groups[j]);
					});
				} else {
					admin.notify('finished');
				}
			});

			admin.listen('finished', function(e) {
				Hype.log("Finished installing Admin 0.0.0.1")
			});

			// Kick off the installer
			// Recursively creates permissions until all are complete, then kicks off
			// an event to recursively create the user groups
			admin.notify('admin:createPermission', permissions[i]);

		},

		this.down = function() {
			Hype.log("Uninstalling Admin 0.0.0.1");

			var Permission = Hype.Db.getModel('Permission'),
				AdminGroup = Hype.Db.getModel('AdminGroup'),
				PermissionNames = ["Sales", "Product", "Cms", "Category"],
				AdminGroupNames = ["Superusers", "Marketing", "Sales", "Developer"];

			Permission.find(function(err, results) {
				for (var i = 0; i < results.length; i++) {
					results[i].remove();
				}
			});

			AdminGroup.find(function(err, results) {
				for (var i = 0; i < results.length; i++) {
					results[i].remove();
				}
			});

			Hype.log("Finished uninstalling Admin 0.0.0.1");
		}
	}
	
	return new Install();
}