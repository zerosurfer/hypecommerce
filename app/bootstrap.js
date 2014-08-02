/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		0.0.1.0
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

/**
 * Bootstrap 2.0
 *
 * Everything is abstracted and only fed into the Hype class during the final step
 *
 * 1) Load the configuration
 * 2) Start the Database (default: mongo)
 * 3) Start the Server 
 * 4) Initializer the modules
 * 5) Start Hype
 *
 * We give Server and Db the initial Hype object so that it can grab some generic 
 * methods like Hype.log() and Hype.debug() - We won't actual init until the last step
 *
 *
 *
 */

var	fs = require('fs'),
	url = require('url'),
	path = require('path'),
	Config = require('./config'),
	Hype = require('./core/Hype')(Config),
	Server = require('./core/Hype/Server')(Hype),
	Db = require('./core/Hype/Database')(Hype);
	//Modules = require('./core/Hype/Initializer')();

module.exports = (function() {
	"use strict";
	// Connect to the database adapter
	Db.init(Config[Config.environment].db);

	// Start the server
	Server.init(Config[Config.environment].server);

	// Load the modules
	// Modules.load(Db, Server);

	// Start Hype
	// Hype.start(Modules);

	// Hype.loadPlugins(path.resolve('./app/core/Plugins'));

	// // Load third-party plugins
	// fs.readdirSync(path.resolve('./app/plugins')).forEach(function(file) {;
	// 	Hype.loadPlugins(path.resolve('./app/plugins/' + file));
	// });

	// // Start Hype
	// Hype.start();

	// // Start the server
	// server.start(app, express, passport, Hype);
	
	// Hype.log('Successfully launched your Hype Commerce store');

	// // Temporary testing
	// require('./super-cool-tests')(Hype);
})();