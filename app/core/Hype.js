/**
 * Hype Commerce
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Hype Commerce Creative Commons License that is bundled with
 * this package in the file LICENSE.txt. It is also available through the world-wide-web at this
 * URL {@link http://www.hypecommerce.com/license}. If you did not receive a copy of the license
 * and are unable to obtain it through the world-wide-web, please send an email to
 * {@link mailto:license@hypecommerce.com} so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Hype Commerce to newer versions in the
 * future. If you wish to customize Hype Commerce for your needs please refer to
 * {@link http://www.hypecommerce.com/} for more information.
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
			HypeModule = require('./Hype/Module')(Hype);

		fs.readdirSync(filepath).forEach(function(file) {

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
			if (!config.creator) {
				Hype.log('No main file for plugin: ' + name);
				return;
			}

			var hypePlugin = new HypePlugin(); // instantiate plugin

			Modules[name] = new HypeModule(hypePlugin, config);
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
