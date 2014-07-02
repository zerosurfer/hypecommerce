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
	Modules = {};

Hype = function() {
	if (!inst) {
		// Start the instance
		inst = this;

		// Holds the db adapter
		inst.dba = null;

		// Holds current environment
		inst.env = null;

		// Holds the default theme
		inst.theme = null;

		// Holds the default theme
		inst.themePath = null;

		// Holds the configuration
		inst.configuration = {};

		// Holds routes
		inst.routes = {};

		// Holds models for mongoose
		inst.models = [];

		inst.installed = false;
	}

	return inst;
};

/**
 * @todo: need to set up a plugin system,
 * so they can add a callback that has access to Hype object,
 * allows them to access needed things for plugin development
 *
 * Example:
 * module.exports = function(Hype) {
 *
 * 	var privateFunc = function() {
 * 		// do private stuff
 * 		return 'HYPE is the bee\'s knees';
 * 	};
 *
 * 	Plugin.publicFunc = function() {
 * 		console.log(privateFunc());
 * 	}
 *
 * 	var auth = Hype.require('Auth'); !!!! Gold !!!! What do you think @Tom??
 *
 * 	auth.logOut();
 * };
 *
 * in other module call `Hype.MyPlugin.publicFunc()`
 */

// require function to call a plugin interface ?? maybe change interface ??
Hype.prototype.require = function(name) {

	return (Modules[name] && Modules[name].instance !== undefined && Modules[name].isEnabled()) ? Modules[name].instance : undefined;
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
			config = require(pluginPath + '/plugin.json'),
			name = path.basename(file, '.js');

		// if main path for interface is not set log and return
		if (!config.main) {
			Hype.log('No main file for plugin: ' + name);
			return;
		}

		var fn = require(config.main), // get interface creational function
			hypePlugin = new HypePlugin(), // instantiate plugin

		Modules[name] = new HypeModule(fn, hypePlugin, config);
	});
};

Hype.prototype.initModules = function(app) {
	var self = this;

	_(Modules).each(function(module, moduleName) {

		if (module.isEnabled()) {

			if (module.routes) {

				Hype.log('Adding route for ' + moduleName + ' module.');

				_(module.routes).each(function(route, routeName) {

					// routeName is the object key, route is the object value

					// log the route addition
					Hype.log('Adding ' + route.method[0].toUppercase + route.method.slice(1) + ' route: ' + routeName)

					// using array notation to call the appropriate method
					app[route.method](routeName, route.callback);
				});

				_(module.routes).each(function(route, routeKey) {
					self.routes[routeKey] = route;
				});
			}

			if (module.models) {
				// decide how to load models here
				// could move logic from loadModel here
				// I assume that you can only inject models from your own plugin ????
				// so logic should still be sound
			}

			if (module.scripts) {
				// decide how to load scripts here, @Tom i will need your help with this for sure
			}

			// start module
			module.start();
		}
	});
};

/**
 * @todo: all of these globals need to be come private plugins that only expose an interface
 * to protect as much of the core as possible
 *
 * @todo: move all files to core/plugins dir
 */
// Load the core classes, could act as singletons
//Hype.prototype.Admin = require('./admin'); // admin logic
Hype.prototype.Auth = require('./auth'); // authentication logic (passport|other)
Hype.prototype.BaseController = require('./controller'); // base controller // @todo deprecate into inst
Hype.prototype.BaseHelper = require('./helper'); // base helper // @todo deprecate into inst
Hype.prototype.BaseModel = require('./model'); // base model // @todo deprecate into inst
Hype.prototype.Cluster = require('./cluster'); // deployment/clustering logic
Hype.prototype.Config = require('./config'); // configuration
Hype.prototype.Db = require('./db'); // database logic (mongodb|other)
Hype.prototype.Email = require('./email'); // email logic (sendmail|other)
Hype.prototype.Helper = {}; // global hold for helpers
Hype.prototype.Install = require('./install'); // installation script logic
Hype.prototype.Locale = require('./locale'); // translations, can look into the airbnb plugin/licensing for backbone
Hype.prototype.Log = require('./log'); // core logging

