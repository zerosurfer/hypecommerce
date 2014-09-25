/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		0.0.1
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

var _ = require('underscore'),
	Database;

module.exports = function(Hype) {
	"use strict"

 	Database = function() {
 		this.adapter;
 	};

 	/**
	 * Select a database adapter and secure a connection to the database
	 *
	 * @param {Object} config
	 * @return {Database}
	 */
 	Database.prototype.init = function(Config) {
		Hype.debug("Determining the database adapter");
		switch (Config.type) {
			/**
			 * Experimental databases
			 * While they work, they may not be unsuitable for major ecommerce businesses
			 *
			 * Recommended: MongoDb
			 */
			case 'mongo':
			case 'mongodb':
				Hype.debug("Loading adapter for MongoDb");
				this.adapter = require('./Database/Mongo')(Hype);
				break;
			case 'mariadb':
				// @todo? MariaDb
				break;
			case 'couchdb':
				// @todo? CouchDb
				break;
			/**
			 * ACID-compliant databases, suitable for major ecommerce transactions
			 * and business logic that cannot afford to be mis-managed
			 * 
			 * Recommended: Postgres
			 */
			case 'postgres':
			case 'postgresql':
				Hype.debug("Loading adapter for PostgreSQL");
				this.adapter = require('./Database/Postgres')(Hype);
				break;
			case 'mysql':
				Hype.debug("Loading adapter for MySQL");
				this.adapter = require('./Database/Mysql')(Hype);
				break;
		}

		this.adapter.start(
			Config[Config.type].host,
			Config[Config.type].username,
			Config[Config.type].password,
			Config[Config.type].dbname,
			Config[Config.type].port
		);

		return this;
	}

	/**
	 * Adds the raw context definition from the models file
	 *
	 * @param {String} name
	 * @param {Object} model
	 * @return {Object}
	 */
	Database.prototype.addRawModel = function(name, model) {
		if (!this.adapter) {
			throw "Database adapter not properly instanstiated";
		}
		return this.adapter.addRawModel(name, model);
	}

	/**
	 * Define and setup the model in the database for use in the system
	 *
	 * @param {String} name
	 * @param {Object} model
	 * @return {Object}
	 */
	Database.prototype.loadModel = function(name, model) {
		if (!this.adapter) {
			throw "Database adapter not properly instanstiated";
		}
		return this.adapter.loadModel(name, model)
	}

	/**
	 * Get the loaded version of a model
	 *
	 * @param {String} model
	 * @return {Object}
	 */
	Database.prototype.getModel = function(model) {
		if (!this.adapter) {
			throw "Database adapter not properly instanstiated";
		}
		return this.adapter.getModel(model);
	};

 	return new Database();
 }