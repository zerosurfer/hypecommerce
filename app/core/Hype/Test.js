/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		0.0.1
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

var	requireDir = require('require-dir'),
	fs = require('fs'),
	Config = require('../../config'),
	Hype = require('../Hype')(Config),
	Server = require('./Server')(Hype),
	Db = require('./Database')(Hype),
	Initializer = require('./Initializer')(Hype),
	Setup = require('./Setup')(Hype),
	Cron = require('./Cron')(Hype);

// Require any scripts from active modules
module.exports = function() {

	TestUtil = function() {

		this.run = function() {
			requireDir('../Plugins/System/tests');
			// // Artificially start Hype in a test environment
			// Hype.log("Preparing test environment for Hype Commerce v" + Config.version, 'info');
			// // Connect to the database adapter
			// Db.init(Config['test'].db);
			// // Start the server
			// Server.init(Config['test'].server);
			// // Load the modules
			// Initializer.init(Server, Db, Cron);
			// // Boostrap Hype and blast off
			// Hype.init(Initializer);
			// // Start Hype (installs modules and starts server)
			// Hype.start();
			// // Start the tests

			// Hype.listen('hype.start', function() {
			// 	requireDir('../Plugins/System/tests')
			// });
		}
	}

	return new TestUtil();
}