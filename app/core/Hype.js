/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		0.0.1
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license 
 */
var events = require('events'),
    emitter = new events.EventEmitter(),
    chalk = require('chalk'),
    Hype;

module.exports = function(Config) {

	/**
	 * The primary Hype object. Contains essential global references to our database, server,
	 * crons, version, and initialized modules
	 *
	 * @constructor
	 * @return {Hype}
	 */
	Hype = function() {
		this.Initializer = null;
		this.Db = null;
		this.Server = null;
		this.Cron = null;
		this.version = null;
		return this;
	};

	/**
	 * Returns a fully-initialized module
	 *
	 * @param {string} name - Name of the module
	 * @return {object|undefined}
	 */
	Hype.prototype.require = function(name) {
		return (this.Initializer.getModule(name)) ? this.Initializer.requireModule(name, this) : undefined;
	};

	/**
	 * Event emit
	 *
	 * @param {string} event - Name of the event
	 * @param {function} callback - Function to run when event is called
	 * @return {Hype}
	 */
	Hype.prototype.listen = function(event, callback) {
        emitter.on(event, callback);
        return this;
    };

    /**
	 * Notified of an emit
	 *
	 * @param {string} event - Name of the event to notify
	 * @param {mixed} arg - (optional) Pass the observing listeners a callback object, function, or value
	 * @return {Hype}
	 */
    Hype.prototype.notify = function(event, arg) {
    	//this.debug('Event ' + event + ' sent');
        emitter.emit(event, arg);
        return this;
    };

    /**
     * Bootstrap the system before initializing
     *
     * @param {Initializer} Initializer
     * @return {Hype}
     */
    Hype.prototype.init = function(Initializer) {
    	var self = this;
    	this.listen('hype.initializer.complete', function() {
    		self.log("Initializing Hype Commerce v" + Config.version, 'success');

    		// Bootstrap all the modules with the Hype object
    		self.version = Config.version;
    		self.Initializer = Initializer;
    		self.Db = Initializer.Db;
    		self.Server = Initializer.Server;
    		self.Cron = Initializer.Cron;

    		self.notify('hype.init.complete');
    	});
    	return this;
    };

    /**
     * Start the cront and give all the modules our new Hype object
     *
     * @return {Hype}
     */
    Hype.prototype.start = function() {
    	var self = this;
    	this.listen('hype.initializer.install.complete', function() {
    		// Begin the cronjobs 
    		self.Cron.start();

    		self.notify('hype.start');
    	});
    	return this;
    }

	/**
	 * Log
	 *
	 * @param {string} message - Message to log
	 * @param {string} priority - debug|info|warn|error|log
	 * @return {Hype}
	 */
	Hype.prototype.log = function(message, priority) {
		var date, timestamp;

		if (Config.log) {
			if (priority === undefined) {
				priority = 'log';
			}

			// Add a timestamp
			date = new Date();
			timestamp = '[' +  date.toUTCString() + '] ';
			
			switch (priority) {
				case 'log' :
					message = chalk.white(message);
					break;
				case 'debug' :
					message = chalk.dim(message);
					break;
				case 'warn' :
					message = chalk.yellow(message);
					break;
				case 'info' :
					message = chalk.magenta(message);
					break;
				case 'error' :
					message = chalk.red(message);
					break;
				case 'success' :
					message = chalk.green(message);
					break;
			}

			message = timestamp + message;
			console.log(message);
		}
		return this;
	};

	/**
	 * More intrusive logging
	 *
	 * @param {string} message - Message to debug log
	 * @return {Hype}
	 */
	Hype.prototype.debug = function(message) {
		var date, timestamp;

		if (Config.debug) {
			this.log(message, 'debug');
		}
		return this;
	};
	
	return new Hype();
};
