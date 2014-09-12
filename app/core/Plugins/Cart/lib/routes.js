/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Cart
 * @version     0.0.1
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

var _ = require('underscore');

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
				if (req.session.id) {
					console.log('Session: ' + req.session.id);
				}
				Cart.getCart(req.session.id);
				
				res.send(200);
			},
			/**
			 * Add an item (by MongoDb _id) to the cart
			 *
			 *
			 */
			post: function(req, res) {
				var Cart = Hype.require('Cart');
				if (req.session.id) {
					console.log('Session: ' + req.session.id);
				}
				Cart.addItem('53ddb7103dc55d0000eb8e3f', req.session.id, { quantity: 1 });
				res.send(200);
			}
		}
	}
};