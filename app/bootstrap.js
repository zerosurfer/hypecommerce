/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		0.0.1.0
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

var	fs = require('fs'),
	url = require('url'),
	path = require('path'),
	express = require('express'),
	app = express(),
	passport = require('passport')
	server = require('./core/Hype/Server')(app),
	Hype = require('./core/Hype')(app);

module.exports = (function() {
	var PermissionModel,
		p;

	"use strict";

	Hype.log('Preparing for launch');

	// Connect to mongo
	Hype.connect();

	// Load core plugins
	Hype.loadPlugins(path.resolve('./app/core/Plugins'));

	// Load third-party plugins
	fs.readdirSync(path.resolve('./app/plugins')).forEach(function(file) {;
		Hype.loadPlugins(path.resolve('./app/plugins/' + file));
	});

	// Start Hype
	Hype.start();

	// Start the server
	server.start(app, express, passport, Hype);
	
	Hype.log('Successfully launched your Hype Commerce store');

	// Temporary testing
	require('./super-cool-tests')(Hype);
})();