/**
 * @todo: Models should only be available through Hype.dba
 */

Hype.prototype.Module = {}; // global hold for enabled modules
Hype.prototype.Server = require('./server'); // server logic (express|other)
Hype.prototype.Session = require('./session'); // session logic (redis|other)
Hype.prototype.Wizard = false; // installation wizard for first-time install (should probably inject this on a boolean check)

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

/**
 * Initiate Hype
 * Provides logic for the application, sets up the configuration, starts the express server,
 * connects to the db, and runs
 */
Hype.prototype.init = function() {
	var loaded = when.defer();
	var self = this;

	self.log("Hype init");

	// This doesn't always work, if we don't return a promise on install() it still runs through
	return when.join(
		this.configure(),
		this.preload(),
		this.connect(),
		this.install()
	).then(function() {
		self.start();
	}).then(function() {
		self.log("Hype is up and running,  Enjoy ;)");
	}).otherwise(function() {
		self.log("failure");
	});
};

/**
 * Set all the configuration values for node/hype
 */
Hype.prototype.configure = function() {
	var loaded = when.defer(),
		self = this;

	self.log("Setting up configuration");

	// Set the environment
	this.env = this.Config.hype.environment;

	// Set the theme (temporarily)
	this.theme = this.Config.hype.theme;

	// Set the theme path
	this.themePath = path.resolve('app/themes/' + this.theme);

	// Load the applicable configuration
	this.configuration = this.Config.server[this.env];

	// Check if installed, if not then we need to hijack the system here and force installation
    if (!this.installed) {
    	this.wizard = require('./wizard');
    }

    loaded.resolve();

	return loaded.promise;
}

Hype.prototype.preload = function() {
	var loaded = when.defer();
	var self = this;
	self.log("Setting up the routers");

	for(var namespace in this.Module) {
		currentNamespace = this.Module[namespace];
		for (var module in currentNamespace) {
			var currentModule = currentNamespace[module];
			for (var route in currentModule.api.routes) {

				self.log("Setting up router " + route + " for " + moduleName);
				this.routes[route] = currentModule.api.routes[route];

			}
			// load models
			for (var model in currentModule.models) {
				this.models[model] = currentModule.models[model];

			}
		}
	}

	loaded.resolve();

	return loaded.promise;
};

Hype.prototype.connect = function() {
	var self = this;
	var loaded = when.defer();
	self.log("Connecting to the db");

	// Depending on the configuration, we can load a different db adapter
	switch(this.configuration.db.type) {
		// MongoDB
		case 'mongo' :
			this.dba = require('./db/mongo');
			this.dba.connect(
				this.configuration.db[this.configuration.db.type].host + (this.configuration.db[this.configuration.db.type].port ?
					":" + this.configuration.db[this.configuration.db.type].port : ''),
				this.configuration.db[this.configuration.db.type].username,
				this.configuration.db[this.configuration.db.type].password,
				this.configuration.db[this.configuration.db.type].dbname
			);

			// Set the db on the base model
			var BaseModel = this.BaseModel;
			this.BaseModel = new BaseModel(self, this.dba);

			break;
		case 'couchdb' :

			break;
		case 'mariadb' :

			break;
		// @todo MySQL adapter
		case 'mysql' :

			break;
		// @todo Localstorage adapter
		// Please never use this in a production environment
		case 'localstorage' :

			break;
	}

	// Recursively load the modules into mongoose
	var loadModel = function(name, model) {
		var modelNeeded = undefined;

		if (!self.dba.hasModel(name)) {

			if (self.models[name] === undefined) {
				self.models[name] = new model();
			}

			if (self.models[name].deps) {

				_(self.models[name].deps).each(function(dep, key) {

					if (typeof dep === 'string') {
						if (!self.dba.hasModel(modelNeeded)) {
							loadModel(modelNeeded, dep);
						}
					} else {
						_(dep).each(function(needed) {

						});
					}
				});

				for(var needed in self.models[name].deps) {
					modelNeeded = self.models[name].deps[needed];
					if (typeof modelNeeded === 'string') {
						modelNeeded = modelNeeded.toLowerCase();
						if (!self.dba.hasModel(modelNeeded)) {
							loadModel(modelNeeded, self.modelss[modelNeeded]);
						}

						// We must set as an array? Pointless to encapsulate in the config then if it is always an array
						// @todo reinvestigate scenario
						// It is an array of documents, so it's always an array
						self.models[name].schema[needed] = [self.dba.getRawModel(modelNeeded)];
					} else {
						//self.log(modelNeeded);
						for(var n in modelNeeded) {
							loadModel(modelNeeded[n].toLowerCase(), self.modelss[modelNeeded[n].toLowerCase()]);
							self.models[name].schema[needed] = [self.dba.getRawModel(modelNeeded[n].toLowerCase())];
							break;
						}

					}
				}
				//console.log(self.models[name].schema);
				var dbaModel = self.dba.addModel(name, self.models[name].schema);
				// Extend the models with the base model
				self.models[name] = _.extend(self.models[name], self.BaseModel);
				// Add the db adapter
				self.models[name].Db = dbaModel;
			} else {
				var dbaModel = self.dba.addModel(name, self.models[name].schema);
				// Extend the models with the base model
				self.models[name] = _.extend(self.models[name], self.BaseModel);
				// Add the db adapter
				self.models[name].Db = dbaModel;
			}
		}
	}

	// Load the model schema
	for (var m in this.models) {
		// Instanstiate the model
		loadModel(m, this.models[m]);
	}

	loaded.resolve();

	return loaded.promise;
}

