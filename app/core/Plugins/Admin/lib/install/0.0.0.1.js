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

			// Get the admin module to listen for events
			var admin = Hype.require('Admin'),
				PermissionSchema = Hype.dba.getSchema('Permission'),
				GroupSchema = Hype.dba.getSchema('AdminGroup'),
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
			groups = [
				{
					'label' : 'Superusers',
					'permissions': [
						'Category',
						'Cms',
						'Product',
						'Sales'
					]
	            },
	            {
					'label' : 'Marketing',
					'permissions': [
						'Category',
						'Cms',
						'Product'
					]
	            },
	            {
					'label' : 'Sales',
					'permissions': [
						'Product',
						'Sales'
					]
	            },
	            {
					'label' : 'Developer',
					'permissions': [
						'Category',
						'Cms',
						'Product',
						'Sales'
					]
	            },
			];
			
			// Listen to create a permission
			admin.listen('createPermission', function(e) {
				var tmpSchema;
				// Create the new permission
				if (i < permissions.length) {
					Hype.log("Creating permission " + e.label);
					// Create the new permission
					tmpSchema = new PermissionSchema(e);
					// Add the model to the models object for later use
					models[e.label] = tmpSchema.save();

					i++;
					admin.notify('createPermission', permissions[i]);

				} else {
					admin.notify('createGroup', groups[j]);
				}
			});

			// Listen to create a group
			admin.listen('createGroup', function(e) {
				var tmpSchema,
					p;

				if (j < groups.length) {
					Hype.log("Creating group " + e.label);

					// Add the permissions based on the strings
					for(p = 0; p < e.permissions.length; p++) {
						e.permissions[p] = models[e.permissions[p]]._id;
					}

					// Create the new group
					tmpSchema = new GroupSchema(e);
					tmpSchema.save();

					j++;
					admin.notify('createGroup', groups[j]);
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
			admin.notify('createPermission', permissions[i]);

		},

		this.down = function() {
			Hype.log("Uninstalling Admin 0.0.0.1");
		}
	}
	
	return new Install();
}