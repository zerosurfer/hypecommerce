/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Cart
 * @version     1.0.0
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

var Install;

module.exports = function(Hype) {

	Install = function() {

		this.up = function() {
			Hype.log("Installing cart");
		},

		this.down = function() {
			Hype.log("Uninstalling cart");
		}
	}
	
	return new Install();
}