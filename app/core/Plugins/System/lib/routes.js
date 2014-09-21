/**
 * Hype Commerce
 *
 * @package		Hype
 * @module		System
 * @version		0.0.1
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

module.exports = function(Hype) {
	return {
		'': {

			/**
			 * Ensure a blank call to /api does nothing
			 *
			 * @route /system
			 * @method GET
			 * @param {Object} req
			 * @param {Object} res
			 */
			get: function (req, res) {
				// @todo remove the version, this is just to prove a point
				res.send("Hype Commerce " + Hype.version + " is running!")
			}
		}
	}
}