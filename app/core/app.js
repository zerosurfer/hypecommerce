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
 * @author		Hype Commerce Team <team@hypecommerce.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypecommerce.com/)
 * @license		http://www.hypecommerce.com/license
 */

// Load necessary modules/files
var	fs = require('fs'),
	when = require('when'),
	path = require('path'),
	inst = false,
	_ = require('underscore'),
	Hype;

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
		
		// Holds the available modules
        inst.enabledModules = [];

        inst.installed = false;
	}
	return inst;
};

// Load the core classes, could act as singletons
Hype.prototype.Admin = require('./admin'); // admin logic
Hype.prototype.Auth = require('./auth'); // authentication logic (passport|other)
Hype.prototype.BaseHelper = require('./helper'); // base helper
Hype.prototype.BaseModel = require('./model'); // base model
Hype.prototype.Cluster = require('./cluster'); // deployment/clustering logic
Hype.prototype.Config = require('./config'); // configuration
Hype.prototype.Controller = require('./controller'); // base controller
Hype.prototype.Db = require('./db'); // database logic (mongodb|other)
Hype.prototype.Email = require('./email'); // email logic (sendmail|other)
Hype.prototype.Helper = {}; // global hold for helpers
Hype.prototype.Install = require('./install'); // installation script logic
Hype.prototype.Locale = require('./locale'); // translations, can look into the airbnb plugin/licensing for backbone
Hype.prototype.Log = require('./log'); // core logging
Hype.prototype.Model = {}; // global hold for models
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
	this.Log.log(message,priority);
	return this;
}

/**
 * Initiate Hype
 * Provides logic for the application, sets up the configuration, starts the express server,
 * connects to the db, and runs
 */
Hype.prototype.init = function() {
	var loaded = when.defer();
	var self = this;

	self.log("Hype init");

	return when.join(
		this.configure(),
		this.preload(),
		this.connect(),
		this.install(),
		this.start()
	).then(function() {
		self.log("Hype is up and running,  Enjoy ;)");
	}).otherwise(function() {
		self.log("failure");
	});
};

/**
 * Set all the configuration values for node/hype
 */
Hype.prototype.configure = function() {
	var loaded = when.defer();
	var self = this;
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

	for(var namespace in this.enabledModules) {
		currentNamespace = this.enabledModules[namespace];
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

			if (self.Model[name] === undefined) {
				self.Model[name] = new model();
			}

			if (self.Model[name].deps) {
				for(var needed in self.Model[name].deps) {
					modelNeeded = self.Model[name].deps[needed];
					if (typeof modelNeeded === 'string') {
						modelNeeded = modelNeeded.toLowerCase();
						if (!self.dba.hasModel(modelNeeded)) {
							loadModel(modelNeeded, self.models[modelNeeded]);
						}

						// We must set as an array? Pointless to encapsulate in the config then if it is always an array
						// @todo reinvestigate scenario
						self.Model[name].schema[needed] = [self.dba.getRawModel(modelNeeded)];
					} else {
						//self.log(modelNeeded);
						for(var n in modelNeeded) {
							loadModel(modelNeeded[n].toLowerCase(), self.models[modelNeeded[n].toLowerCase()]);
							self.Model[name].schema[needed] = [self.dba.getRawModel(modelNeeded[n].toLowerCase())];
							break;
						}
						
					}
				}
				//console.log(self.Model[name].schema);
				var dbaModel = self.dba.addModel(name, self.Model[name].schema);
				// Extend the models with the base model
				self.Model[name] = _.extend(self.Model[name], self.BaseModel);
				// Add the db adapter 
				self.Model[name].Db = dbaModel;
			} else {
				var dbaModel = self.dba.addModel(name, self.Model[name].schema);
				// Extend the models with the base model
				self.Model[name] = _.extend(self.Model[name], self.BaseModel);
				// Add the db adapter 
				self.Model[name].Db = dbaModel;
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

Hype.prototype.install = function() {
	var self = this,
		loaded = when.defer(),
		Setting,
		query;

	self.log('Checking for module upgrades');

	// Get the current version of each module from the db
	Setting = this.Model.setting;
	Setting.Db.find({ 'path': /install\/version/ }, function(err, settings) {
		//console.dir(settings);
		loaded.resolve();
	});

	// Get the current version of each module from the filesystem

	// Check modules that diff for an install script related to the version number

	// Run the script

	// Update the version in the database

	// Test for installation
	// self.log("TEST ONLY: Install script for core");
	// var install = require(path.resolve('app/plugins/hype/core/install/1.0.0.0.js'));
	// new install(self);


	self.log('Done checking for module upgrades');

	return loaded.promise;
}

Hype.prototype.start = function() {
	var self = this,
		loaded = when.defer();

	this.Server.init(this).then(function() {
		loaded.resolve();
	});

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
	if (self.enabledModules[namespace] === undefined) {
		self.enabledModules[namespace] = [];
	}

	// Set the global object namespace
	self.enabledModules[namespace][moduleName] = module;

};

Hype.prototype.addModel = function(fullModuleName, modelName, model) {
	var self = this,
		namespace = moduleName = undefined;

	var split = fullModuleName.split('/');
	namespace = split[0];
	moduleName = split[1];

	self.log("Adding model " + fullModuleName + "/" + modelName + " to Hype");

	// Load the model onto global object but don't instantiate, we'll do that with a dba adapter
	self.enabledModules[namespace][moduleName].models[modelName] = model;
};

Hype.prototype.addHelper = function(fullModuleName, helperName, helper) {
	var self = this,
		namespace = moduleName = undefined;

	var split = fullModuleName.split('/');
	namespace = split[0];
	moduleName = split[1];

	self.log("Adding helper " + fullModuleName + "/" + helperName + " to Hype");

	// Load the helper onto global object namespace
	self.enabledModules[namespace][moduleName].helpers[helperName] = new helper();
};

Hype.prototype.addController = function(fullModuleName, controllerName, controller) {
	var self = this,
		namespace = moduleName = undefined;

	var split = fullModuleName.split('/');
	namespace = split[0];
	moduleName = split[1];

	self.log("Adding controller " + fullModuleName + "/" + controllerName + " to Hype");

	// Load the controller onto global object namespace
	self.enabledModules[namespace][moduleName].api[controllerName] = new controller();
};

Hype.prototype.getModules = function() {
	return this.enabledModules;
}

module.exports = Hype;