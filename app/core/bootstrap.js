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
	
	// The plan here is to make modules overwriteable
	// "hype", "local" folders - if the bootstrap finds the module in local first, it will use that
	// one. This would require copying down an entire module, which might be okay since all modules
	// will be versioned with documentation so that upgrades only affect a small portion of the
	// application, not the entire thing as a whole. If the user wants to upgrade their local
	// module, it's on their own terms to make it compatible
	var modulePath = path.resolve('app/plugins/hype');
	var moduleCount = 0;

	this.loadModule = function(module) {
		var moduleLoaded = when.defer();
		console.log("Loading " + module + "...");
		
		// Should actually check for the config.js file and throw an error if not found
		when(hype.addModule(require(modulePath + "/" + module + "/config.js"))).then(function() {
			return moduleLoaded.resolve();
		});

		return moduleLoaded.promise;
	}

	this.loadModules = function() {
		var modulesLoaded = when.defer();
		var moduleDir = fs.readdir(modulePath, function(err, modules) {
			for (var i = 0, j = 0, len = modules.length ; i < modules.length; i++) {
				var moduleName = modules[i];
				// No hidden files
				if (moduleName.indexOf('.') === 0) {
					len--;
					continue;
				}
				when(self.loadModule(moduleName)).then(function() {
					console.log("Done");
					if (j + 1 == len)
						return modulesLoaded.resolve();
					else
						++j;
				}).otherwise(function(err) {
					console.log("No " + err);
				});	
			}
		});

		return modulesLoaded.promise;
	}

	return when.join(
		this.loadModules()
	).then(function() {
		console.log("Finished bootstrap!");
	})
};