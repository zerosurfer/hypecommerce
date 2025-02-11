/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		0.0.1
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

module.exports = function(Hype) {
	var Setup;

	/**
     * Core Setup class
     *
     * @constructor
     * @return {Setup}
     */
	Setup = function() {
		this.init = function(Server) {
			Hype.notify('hype.start');
		};

		return this;
	}

	return new Setup();
}