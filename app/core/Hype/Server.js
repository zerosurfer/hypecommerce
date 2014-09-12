/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		0.0.1
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

var Server,
	Auth = require('./Auth'),
	Admin = require('./Admin'),
	_ = require('underscore');

module.exports = function(Hype) {

	Server = function() {
		var self = this,
			server = undefined;

		this.init = function(Config, install) {
			if (!install) {
				Hype.listen('hype.db.complete', function() {
					self._init(Config);
				});
			} else {
				self._init(Config, install);
			}
		},

		this.addRoute = function(route, type, action) {
			if (self.server) {
				self.server.addRoute(route, type, action);
			}
		}

		this._init = function(Config, install) {
			Hype.debug('Determining server adapter');

			switch (Config.type) {
				case 'express':
					Hype.debug('Loading adapter for express.js');
					self.server = require('./Server/Express')(Hype);
					break;
				case 'sails':
					break;
			}

			Hype.listen('hype.start', function() {
				self.server.connect(Config);
			});
			
			self.server.init(Config, Auth(Hype), Admin(Hype), install);
		}
	}

	return new Server();
}