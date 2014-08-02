/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		0.0.1.0
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license 
 */
var events = require('events'),
    emitter = new events.EventEmitter();

module.exports = function(Config) {
	var Hype;

	/**
	 * The one, this is Hype. Set a few necessary (mostly) environment variables
	 * and get ready to rock
	 *
	 * @return
	 */
	Hype = function() {
		this.initializer;
	};

	/**
	 * Require a module
	 *
	 * @param	String	name
	 * @return	Boolean|undefined
	 */
	Hype.prototype.require = function(name) {
		return (this.initializer.getModule(name)) ? this.initializer.requireModule(name, this) : undefined;
	};

	/**
	 * Event emit
	 *
	 * @param String event
	 * @param function callback
	 */
	Hype.prototype.listen = function(event, callback) {
        emitter.on(event, callback);
    };

    /**
	 * Notified of an emit
	 *
	 * @param String event
	 * @param mixed arg
	 */
    Hype.prototype.notify = function(event, arg) {
        emitter.emit(event, arg);
    };

    /**
     * Bootstrap the system before initializing
     *
     *
     */
    Hype.prototype.init = function(Initializer) {
    	var self = this;
    	this.listen('hype:initializer:complete', function() {
    		self.log("Initializing Hype Commerce v" + Config.version);

    		// Bootstrap all the modules with the Hype object
    		self.initializer = Initializer;
    		self.Db = Initializer.Db;
    		self.Server = Initializer.Server;

    		self.start();
    	});
    };

    /**
     * Feed all the modules the new hype object
     *
     */
    Hype.prototype.start = function() {
    	this.notify('hype:start');
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

		if (Config.environment == 'development' || Config.environment == 'staging') {
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

	// /**
	//  * Load all plugins in a directory based on plugin.js and wrap it in a module
	//  *
	//  * @param	String	filepath
	//  * @return	Hype
	//  */
	// Hype.prototype.loadPlugins = function(filepath) {

	// 	var HypePlugin = require('./Hype/Plugin')(this),
	// 		HypeModule = require('./Hype/Module')(this),
	// 		self = this;

	// 	this.log('Loading plugins from ' + filepath);

	// 	// Read the directory
	// 	fs.readdirSync(filepath).forEach(function(file) {
	// 		// Skip hidden folders and files
	// 		if (file.indexOf('.') !== 0) {

	// 			var pluginPath = filepath + '/' + file,
	// 				config,
	// 				name;

	// 			// Configure the plugin
	// 			if(fs.existsSync(pluginPath + '/plugin.js')) {
	// 				var config = require(pluginPath + '/plugin.js'),
	// 					name = config.name,
	// 					hypePlugin,
	// 					admin,
	// 					adminName;

	// 				if (typeof config === 'function') {
	// 					config = config(self);
	// 				}

	// 				// Configure the admin
	// 				if(fs.existsSync(pluginPath + '/admin.js')) {
	// 					admin = require(pluginPath + '/admin.js'),
	// 					adminName = admin.name;

	// 					if (typeof admin === 'function') {
	// 						admin = admin(self);
	// 					}

	// 					// Add the admin to config
	// 					config.admin = admin;
	// 				}

	// 				self.log("Adding plugin: " + name);
	// 				// Instantiate the plugin
	// 				hypePlugin = new HypePlugin();
	// 				// Add the plugin to a protected module
	// 				Modules[name] = new HypeModule(name, hypePlugin, config, filepath + '/' + file);
	// 			} else {
	// 				self.log("Skipping plugin: " + name + " (plugin.js not found)");
	// 			}
	// 		}
	// 	});

	// 	return this;
	// };

	// /**
	//  * Run the initializer and start each module
	//  *
	//  * @return	Hype
	//  */
	// Hype.prototype.start = function() {
	// 	var initializer = require('./Hype/Initializer');

	// 	_(Modules).each(function(module, moduleName) {

	// 		if (module.is('enabled')) {
	// 			module.start();
	// 		}
	// 	});

	// 	initializer.init(Modules, this, app);

	// 	return this;
	// };

	// /**
	//  * Connect to the MongoDB server
	//  *
	//  * @todo	Use an abstraction layer to connect to any desired db
	//  * @return	Hype
	//  */
	// Hype.prototype.connect = function() {
	// 	// @todo, abstract into Hype/Database class that picks appropriate DatabaseAdapter
	// 	this.log("Establishing database connection with MongoDB");
	// 	this.Db.connect(
	// 		this.configuration.db['mongo'].host + ':' + this.configuration.db['mongo'].port,
	// 		this.configuration.db['mongo'].username,
	// 		this.configuration.db['mongo'].password,
	// 		this.configuration.db['mongo'].dbname
	// 	);
	// }
	return new Hype();
};
