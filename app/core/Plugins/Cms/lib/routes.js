/**
 * Hype Commerce
 *
 * @package		Hype
 * @module		Cms
 * @version		0.0.1
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

module.exports = function(Hype) {
	return {

		'/test': {

			/**
			 * Test route
			 *
			 * @route /test
			 * @method GET
			 * @param {Object} req
			 * @param {Object} res
			 */
			get: function (req, res) {
				var CmsBlock = Hype.Db.getModel('CmsBlock'),
					block = new CmsBlock();
				
				res.send(200);
			}
		}
	}
}