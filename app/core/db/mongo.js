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

// Load necessary modules/files
var	mongoose = require('mongoose'),
	Log = require('./../log'),
	when = require('when'),
	inst = false,
	MongoDba;

MongoDba = function() {
	if (!inst) {
		// Start the instance
		inst = this;

		// Holds the connection
		inst.connector = null;

		// Holds models
		inst.modelCollection = [];

		// Holds singletons
		inst.singletonCollection = [];

		// Holds Schemas
		inst.schemaCollection = [];
	}
	return inst;
}

MongoDba.prototype.connect = function(host, username, password, dbname) {
	Log.log("Connecting to MongoDB on " + host + "/" + dbname);
	this.connector = mongoose.connect('mongodb://' + host + '/' + dbname);
};

MongoDba.prototype.addModel = function (model, schema) {
	Log.log("Adding " + model + " to Mongo");

	var mSchema = new mongoose.Schema(schema);
	var mModel = mongoose.model(model, mSchema);
	this.schemaCollection[model] = mSchema;
	this.modelCollection[model] = mModel;

	return mModel;
}

MongoDba.prototype.hasModel = function(model) {
	return (this.modelCollection[model] !== undefined) ? true : false;
}

MongoDba.prototype.getModel = function(model) {
	return this.modelCollection[model];
};

MongoDba.prototype.getRawModel = function(model) {
	return this.schemaCollection[model];
	//return this.models[model];
};

MongoDba.prototype.getSchema = function(model) {
	return this.schemaCollection[model];
};

module.exports = new MongoDba();

