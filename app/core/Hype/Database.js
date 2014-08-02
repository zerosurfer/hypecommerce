/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		1.0.0
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

var Database;

module.exports = function(Hype) {
 	Database = function() {
 		this.adapter;
 	}
 	Database.prototype.init = function(Config) {
		Hype.log("Determining the database adapter");
		switch (Config.type) {
			case 'mongo':
			case 'mongodb':
				Hype.log("Loading adapter for MongoDb");
				this.adapter = require('./Database/Mongo')(Hype);
				break;
			case 'mariadb':
				// @todo? MariaDb
				break;
			case 'couchdb':
				// @todo? CouchDb
				break;

		}

		this.adapter.start(
			Config[Config.type].host + ':' + Config[Config.type].port,
			Config[Config.type].username,
			Config[Config.type].password,
			Config[Config.type].dbname
		);

		return this;
	}

	Database.prototype.addRawModel = function(name, model) {
		if (!this.adapter) {
			throw "Database adapter not properly instanstiated";
		}
		return this.adapter.addRawModel(name, model)
	}

	Database.prototype.getModel = function(model) {
		if (!this.adapter) {
			throw "Database adapter not properly instanstiated";
		}
		return this.adapter.getModel(model);
	}

	Database.prototype.loadModel = function(name, model) {
		if (!this.adapter) {
			throw "Database adapter not properly instanstiated";
		}
		return this.adapter.loadModel(name, model)
	}

 	return new Database();
 }