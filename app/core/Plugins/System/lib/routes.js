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

module.exports = function() {
	return {
		'': {
			/**
			 * Redirect a direct call to /api to the homepage
			 *
			 * @route /system
			 * @method GET
			 * @param {Object} req
			 * @param {Object} res
			 */
			get: function (req, res) {
				res.redirect('/');
			}
		},
		
		'/': {

			/**
			 * Redirect a direct call to /api to the homepage
			 *
			 * @route /system
			 * @method GET
			 * @param {Object} req
			 * @param {Object} res
			 */
			get: function (req, res) {
				res.redirect('/');
			}
		}
	}
}