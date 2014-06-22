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

/**
* A NOTE ON Extending modules
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

// Load libraries
var	fs      = require('fs'),
    url     = require('url'),
    when    = require('when'),
	path	= require('path'),
	Hype	= require('./app'),
	Log 	= require('./log');
	hype	= new Hype();

exports.init = function() {
	// Start it up
	Log.log("Signals clear for launch");
	hype.init();
};

exports.loadConfiguration = function() {
	Log.log("Loading the configuration files");
	// Set a promise
	var loaded = when.defer(),
		self = this,
		coreModulePath = path.resolve('app/plugins/hype'),
		localModulePath = path.resolve('app/plugins/local');

	this.readAndLoadDirectory = function(dir, type, module) {
		var dirLoaded = when.defer(),
			i = j = len = 0;

		fs.readdir(dir, function(err, items) {
			len = items.length;
			for (i; i < len; i++) {
				// skip hidden files
				if (items[i].indexOf('.') === 0) {
					len--;
					continue;
				}
				switch(type) {
					case 'model' :
						hype.addModel(module, items[i].replace('.js', ''), require(dir + "/" + items[i]));
						break;
				}
				if (i + 1 == len) {
					dirLoaded.resolve();
				}
			}
		});

		return dirLoaded.promise;
	},

	this.loadConfigurationFile = function(fullModuleName, modulePath) {
		var configLoaded = when.defer();
		fs.exists(modulePath + "/index.js", function(exists) {
			if (exists) {
				hype.addModule(fullModuleName, require(modulePath));
			}
			setTimeout(function() {
				configLoaded.resolve();
			}, 0);
		});
		return configLoaded.promise;
	},

	this.loadModelFolder = function(fullModuleName, modulePath) {
		var modelLoaded = when.defer();
		fs.exists(modulePath + "/models", function(exists) {
			if (exists) {
				Log.log("Need to read models in " + modulePath + "/models");

				self.readAndLoadDirectory(modulePath + "/models", 'model', fullModuleName).then(function() {
					Log.log("Models were read");
					setTimeout(function() {
						modelLoaded.resolve();
					}, 0);
				});
			}
			
		})
		return modelLoaded.promise;
	},

	this.loadHelperFolder = function(fullModuleName, modulePath) {
		var helperLoaded = when.defer();
		fs.exists(modulePath + "/helpers", function(exists) {
			if (exists) {
				Log.log("Need to read helpers in " + modulePath + "/helpers");
			}
			setTimeout(function() {
				helperLoaded.resolve();
			}, 0);
		})
		return helperLoaded.promise;
	},

	this.loadControllerFolder = function(fullModuleName, modulePath) {
		var controllerLoaded = when.defer();
		fs.exists(modulePath + "/controllers", function(exists) {
			if (exists) {
				Log.log("Need to read controllers in " + modulePath + "/controllers");
			}
			setTimeout(function() {
				controllerLoaded.resolve();
			}, 0);
		})
		return controllerLoaded.promise;
	}

	var i = j = len = 0,
		module = undefined,
		filteredModules = {},
		promises = [],
		fullModuleName = namespace = moduleName = modulePath = undefined;

	// Read the directory of core modules first
	fs.readdir(coreModulePath, function(err, modules) {

		// Filter the list of modules
		len = modules.length;
		for (i; i < len; i++) {
			moduleName = modules[i];
			// No hidden files or folders
			if (moduleName.indexOf('.') !== 0) {
				modulePath = coreModulePath + "/" + moduleName;
				filteredModules[moduleName] = modulePath;
			}
		}

		// Since we're loading core modules, define the namespace as "hype"
		namespace = 'hype';

		// Actually require the index.js file for each module
		for (module in filteredModules) {
			fullModuleName = namespace + "/" + module;
			when.join(self.loadConfigurationFile(fullModuleName, filteredModules[module])
			, self.loadModelFolder(fullModuleName, filteredModules[module])
			, self.loadHelperFolder(fullModuleName, filteredModules[module])
			, self.loadControllerFolder(fullModuleName, filteredModules[module]))
			.then(function() {
				loaded.resolve();
				Log.log("Done loading all the configuration files");
			});
		}		
		
	});

	return loaded.promise;
};