/**
 * Installs a module's install scripts up until the specified version number in index.js
 *
 * @todo	This function is bad ... just horribly hacked together, we'll eventually need
 *			to take a look at this and move it's functionality to seperate functions that
 * 			can be easily interpretted
 */
Hype.prototype.install = function() {
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

Hype.prototype.start = function() {
	var self = this,
		loaded = when.defer();

	if (this.configuration.nodes > 1) {
		var Cluster = new this.Cluster();

		Cluster.init(this).then(function() {
			loaded.resolve();
		});

	} else {
		// if (this.configuration)
		this.Server.init(this).then(function() {
			loaded.resolve();
		});
	}

	return loaded.promise;
};

Hype.prototype.addModule = function(fullModuleName, module) {
	var self = this,
		namespace = moduleName = undefined;

	self.log("Adding " + fullModuleName + " to Hype");

	var split = fullModuleName.split('/');
	namespace = split[0];
	moduleName = split[1];

	// Load a module into the appropriate namespace, when we have overrides we'll call upon those functions in the JSON array
	if (self.Module[namespace] === undefined) {
		self.Module[namespace] = [];
	}

	// Set the global object namespace
	self.Module[namespace][moduleName] = module;

};

Hype.prototype.addModel = function(fullModuleName, modelName, model) {
	var self = this,
		namespace = moduleName = undefined;

	var split = fullModuleName.split('/');
	namespace = split[0];
	moduleName = split[1];

	self.log("Adding model " + fullModuleName + "/" + modelName + " to Hype");

	// Load the model onto global object but don't instantiate, we'll do that with a dba adapter
	self.Module[namespace][moduleName].models[modelName] = model;
};

Hype.prototype.addHelper = function(fullModuleName, helperName, helper) {
	var self = this,
		namespace = moduleName = undefined;

	var split = fullModuleName.split('/');
	namespace = split[0];
	moduleName = split[1];

	self.log("Adding helper " + fullModuleName + "/" + helperName + " to Hype");

	// Load the helper onto global object namespace
	self.Module[namespace][moduleName].helpers[helperName] = new helper();
};

Hype.prototype.addController = function(fullModuleName, controllerName, controller) {
	var self = this,
		namespace = moduleName = undefined;

	var split = fullModuleName.split('/');
	namespace = split[0];
	moduleName = split[1];

	self.log("Adding controller " + fullModuleName + "/" + controllerName + " to Hype");

	// Load the controller onto global object namespace
	self.Module[namespace][moduleName].api[controllerName] = new controller();
};

Hype.prototype.getModules = function() {
	return this.Module;
}

module.exports = new Hype();
