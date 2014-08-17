/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		1.0.0
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
		var self = this;

		this.init = function(Config, install) {
			if (!install) {
				Hype.listen('hype:db:complete', function() {
					self._init(Config);
				});
			} else {
				self._init(Config, install);
			}
		},

		this._init = function(Config, install) {
			var server;

			Hype.debug('Determining server adapter');

			switch (Config.type) {
				case 'express':
					Hype.debug('Loading adapter for express.js');
					server = require('./Server/Express')(Hype);
					break;
				case 'sails':
					break;
			}

			Hype.listen('hype:start', function() {
				server.connect(Config);
			});
			
			server.init(Config, Auth(Hype), Admin(Hype), install);
		}
	}

	return new Server();
}