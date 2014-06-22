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

	/**
	 * Extending modules
	 *
	 * We load all hype modules first, then "rewrite" them using the local config.js files 
	 *
	 * Example:
	 * Load hype/core/config.js - set all configuration necessary
	 * Load local/mymodule/config.js which contains something like:
	 *  
	 *  core: { 
	 *    api: {
	 *	    routes: {
	 *	      '/test' : {
	 *		    method: 'get',
	 *		      callback: function(request, response) {
	 *			    response.send(200, 'hi test');
	 *			  }
	 *		  }
	 *	    }
	 *    }
	 *  )
	 *
	 * This would overwrite the api route and do it's own thing - this is going to get rough with multiple extends, no?
	 * We'll need to find a sane way to deal with this
	 */
	var modulePath = path.resolve('app/plugins/hype');
	var localModulePath = path.resolve('app/plugins/local');

	this.loadModule = function(module) {
		var moduleLoaded = when.defer();
		console.log('Waiting for module...');

		// Should actually check for the index.js file and throw an error if not found
		// Kind of crappy, we need to load the file first before checking if it's disabled
		// It's practically loaded at this point, we're just preventing it from becoming
		// bootstrapped into runtime
		fs.exists(modulePath + "/" + module + "/index.js", function(exists) {
			if (exists) {
				when(hype.addModule(require(modulePath + "/" + module + "/index.js"))).then(function() {
					moduleLoaded.resolve();
				});
			} else {
				console.log("Could not find index.js for module " + module);
				moduleLoaded.resolve();
			}
		})
		return moduleLoaded.promise;
	}

	this.loadModules = function() {
		var modulesLoaded = when.defer(),
			i = j = len = 0,
			moduleName = undefined;

		fs.readdir(modulePath, function(err, modules) {
			len = modules.length;
			for (i; i < modules.length; i++) {
				moduleName = modules[i];
				// No hidden files or disabled modules
				if (moduleName.indexOf('.') === 0) {
					len--;
					continue;
				}
				when(self.loadModule(moduleName)).then(function() {
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