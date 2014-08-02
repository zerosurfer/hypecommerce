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
	_ = require('underscore');

module.exports = function(Hype) {

	Server = function() {
		var self = this;

		this.init = function(Config) {
			Hype.listen('hype:db:complete', function() {
				self._init(Config);
			})
		},

		this._init = function(Config) {
			var server;

			Hype.log('Determining server adapter');

			switch (Config.type) {
				case 'express':
					Hype.log('Loading adapter for express.js');
					server = require('./Server/Express')(Hype);
					break;
				case 'sails':
					break;
			}

			Hype.listen('hype:start', function() {
				server.connect(Config);
			});
			
			server.init(Config, Auth);
		}
	}

	return new Server();
}