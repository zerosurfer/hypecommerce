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
	"use strict"

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
	// Recursively load the models into mongoose
	MysqlDba.prototype.loadModel = function(name, model) {
		var self = this;
		// Check to make sure we haven't built this model yet
	    if (!this.hasModel(name)) {
	        Hype.debug("Adding model " + name);
	        // Set that we're processing the model
	        self.startProcessing(name);
	        // if model has dependencies
	        // we're going to need to build the structure of the model here
	        if (model.deps) {

	        	/**
	        	 * A hasOne relationship will generate a column for the same module such as
	        	 *
	        	 * {model}_id INT(11) NULL DEFAULT NULL
	        	 *
	        	 * 
	        	 */
	            if (model.deps.hasOne) {
	                _(model.deps.hasOne).each(function(dep, localName) {
	                    if (!self.hasModel(dep) && !self.isProcessing(dep)) {
	                        self.loadModel(dep, self.getRawModel(dep));
	                    }
	                    // Just for now assign it the dep
	                    model.schema[localName] = dep;
	                });
	            }

	            /**
	        	 * A hasMany relationship will result in other models being generated a column for this model
	        	 * such as
	        	 *
	        	 * {model}_id INT(11) NULL DEFAULT NULL
	        	 *
	        	 * 
	        	 */
	            if (model.deps.hasMany) {
	                _(model.deps.hasMany).each(function(dep, localName) {
	                    if (!self.hasModel(dep) && !self.isProcessing(dep)) {
	                        self.loadModel(dep, self.getRawModel(dep));
	                    }
	                    model.schema[localName] = [dep];
	                });
	            }
	        }

	        self.addModel(name, model);

	        self.stopProcessing(name);
	    }
	};

	/**
	 * Given a model it should generate a table of appropriate columns
	 *
	 *
	 */
	MysqlDba.prototype.createTable = function(model) {

	},

	/**
	 * Given a model it should alter an existing table, whether adding/change/removing columns
	 * for the given and any related models
	 *
	 */
	MysqlDba.prototype.modifyTable = function(model) {

	},

	/**
	 * Remove a model's table with an option to remove from all related models' tables
	 *
	 * @param {Object} model
	 * @param {Boolean} hardRemove
	 */
	MysqlDba.prototype.removeTable = function(model, hardRemove) {

	},

	MysqlDba.prototype.addModel = function (modelName, model) {

		var mSchema = model.schema,
			mModel = {
				methods: {},
				get: {},
				set: {}
			};

		// add extra methods
		if (model.methods) {
			mModel.methods = model.methods;
		}

		// add virtual properties
		// we'll need to create models from these properties

		if (model.virtuals) {
			_(model.virtuals).each(function(virtual, key) {
				if (virtual.get) {
					mModel.get[key] = virtual.get;
				}

				if (virtual.set) {
					mModel.get[key] = virtual.set;
				}
			});
		}

		SchemaCollection[modelName] = mSchema;
		ModelCollection[modelName] = mModel;

		return mSchema;
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