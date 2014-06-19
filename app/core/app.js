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
var	config = require('./config'),
	express = require('express'), // Express framework
	app = express(), // Express application
	when = require('when'),
	path = require('path'),
	inst = false,
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
	}
	return inst;
};

/**
 * Initiate Hype
 * Provides logic for the application, sets up the configuration, starts the express server,
 * connects to the db, and runs
 */
Hype.prototype.init = function() {
	var loaded = when.defer();
	var self = this;

	console.log("Preparing to start Hype");
	loaded.resolve();


	return when.join(
		this.configure(),
		this.preload(),
		this.connect(),
		this.start()
	);
};

Hype.prototype.preload = function() {
	var loaded = when.defer();
	console.log("Setting up the routers");

	for(var moduleName in this.enabledModules) {
		currentModule = this.enabledModules[moduleName];
		for (var route in currentModule.api.routes) {
			
			console.log("Setting up router " + route + " for " + moduleName);
			this.routes[route] = currentModule.api.routes[route];

		}
		// load models
		for (var model in currentModule.models) {
			this.models[model] = currentModule.models[model];

		}
	}

	return loaded.promise;
};

/**
 * Set all the configuration values for node/hype
 */
Hype.prototype.configure = function() {
	var loaded = when.defer();
	console.log("Setting up configuration");

	// Set the environment
	this.env = config.hype.environment;

	// Set the theme (temporarily)
	this.theme = config.hype.theme;

	//
	this.themePath = path.resolve('app/themes/' + this.theme);

	// Load the applicable configuration
	this.configuration = config.server[this.env];

	// Load all the enabled plugins

	return loaded.resolve();
}

Hype.prototype.connect = function() {
	var self = this;
	var loaded = when.defer();
	console.log("Connecting to the db");

	// Depending on the configuration, we can load a different db adapter
	switch(this.configuration.db.type) {
		// MongoDB
		case 'mongo' :
			this.dba = require('./db/mongo');
			this.dba.connect(
				this.configuration.db.connection.host + (this.configuration.db.connection.port ? 
					":" + this.configuration.db.connection.port : ''),
				this.configuration.db.connection.username,
				this.configuration.db.connection.password,
				this.configuration.db.connection.dbname
			);
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
		if (!self.dba.models[name]) {
			if (model.deps) {

				for(var needed in model.deps) {

					if (!self.dba.models[model.deps[needed]]) {

						loadModel(model.deps[needed], self.models[model.deps[needed]]);
					}

					self.models[name].schema[needed] = self.dba.models[model.deps[needed]];
				}

				self.dba.addModel(name, self.models[name].schema);
			} else {
				self.dba.addModel(name, self.models[name].schema);
			}
		}
	}

	// Load the model schema
	for (var m in this.models) {
		loadModel(m, this.models[m]);
	}

	return loaded.resolve();
}

Hype.prototype.start = function() {
	var self = this,
		loaded = when.defer(),
		r,
		route,
		routeMethod,
		routeCallback;

	console.log('Starting application');

	app.configure(function(){
		app.use(express.bodyParser());
		app.use(express.cookieParser());
		app.use(express.methodOverride());

		// Set locals to use on the config.js files
		// dba -> Default db connector
		app.use(function (req, res, next) {
			res.locals = {
				dba: self.dba
			};
			next();
		});

		app.use(express.favicon());
		app.use(express.logger("dev"));
		app.engine('html', require('ejs').renderFile);
		app.set('views', self.themePath);
		app.get('/', function (req, res) {
			res.render(self.themePath + '/index.html');
		});

		// Add the api routes
		for(r in self.routes) {
			route = self.routes[r];
			routeMethod = route.method;
			routeCallback = route.callback;
			switch(routeMethod) {
				case 'get' :
					app.get(r, routeCallback);
					break;
				case 'post' :
					app.post(r, routeCallback);
					break;
				case 'delete' :
					app.delete(r, routeCallback);
					break;
				case 'put' :
					app.put(r, routeCallback);
					break;
			}
		}

		app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
	});

	app.listen(this.configuration.port, function() {
		console.log( 'Express server listening on port %d in %s mode', self.configuration.port,
			app.settings.env );
	});


	return loaded.resolve();
};

Hype.prototype.addModule = function(module) {
	var loaded = when.defer();
	// Test timing
	//setTimeout(function() { console.log("waiting..."); loaded.resolve(); }, 4000);
	loaded.resolve(); 
	// Don't load modules twice, if they exist, we're going to take the first instance we find	
	if (this.enabledModules[module.name] !== undefined) {
		console.log("Module " + module.name + " already exists, skipping")
	// Check enabled
	} else if (module.enabled == true) {

		// Check dependencies
		console.log("Module " + module.name + " was added to Hype");
		this.enabledModules[module.name] = module;
		
	}

	return loaded.promise;
};

Hype.prototype.getModules = function() {
	return this.enabledModules;
}

module.exports = Hype;