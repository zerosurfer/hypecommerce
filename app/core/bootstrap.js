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

// Load libraries
var	fs      = require('fs'),
    url     = require('url'),
    when    = require('when'),
	path	= require('path'),
	Hype	= require('./app'),

// Define variables
    config,

// Load Hype
	hype	= new Hype();

exports.init = function() {
	// Start it up
	when(hype.init()).then(function() {
		console.log ("Ready for action");
	}).otherwise(function() {
		console.log("Failed to initialze Hype");
	});
};

exports.loadConfiguration = function() {
	// Set a promise
	var loaded = when.defer();
	var self = this;
	var modulePath = path.resolve('app/plugins');

	this.loadModule = function(module) {
		var moduleLoaded = when.defer();
		console.log("Loading " + module + "...");
		
		hype.addModule(require(modulePath + "/" + module + "/config.js"));

		moduleLoaded.resolve();

		return moduleLoaded.promise;
	}

	var moduleDir = fs.readdir(modulePath, function(err, modules) {
		for (var i = 0; i < modules.length; i++) {
			var moduleName = modules[i];
			when(self.loadModule(moduleName)).then(function() {
				console.log("Done");
				return loaded.resolve();
			}).otherwise(function(err) {
				console.log("No " + err);
			});	
		}
	});

    // Fufill the promise
    return loaded.promise;
};