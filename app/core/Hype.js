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
	path = require('path'),
	_ = require('underscore'),
	HypeConfig = require('./../config'),
	inst = false,
	Modules = {},
	Hype;

module.exports = function(app) {

	/**
	 * The one, this is Hype. Set a few necessary (mostly) environment variables
	 * and get ready to rock
	 *
	 * @return
	 */
	Hype = function() {
		if (!inst) {
			// State the instance
			inst = this;

			// Holds current environment
			inst.env = HypeConfig.environment;

			// Holds the configuration
			inst.configuration = HypeConfig.server[this.env];

			// Holds the encryption secret
			inst.secret = HypeConfig.secret;

			// Holds the default theme
			inst.theme = inst.configuration.theme;

			// Holds the default theme
			inst.themePath = path.resolve('app/themes/' + inst.theme);

			// Log enabled
			inst.logEnabled = inst.configuration.log;

			// Debug enabled
			inst.debugEnabled = inst.configuration.debug;

			// database adapter
			inst.dba = require('./DatabaseAdapters/Mongo');

			// locale instance
			inst.locale = require('./Hype/Locale')(Hype);
			console.log(inst.locale);

			// Is installed
			inst.installed = false;
		}

		return inst;
	};

	/**
	 * Require a module
	 *
	 * @param	String	name
	 * @return	Boolean|undefined
	 */
	Hype.prototype.require = function(name) {
		return (Modules[name] && Modules[name].is('enabled') && Modules[name].is('started')) ? Modules[name].instance : undefined;
	};

	/**
	 * Load all plugins in a directory based on plugin.js and wrap it in a module
	 *
	 * @param	String	filepath
	 * @return	Hype
	 */
	Hype.prototype.loadPlugins = function(filepath) {

		var HypePlugin = require('./Hype/Plugin')(this),
			HypeModule = require('./Hype/Module')(this),
			self = this;

		this.log('Loading plugins from ' + filepath);

		// Read the directory
		fs.readdirSync(filepath).forEach(function(file) {
			// Skip hidden folders and files
			if (file.indexOf('.') !== 0) {

				var pluginPath = filepath + '/' + file,
					config,
					name;

				// Configure the plugin
				if(fs.existsSync(pluginPath + '/plugin.js')) {
					var config = require(pluginPath + '/plugin.js'),
						name = config.name,
						hypePlugin,
						admin,
						adminName;

					if (typeof config === 'function') {
						config = config(self);
					}

					// Configure the admin
					if(fs.existsSync(pluginPath + '/admin.js')) {
						admin = require(pluginPath + '/admin.js'),
						adminName = admin.name;

						if (typeof admin === 'function') {
							admin = admin(self);
						}

						// Add the admin to config
						config.admin = admin;
					}

					self.log("Adding plugin: " + name);
					// Instantiate the plugin
					hypePlugin = new HypePlugin();
					// Add the plugin to a protected module
					Modules[name] = new HypeModule(name, hypePlugin, config, filepath + '/' + file);
				} else {
					self.log("Skipping plugin: " + name + " (plugin.js not found)");
				}
			}
		});

		return this;
	};

	/**
	 * Run the initializer and start each module
	 *
	 * @return	Hype
	 */
	Hype.prototype.start = function() {
		var initializer = require('./Hype/Initializer');

		_(Modules).each(function(module, moduleName) {

			if (module.is('enabled')) {
				module.start();
			}
		});

		initializer.init(Modules, this, app);

		return this;
	};

	/**
	 * Connect to the MongoDB server
	 *
	 * @todo	Use an abstraction layer to connect to any desired db
	 * @return	Hype
	 */
	Hype.prototype.connect = function() {
		// @todo, abstract into Hype/Database class that picks appropriate DatabaseAdapter
		this.log("Establishing database connection with MongoDB");
		this.dba.connect(
			this.configuration.db['mongo'].host + ':' + this.configuration.db['mongo'].port,
			this.configuration.db['mongo'].username,
			this.configuration.db['mongo'].password,
			this.configuration.db['mongo'].dbname
		);
	}

	/**
	 * Log
	 *
	 * @param	string	message;	Message to log
	 * @param	string	priority;	debug|info|warn|error|log
	 * @return	Hype
	 */
	Hype.prototype.log = function(message, priority) {
		var date, timestamp;

		if (this.logEnabled) {
			if (priority === undefined) {
				priority = 'info';
			}

			// Add a timestamp
			date = new Date();
			timestamp = '[' +  date.toUTCString() + '] ';
			message = timestamp + message;

			console[priority](message);
		}
		return this;
	};

	/**
	 * More intrusive logging
	 *
	 * @param	string	message;	Message to log
	 * @param	string	priority;	debug|info|warn|error|log
	 * @return	Hype
	 */
	Hype.prototype.debug = function(message, priority) {
		var date, timestamp;

		if (this.debugEnabled) {
			if (priority === undefined) {
				priority = 'info';
			}

			// Add a timestamp
			date = new Date();
			timestamp = '[' +  date.toUTCString() + '] ';
			message = timestamp + message;

			console[priority](message);
		}
		return this;
	};

	return new Hype();
};
