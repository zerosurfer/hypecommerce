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
 	Database = function() {}

 	Database.prototype.init = function(Config) {
		var adapter;

		Hype.log("Determining the database adapter");

		switch (Config.type) {
			case 'mongo':
			case 'mongodb':
				Hype.log("Loading adapter for MongoDb");
				adapter = require('./Database/Mongo')(Hype);
				break;
			case 'mariadb':
				// @todo? MariaDb
				break;
			case 'couchdb':
				// @todo? CouchDb
				break;

		}

		adapter.start(
			Config[Config.type].host + ':' + Config[Config.type].port,
			Config[Config.type].username,
			Config[Config.type].password,
			Config[Config.type].dbname
		);

		return this;
	}

 	return new Database();
 }