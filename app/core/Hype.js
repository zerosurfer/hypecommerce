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
			inst.env = null;

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

		return (Modules[name] && Modules[name].isEnabled()) ? Modules[name].instance : undefined;
	};

	Hype.prototype.loadPlugins = function(path) {

		var HypePlugin = require('./Hype/Plugin')(Hype),
			HypeModule = require('./Hype/Module')(Hype);

		fs.readdirSync(path).forEach(function(file) {

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

			var pluginPath = path + '/' + file,
				config = require(pluginPath + '/plugin.js')(Hype),
				name = config.name;

			// if main path for interface is not set log and return
			if (!config.creator) {
				Hype.log('No main file for plugin: ' + name);
				return;
			}

			var hypePlugin = new HypePlugin(), // instantiate plugin

			Modules[name] = new HypeModule(hypePlugin, config);
		});
	};

	Hype.prototype.start = function() {
		_(Modules).each(function(module, moduleName) {

			if (module.isEnabled()) {
				module.start();
			}
		});

		initModels();
		initScripts();
		initRoutes();
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

	// Recursively load the models into mongoose
	var loadModel = function(name, model) {

		if (!Hype.dba.hasModel(name)) {

			// if model has dependencies
			if (model.deps) {

				// for each dep
				// - check to see if it is instantiated
				// - if not instantiate it
				// - get the model
				// - update the current schema
				// - add model to dba

				if (model.deps.hasMany) {
					_(model.deps.hasMany).each(function(dep, localName) {
						if (!Hype.dba.hasModel(dep)) {
							loadModel(dep, Models[dep]);
						}
						model.schema[localName] = [Hype.dba.getModel(dep)];
					});
				}

				if (model.deps.hasOne) {
					_(model.deps.hasOne).each(function(dep, localName) {
						if (!Hype.dba.hasModel(dep)) {
							loadModel(dep, Models[dep]);
						}
						model.schema[localName] = Hype.dba.getModel(dep);
					});
				}

				Hype.dba.addModel(name, model.schema);

			} else {

				Hype.dba.addModel(name, model.schema);
			}
		}
	};

	var initModels = function() {

		_(Modules).each(function(module) {
			if (module.isStarted()) {
				if (module.models) {
					// Load the model schema
					_(Models).each(function(model, modelName) {
						// Instanstiate the model
						loadModel(modelName, model);
					});
				}
			}
		});
	};

	var initRoutes = function() {
		_(Modules).each(function(module) {
			if (module.isStarted()) {
				if (module.routes) {
					var routes = module.routes(Hype);
					_(routes).each(function(route, routeName) {
						// log the route addition
						Hype.log('Adding ' + route.method.toUpperCase() + ' route: ' + routeName)

						// using array notation to call the appropriate method
						app[route.method.toLowerCase()](routeName, route.callback);
					});
				}
			}
		});
	};

	var initScripts = function() {
		_(Modules).each(function(module) {
			if (module.isStarted()) {
				if (module.scripts) {
					var scripts = module.scripts(Hype);
					_(scripts).each(function(script, scriptName) {
						// do script stuff
					});
				}
			}
		});
	};

	/**
	 * Installs a module's install scripts up until the specified version number in index.js
	 *
	 * @todo	This function is bad ... just horribly hacked together, we'll eventually need
	 *			to take a look at this and move it's functionality to seperate functions that
	 * 			can be easily interpretted
	 */

	var installScript = function() {
		var self = this,
			loaded = when.defer();

		self.log("Checking for new installation scripts");

		// Run the installer on a script
		var installVersion = function(module, script, version) {
			var Install = require(script);
			var install = new Install(self);
			// Run the script
			if (typeof(install.up) !== undefined) {
				install.up();

				// Mark the db as updated

				// Attempt to find something
				var InstallSetting = self.models.setting;
				InstallSetting.Db.findOneAndUpdate(
					{ 'path' : "module/" + module + "/install" },
					{ 'value': version.replace('.js', '') },
					{ 'upsert': true },
					function(err, doc) {
						// executed query
					}
				);

			}

		}
		// Run the uninstaller on a script
		// @todo uninstall something when the version is lower
		var uninstallVersion = function(script) {
			var Install = require(script);
			var install = new Install();

			if (typeof(install.down) !== undefined) {
				install.down();
			}
		}

		// Need to read the loaded version numbers
		var instanstiatedVersions = {};
		var moduleCount = 0;
		var dbVersions = {};
		var modules = {};

		// Find all db versions
		var Setting = this.Model.setting;
		Setting.Db.find({ 'path': /install/ }, function(err, settings) {
			for (var setting in settings) {
				dbVersions[settings[setting].path] = settings[setting];
			}
			// Find all loaded version
			for (var namespace in self.Module) {
				for (var module in self.Module[namespace]) {
					var modulePath = "module/" + namespace + "/" + module + "/install";
					instanstiatedVersions[modulePath] = self.Module[namespace][module];
					modules[modulePath] = namespace + "/" + module;
					moduleCount++;
				}
			}

			var j = 0;
			// Compare the differences
			for (var instPath in instanstiatedVersions) {
				var instVersion = instanstiatedVersions[instPath].version.replace(/\./g, "");
				var needToInstall = false;

				// Check the db path
				var dbVersion = (dbVersions[instPath] !== undefined) ? dbVersions[instPath].value.replace(/\./g, "") : 0;
				if (dbVersions[instPath] === undefined) {
					self.log("Found new module: " + instanstiatedVersions[instPath].name + " (Version: " + instanstiatedVersions[instPath].version + ")");
					needToInstall = true;
				} else {
					var dbVersion = dbVersions[instPath].value.replace(/\./g, "");
					if (dbVersion < instVersion) {
						needToInstall = true;
					}
				}

				if (needToInstall) {
					// Read the versions we need
					var dir = path.resolve('app/plugins') + "/" + modules[instPath] + "/install";
					var items = fs.readdirSync(dir);
					for (var item in items) {
						var scriptVersion = items[item].replace(/\./g, "").replace('js', '');
						if (scriptVersion > dbVersion && scriptVersion <= instVersion) {
							//module, script, version, setting
							installVersion(modules[instPath], dir + "/" + items[item], items[item]);
						}
					}
				}

				if (j + 1 == moduleCount) {
					loaded.resolve();
				}

				j++;
			}
			//loaded.resolve();

			self.log("Done checking for new installation scripts");

		});

		return loaded.promise;
	}

	return new Hype();
};
