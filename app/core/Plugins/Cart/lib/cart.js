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

module.exports = function(Cart, Hype, _) {
	var self = this;

    var privateFunc = function() {
        return 'is real';
    };

    var _createCart = function(sessionId) {
    	var Cart = Hype.Db.getModel('Cart'),
    		cart = new Cart({ session: sessionId });

    	cart.save(function(err) {
    		console.log('Cart created');
    	})

    }

    Cart.getItems = function() {
    	
        return 'Getting cart items';
    };

    Cart.addItem = function(id) {
    	
    	var CartModel = Hype.Db.getModel('Item');
    }

    Cart.getCart = function(sessionId) {
    	var Cart = Hype.Db.getModel('Cart');

    	Cart.find({ session: sessionId }, function(err, docs) {
    		// Create a cart if we don't have one
    		if (docs.length === 0) {
    			_createCart(sessionId);
    		} else {

    		}
    	});
    }

    return Cart;
};