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
 * methods like Hype.log() and Hype.debug() - We won't actual start until the last step
 */

var	Config = require('./config'),
	Hype = require('./core/Hype')(Config),
	Server = require('./core/Hype/Server')(Hype),
	Db = require('./core/Hype/Database')(Hype),
	Initializer = require('./core/Hype/Initializer')(Hype);

module.exports = (function() {
	"use strict";
	// Getting ready
	Hype.log("Preparing Hype Commerce v" + Config.version);
	// Connect to the database adapter
	Db.init(Config[Config.environment].db);
	// Start the server
	Server.init(Config[Config.environment].server);
	// Load the modules
	Initializer.init(Db, Server);
	// Boostrap Hype and blast off
	Hype.init(Initializer);
	// Silly tests
	Hype.listen('hype:start', function() {
		require('./super-cool-tests')(Hype);
	});
})();