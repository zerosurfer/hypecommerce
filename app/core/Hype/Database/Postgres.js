/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		0.0.1
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

var	pg = require('pg'),
	inst = false,
	ModelCollection = {},
	SchemaCollection = {},
	PostgresDba,
	_ = require('underscore');

module.exports = function(Hype) {
	PostgresDba = function() {
		if (!inst) {
			// Start the instance
			inst = this;

			// Holds the connection
			inst.connection = null;

			// Holds the db connection
			inst.db = null;

			// Holds singletons
			inst.singletonCollection = [];

			// Holds Schemas
			inst.schemaCollection = [];

			// Holds models being processed
			inst._processing = [];

			// Holds raw models from the config
			inst._rawModels = {};
		}
		return inst;
	}

	PostgresDba.prototype.getConnectionDb = function() {
		return this.connection.connection.db;
	}

	PostgresDba.prototype.start = function(host, username, password, dbname, port) {
		var self = this,
			connectStr = 'postgres://';

		if (username) {
			connectStr += username;
			if (password) {
				connectStr += ':' + password;
			}
			connectStr += "@";
		}
		connectStr += host;
		if (port) {
			connectStr += ':' + port;
		}
		connectStr += '/' + dbname;

		Hype.debug("Connecting to the database on " + connectStr);

		this.connection = pg.connect(connectStr, function(error,  client, done) {
			if (error) return error;
			Hype.log("Successfully connected to the database", 'success');
			Hype.notify('hype.db.complete');
			self.db = client;
		});
		
	};

	// Recursively load the models into mongoose
	PostgresDba.prototype.loadModel = function(name, model) {
		Hype.debug('Loading model ' + name);
	};

	PostgresDba.prototype.addModel = function (modelName, model) {
	}

	PostgresDba.prototype.addRawModel = function(modelName, model) {
		Hype.debug('Adding raw model ' + modelName);
		return this._rawModels[modelName] = model;
	}

	PostgresDba.prototype.getRawModel = function(modelName) {
	}

	PostgresDba.prototype.hasModel = function(model) {
	}

	PostgresDba.prototype.getModel = function(model) {
	};

	PostgresDba.prototype.getSchema = function(model) {
	};

	PostgresDba.prototype.startProcessing = function(model) {
		this._processing[model] = true;
		return this;
	}

	PostgresDba.prototype.stopProcessing = function(model) {
		this._processing[model] = undefined;
		return this;
	}

	PostgresDba.prototype.isProcessing = function(model) {
		return (this._processing[model] === undefined) ? false : true;
	}

	return new PostgresDba();
}

