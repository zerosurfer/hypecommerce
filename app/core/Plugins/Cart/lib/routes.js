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

module.exports = function(Hype) {
	return {
		'/cart/*' : {

			get: function(req, res) {
				if (req.session.id) {
					console.log('Session: ' + req.session.id);
				}
				res.send(200);
			}
		},
		'/cart' : {
			get: function(req, res) {
				// return the items
				var Cart = Hype.require('Cart');
				console.log(Cart.getItems());
				if (req.session.id) {
					console.log('Session: ' + req.session.id);
				}
				res.send(200);
			},
			post: function(req, res) {
				var Cart = Hype.require('Cart');
				if (req.session.id) {
					console.log('Session: ' + req.session.id);
				}
				Cart.addItem(1);
			}
		}
	}
};