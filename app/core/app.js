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
	express = require('express'), // Express framework
	app = express(), // Express application
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

        inst.wizard = false;
	}
	return inst;
};

// Load the core classes, could act as singletons
Hype.prototype.Log = require('./log');
Hype.prototype.BaseModel = require('./model'); // base model
Hype.prototype.Helper = require('./helper'); // base helper
Hype.prototype.Controller = require('./controller'); // base controller
Hype.prototype.Install = require('./install'); // installation script logic
Hype.prototype.Server = require('./server'); // server logic (express|other)
Hype.prototype.Email = require('./email'); // email logic (sendmail|other)
Hype.prototype.Cluster = require('./cluster'); // deployment/clustering logic
Hype.prototype.Auth = require('./auth'); // authentication logic (passport|other)
Hype.prototype.Db = require('./db'); // database logic (mongodb|other)
Hype.prototype.Admin = require('./admin'); // admin logic
Hype.prototype.Config = require('./config'); // configuration
Hype.prototype.Model = {}; // holds models
// Hype.prototype.Locale = require('./locale'); // translations, can look into the airbnb plugin/licensing for backbone

// Hype.prototype.Wizard = require('./wizard');

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

		if (!self.dba.models[name]) {

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

						self.Model[name].schema[needed] = self.dba.getRawModel(modelNeeded);
					} else {
						//self.log(modelNeeded);
						for(var n in modelNeeded) {
							loadModel(modelNeeded[n].toLowerCase(), self.models[modelNeeded[n].toLowerCase()]);
						}
						self.Model[name].schema[needed] = [self.dba.getRawModel(modelNeeded)];
					}
				}

				var dbaModel = self.dba.addModel(name, self.Model[name].schema);
				// Extend the models with the dba
				self.Model[name] = _.extend(dbaModel, self.Model[name], self.BaseModel);
			} else {
				var dbaModel = self.dba.addModel(name, self.Model[name].schema);
				// Extend the models with the dba
				self.Model[name] = _.extend(dbaModel, self.Model[name], self.BaseModel);
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

Hype.prototype.start = function() {
	var self = this,
		loaded = when.defer(),
		r,
		route,
		routeMethod,
		routeCallback;

	self.log('Starting application');

	// Test for installation
	// self.log("TEST ONLY: Install script for core");
	// var install = require(path.resolve('app/plugins/hype/core/install/1.0.0.0.js'));
	// new install(self);

	var readAndSetRoutes = function() {
		var namespace, module, controller, route, routeMethod, routeCallback;;

		self.log("Preparing to set initial routes");

		// @todo, optimize whatever O notation this is... 
		for (namespace in self.enabledModules) {
			for (module in self.enabledModules[namespace]) {
				self.log("Searching " + namespace + "/" + module + " for controllers");
				// Look for controllers
				if (self.enabledModules[namespace][module].api) {
					for (controller in self.enabledModules[namespace][module].api) {
						self.log("Found controller " + controller);
						for (route in self.enabledModules[namespace][module].api[controller].routes) {
							routeMethod = self.enabledModules[namespace][module].api[controller].routes[route].method;
							routeCallback = self.enabledModules[namespace][module].api[controller].routes[route].callback;
							switch(routeMethod) {
								case 'get' :
									self.log("Adding GET route " + route);
									app.get(route, routeCallback);
									break;
								case 'post' :
									self.log("Adding POST route " + route);
									app.post(route, routeCallback);
									break;
								case 'delete' :
									self.log("Adding DELETE route " + route);
									app.delete(route, routeCallback);
									break;
								case 'put' :
									self.log("Adding PUT route " + route);
									app.put(route, routeCallback);
									break;
							}
						}
					}
				}
			}
		}



		// Add the api routes
		for(r in self.routes) {
			console.log(r);
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
	}

	app.configure(function(){

		app.use(express.bodyParser());
		app.use(express.cookieParser());
		app.use(express.methodOverride());

		app.settings.env = self.env || 'development';

		// CSRF Token for CORS
		// Load locals
		app.use(function(req, res, next) {
			//res.locals.csrftoken = res.session._csrf;
			res.locals.admin = self.configuration.admin;
			next();
		})

		app.use(app.router);
		app.use(express.favicon());
		app.use(express.logger("dev"));
		app.engine('html', require('ejs').renderFile);
		app.set('views', self.themePath);
		app.get('/', function (req, res) {
			res.render(self.themePath + '/index.html');
		});

		// Add the admin routes
		// These should be required from admin.js
		app.get('/' + self.configuration.admin, self.Admin.requiredAuth(), self.Admin.index);
		app.get('/' + self.configuration.admin + '/login', self.Admin.login);
		app.post('/' + self.configuration.admin + '/login', self.Admin.loginPost);
		app.get('/' + self.configuration.admin + '/:controller/:action', self.Admin.test);

		readAndSetRoutes();

		// Setup a custom 404 page
		app.use(function(req, res, next){
			res.status(404);

			// respond with html page
			if (req.accepts('html')) {
				res.render(self.themePath + '/404.html', { url: req.url });
				return;
			}

			// respond with json
			if (req.accepts('json')) {
				res.send({ error: 'Not found' });
				return;
			}
		});

		app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
	});

	app.listen(this.configuration.port, function() {
		self.log( 'Express server listening on port %d in %s mode', self.configuration.port,
			app.settings.env );
			
		loaded.resolve();
	});

	// // Test inheritance
	// var model = self.Model['setting'];
	// self.log("TEST FUNCTION OF INHERITANCE: " + model.testFunc()); // inheritance!

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