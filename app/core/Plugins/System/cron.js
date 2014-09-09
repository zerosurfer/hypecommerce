/**
 * Hype Commerce
 *
 * @package		Hype
 * @module		System
 * @version		1.0.0
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

module.exports = function(Hype) {
	return {
		'testCron' : {
			expression: '* * * * *',
			action: function() {
				Hype.log("Hype is (still) running");
			}
		}
	}
}