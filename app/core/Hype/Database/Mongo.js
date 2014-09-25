
/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		0.0.1
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

var	mongoose = require('mongoose'),
	inst = false,
	ModelCollection = {},
	SchemaCollection = {},
	MongoDba,
	Schema = mongoose.Schema;
	_ = require('underscore');

module.exports = function(Hype) {
	MongoDba = function() {
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

	MongoDba.prototype.getConnectionDb = function() {
		return this.connection.connection.db;
	}

	MongoDba.prototype.start = function(host, username, password, dbname, port) {
		var self = this;

		Hype.debug("Connecting to the database on " + host + ":" + port + "/" + dbname);

		this.connection = mongoose.connect('mongodb://' + host + ':' + port + '/' + dbname, function(error) {
			if (error) throw error;
			Hype.log("Successfully connected to the database", 'success');
			Hype.notify('hype.db.complete');
			self.db = mongoose.connection.db;
		});

	};

	// Recursively load the models into mongoose
	MongoDba.prototype.loadModel = function(name, model) {
		var self = this;
	    if (!this.hasModel(name)) {
	        Hype.debug("Adding model " + name);
	        // Set that we're processing the model
	        self.startProcessing(name);
	        // if model has dependencies
	        if (model.deps) {
	            // for each dep
	            // - check to see if it is instantiated
	            // - if not instantiate it
	            // - get the model
	            // - update the current schema
	            // - add model to db

	            if (model.deps.hasOne) {
	                _(model.deps.hasOne).each(function(dep, localName) {
	                    if (!self.hasModel(dep) && !self.isProcessing(dep)) {
	                        self.loadModel(dep, self.getRawModel(dep));
	                    }
	                    model.schema[localName] = { type : Schema.Types.ObjectId, ref : dep };
	                    // model.schema[localName] = [self.getModel(dep)];
	                });
	            }

	            if (model.deps.hasMany) {
	                _(model.deps.hasMany).each(function(dep, localName) {
	                    if (!self.hasModel(dep) && !self.isProcessing(dep)) {
	                        self.loadModel(dep, self.getRawModel(dep));
	                    }
	                    model.schema[localName] = [{ type : Schema.Types.ObjectId, ref : dep }];
	                    // model.schema[localName] = self.getModel(dep)];
	                });
	            }
	        }

	        self.addModel(name, model);

	        self.stopProcessing(name);
	    }
	};

	MongoDba.prototype.addModel = function (modelName, model) {

		var mSchema = new Schema(model.schema);

		// add extra methods
		if (model.methods) {
			mSchema.methods = model.methods;
		}

		// add virtual properties
		if (model.virtuals) {
			_(model.virtuals).each(function(virtual, key) {
				if (virtual.get) {
					mSchema.virtual(key).get(virtual.get);
				}

				if (virtual.set) {
					mSchema.virtual(key).set(virtual.set);
				}
			});
		}

		var mModel = mongoose.model(modelName, mSchema);
		SchemaCollection[modelName] = mSchema;
		ModelCollection[modelName] = mModel;

		return mModel;
	}

	MongoDba.prototype.addRawModel = function(modelName, model) {
		this._rawModels[modelName] = model;
	}

	MongoDba.prototype.getRawModel = function(modelName) {
		return this._rawModels[modelName];
	}

	MongoDba.prototype.hasModel = function(model) {
		return (ModelCollection[model] !== undefined) ? true : false;
	}

	MongoDba.prototype.getModel = function(model) {
		return ModelCollection[model];
	};

	MongoDba.prototype.getSchema = function(model) {
		return SchemaCollection[model];
	};

	MongoDba.prototype.startProcessing = function(model) {
		this._processing[model] = true;
		return this;
	}

	MongoDba.prototype.stopProcessing = function(model) {
		this._processing[model] = undefined;
		return this;
	}

	MongoDba.prototype.isProcessing = function(model) {
		return (this._processing[model] === undefined) ? false : true;
	}

	return new MongoDba();
}

