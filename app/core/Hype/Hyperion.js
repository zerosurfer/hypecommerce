var Hyperion,
	path = require('path'),
	fs = require('fs'),
	_ = require('underscore');

module.exports = function(commander) {

	Hyperion = function() {
		var self = this,
			currentPlugin;


		// Check for a valid plugin
		var _checkPluginDefined = function() {
			if (currentPlugin === undefined){
				return console.log("Please specify a plugin before attempting to add a %s", commander.add);
			}
			return true;
		};

		var _checkPluginName = function(namespace, plugin) {
			if (namespace === undefined || plugin === undefined) {
				return console.log("Please specify a valid plugin name");
			}
			return true;
		}

		this.version = '0.0.1.0',

		this.init = function() {
			// Set the version
			commander.version(this.version);
			
			// Set the arguments
			this.setArguments();
		},

		this.setArguments = function() {
			commander.option('-p, --plugin [name]', 'Set the current plugin to [plugin]');
			commander.option('-a, --add [model|route|helper]', 'Add a model|route|helper to the specified Hype plugin');
			commander.option('-i, --info [name]', 'Get information about the given plugin');
			commander.option('-c, --create [plugin]', 'Create a new plugin');

		},

		this.process = function() {
			// Read commands
			commander.parse(process.argv);
			
			// Process plugin environment
			if(commander.plugin !== undefined) {
				currentPlugin = commander.plugin;
			}

			if (commander.add !== undefined) {
				var allowed = ['route','model','helper'];

				// Check to make sure the command a valid object
				if (allowed.indexOf(commander.add) >= 0) {

					if (_checkPluginDefined() === true) {
						// add the object to the plugins folder
					}

				} else {
					return console.log("You must specify either a route, model, or helper to add");
				}

				console.log("Adding %s to %s plugin", commander.add, currentPlugin);

			}

			// Fetch information about the given plugin
			if (commander.info !== undefined) {

				// Check if we have a plugin specified
				if (_checkPluginDefined() === true) {

					// Read the project folder

				}
			}

			// Create a new plugin
			if (commander.create !== undefined) {
				// Split the namespace/plugin
				var split = commander.create.split('/'),
					namespace = split[0],
					plugin = split[1];

				// Check both namespace and plugin exist
				if (_checkPluginName(namespace, plugin)) {
					console.log("Creating plugin %s", commander.create);
				}
			}

			// Process environment information
			if(commander.environment !== undefined) {
				console.log(currentPlugin);
			}
		}
	}

	return new Hyperion();

}