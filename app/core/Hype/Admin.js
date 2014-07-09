/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		0.0.1.0
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

var HypeAdmin,
	path = require('path');

 module.exports = function(Hype) {
 	HypeAdmin = function() {

 		/**
 		 * Check if we're logged in
 		 *
 		 * @return boolean
 		 */
 		this.requiredAuth = function() {
 			return true;
 		},

 		this.index = function(req, res) {
 			res.render(path.resolve('app/core/admin/dashboard.html'));
 		},

 		this.login = function(req, res) {

 		},

 		this.loginPost = function(req, res) {

 		}


 	}

 	return new HypeAdmin();
 }