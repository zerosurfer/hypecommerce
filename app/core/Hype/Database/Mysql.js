/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		0.0.1
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

var MysqlDba,
	mysql = require('mysql'),
	inst = false,
	ModelCollection = {},
	SchemaCollection = {},
	_ = require('underscore');

module.exports = function(Hype) {
	MysqlDba = function() {
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

	MysqlDba.prototype.start = function(host, username, password, dbname, port) {
		var self = this;

		Hype.debug("Connecting to the database on " + host + ":" + dbname);

		this.connection = mysql.createConnection({
			host: host,
			port: port,
			user: username,
			password: password
		});

		this.connection.connect(function(err) {
			if (err) {
				console.error('Error connecting: ' + err.stack);
				return;
			}

			Hype.log("Successfully connected to the database", 'success');
			Hype.notify('hype.db.complete');
		});

	};

	// Recursively load the models into MySQL
	// Because we're dealing with a "NoSQL" schema, we're going to need to need to "build"
	// the mysql schemas (this includes creating model_id references where necessary)
	// After the schemas are built, we're going to need to create the tables
	// This is an extra step to comply with businesses that need ACID databases
	// and cannot risk using something like MongoDB or other NoSQL databases
	MysqlDba.prototype.loadModel = function(name, model) {
	}

	MysqlDba.prototype.addRawModel = function(modelName, model) {
		this._rawModels[modelName] = model;
	}

	MysqlDba.prototype.getRawModel = function(modelName) {
		return this._rawModels[modelName];
	}

	MysqlDba.prototype.hasModel = function(model) {
		return (ModelCollection[model] !== undefined) ? true : false;
	}

	MysqlDba.prototype.getModel = function(model) {
		return ModelCollection[model];
	};

	MysqlDba.prototype.getSchema = function(model) {
		return SchemaCollection[model];
	};

	MysqlDba.prototype.startProcessing = function(model) {
		this._processing[model] = true;
		return this;
	}

	MysqlDba.prototype.stopProcessing = function(model) {
		this._processing[model] = undefined;
		return this;
	}

	MysqlDba.prototype.isProcessing = function(model) {
		return (this._processing[model] === undefined) ? false : true;
	}

	MysqlDba.prototype.addRawModel = function(modelName, model) {
		this._rawModels[modelName] = model;
	}

	return new MysqlDba();
}