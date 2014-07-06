/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		0.0.1.0
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

// Load necessary modules/files
var	fs = require('fs'),
	when = require('when'),
	path = require('path'),
	_ = require('underscore'),
	inst = false,
	Hype,
	Modules = {},
	HypeConfig = require('./config');

module.exports = function(app) {

	Hype = function() {
		if (!inst) {
			// Start the instance
			inst = this;

			// Holds current environment
			inst.env = HypeConfig.environment;

			// Holds the default theme
			inst.theme = null;

			// Holds the default theme
			inst.themePath = null;

			// Holds the configuration
			inst.configuration = HypeConfig.server[this.env];

			// database adapter
			inst.dba = require('./DatabaseAdapters/Mongo');

			// Holds routes
			inst.routes = {};

			inst.installed = false;
		}

		return inst;
	};

	// require function to call a plugin instance ?? maybe change instance ??
	Hype.prototype.require = function(name) {
		return (Modules[name] && Modules[name].is('enabled') && Modules[name].is('started')) ? Modules[name].instance : undefined;
	};

	Hype.prototype.loadPlugins = function(filepath) {

		var HypePlugin = require('./Hype/Plugin')(Hype),
			HypeModule = require('./Hype/Module')(Hype),
			self = this;

		this.log('Loading plugins from ' + filepath);

		fs.readdirSync(filepath).forEach(function(file) {
			// Skip hidden folders and files
			if (file.indexOf('.') !== 0) {
				/**
				 * loop over plugins
				 * read plugin config from `plugin.json`
				 * all other files go in to a lib dir
				 * load plugin
				 *
				 * Example:
				 *
				 * plugins
				 * - MyPlugin
				 *   - plugin.json
				 *   - lib
				 *     - MyPlugin.js
				 *     - Helper.js
				 *     - Models.js
				 *     - etc
				 * - SomeOtherPlugin
				 *   - plugin.json
				 *   - lib
				 *     - SomeOtherPlugin.js
				 *     - Helper.js
				 *     - Models.js
				 *     - etc
				 */

				var pluginPath = filepath + '/' + file,
					config = require(pluginPath + '/plugin.js'),
					name = config.name;

				// if main path for interface is not set log and return
				if (!config.main) {
					self.log('No main file for plugin: ' + name);
					return;
				}

				self.log("Adding plugin: " + name);

				var hypePlugin = new HypePlugin(); // instantiate plugin

				Modules[name] = new HypeModule(hypePlugin, config);
			}
		});
	};

	Hype.prototype.start = function() {
		var initializer = require('./Hype/Initializer');

		_(Modules).each(function(module, moduleName) {

			if (module.is('enabled')) {
				module.start();
			}
		});

		initializer.init(Modules, this, app);
	};

	Hype.prototype.connect = function() {
		// @todo, abstract into Hype/Database class that picks appropriate DatabaseAdapter
		this.log("Establishing database connection with MongoDB");
		this.dba.connect(this.configuration.db['mongo'].host, this.configuration.db['mongo'].username, this.configuration.db['mongo'].password, this.configuration.db['mongo'].port);
	}

	/**
	 * Logging
	 *
	 * @param	string	message;	Message to log
	 * @param	string	priority;	DEBUG|INFO|WARN|ERROR
	 * @return	Hype
	 */
	Hype.prototype.log = function(message, priority) {
		var date, timestamp;

		if (priority === undefined) {
			priority = 'info';
		}

		// Add a timestamp
		date = new Date();
		timestamp = '[' +  date.toUTCString() + '] ';
		message = timestamp + message;

		console[priority](message);

		return this;
	};

	return new Hype();
};
