/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		0.0.1.0
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

var	mongoose = require('mongoose'),
	inst = false,
	ModelCollection = {},
	SchemaCollection = {},
	MongoDba;

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
	}
	return inst;
}

MongoDba.prototype.connect = function(host, username, password, dbname) {
	var self = this;

	//Log.log("Connecting to MongoDB on " + host + "/" + dbname);
	this.connection = mongoose.connect('mongodb://' + host + '/' + dbname, function(error) {
		self.db = mongoose.connection.db;
	});

};

MongoDba.prototype.addModel = function (model, schema) {
	//Log.log("Adding " + model + " to Mongo");

	var mSchema = new mongoose.Schema(schema);
	var mModel = mongoose.model(model, mSchema);
	SchemaCollection[model] = mSchema;
	ModelCollection[model] = mModel;

	return mModel;
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

module.exports = new MongoDba();

