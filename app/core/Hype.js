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
     */
    Hype.prototype.init = function(Initializer) {
    	var self = this;
    	this.listen('hype:initializer:complete', function() {
    		self.log("Initializing Hype Commerce v" + Config.version);

    		// Bootstrap all the modules with the Hype object
    		self.initializer = Initializer;
    		self.Db = Initializer.Db;
    		self.Server = Initializer.Server;

    		self.notify('hype.init.complete');
    	});
    };

    /**
     * Feed all the modules the new hype object
     *
     */
    Hype.prototype.start = function() {
    	var self = this;
    	this.listen('hype.initializer.install.complete', function() {
    		self.notify('hype:start');
    	});
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

		if (Config.log) {
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

		if (Config.debug) {
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
