/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Checkout
 * @version     0.0.1
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

module.exports = function(Hype) {
	return {
		'/checkout': {
			get: function (req, res) {
				if (req.session.id) {
					Hype.debug('Serving session ' + req.session.id);
				}
				res.send(200);
			},
			
			/**
			 * Accepts a complete order document object and places the order
			 *
			 * @param {Object} req
			 * @param {Object} res
			 */
			post: function (req, res) {

			}
		},

		'/checkout/setBilling': {
			post: function(req, res) {
				if (req.session.id) {
					Hype.debug('Serving session ' + req.session.id);
				}
				res.send(200);
			}
		},

		'/checkout/setShipping': {
			post: function(req, res) {
				if (req.session.id) {
					Hype.debug('Serving session ' + req.session.id);
				}
				res.send(200);
			}
		},

		'/checkout/setShippingMethod': {
			post: function(req, res) {
				if (req.session.id) {
					Hype.debug('Serving session ' + req.session.id);
				}
				res.send(200);
			}
		},

		'/checkout/setPaymentMethod': {
			post: function(req, res) {
				if (req.session.id) {
					Hype.debug('Serving session ' + req.session.id);
				}
				res.send(200);
			}
		},

		'/checkout/review': {
			get: function(req, res) {
				if (req.session.id) {
					Hype.debug('Serving session ' + req.session.id);
				}
				res.send(200);
			}
		},

		'/checkout/place': {
			post: function(req, res) {
				if (req.session.id) {
					Hype.debug('Serving session ' + req.session.id);
				}
				res.send(200);
			}
		}
	}
};