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

module.exports = function(Cart, Hype, _) {
	"use strict"

	var self = this;

	/**
	 * Creates a cart based on the session id
	 *
	 * @var {String} sessionId
	 * @return Cart;
	 * @private
	 */
    var _createCart = function(sessionId) {
    	var CartModel = Hype.Db.getModel('Cart'),
    		cart = new CartModel({ session: sessionId });

    	cart.save(function(err, cart) {
			Hype.notify('hype.cart.get', cart);
    	});

    	return this;
    };

    /**
	 * Finds or creates a new cart for the session id
	 *
	 * @var {String} sessionId
	 * @return Cart;
	 * @private
	 */
    var _getCart = function(sessionId) {
    	var CartModel = Hype.Db.getModel('Cart'),
    		ItemModel = Hype.Db.getModel('Item');
    	// Find the cart
    	// We need a way to get deep copies 
    	CartModel.findOne({ session: sessionId })
    		.populate('items')
    		.exec(function(err, cart) {

    		// Create a cart if we don't have one
    		if (cart === null) {
    			_createCart(sessionId);
    		} else {
    			ItemModel.find()
    				.populate('parent')
    				.exec(function(err, items) {
    					console.log(items);
    				});

    			Hype.notify('hype.cart.get', cart);
    		}
    	});

    	return Cart;
    }

    /**
     * Adds an item to the cart based on the session id
     *
     * @var {String} sessionId
     * @var {String} productId
     * @return Cart
     */
    var _addItem = function(productId, sessionId, options) {
    	var ItemModel = Hype.Db.getModel('Item'),
    		ProductModel = Hype.Db.getModel('Product'),
    		Cart = _getCart(sessionId),
    		item;

    	// Find the product
    	Hype.listen('hype.cart.get', function(cart) {
	    	ProductModel.findById(productId, function(err, product) {
	    		var itemOptions = {
	    			name: product.name,
	    			parent: product,
	    			quantity: (options.quantity) ? options.quantity : 1
	    		};
	    		// Add an item
	    		item = new ItemModel(itemOptions);
	    		item.save(function(err, item) {
	    			var cartItems = cart.items;
	    			cartItems.push(item);
	    			// Add it to the cart
	    			cart.update({ items: cartItems }, function(err, numAffected, raw) {
						if (err) console.log(err);
						console.log('The number of updated documents was %d', numAffected);
						console.log('The raw response from Mongo was ', raw);
	    			});
	    		});
	    	});
	    });

    	return this;
    };

    /** 
     * Get a session cart
     *
     * @var {String} sessionId
     * @return Cart
     */
    Cart.getCart = function(sessionId) {
    	return _getCart(sessionId);
    };

    /**
     * Add an item to the cart
     *
     * @var {String} sessionId
     * @var {String} productId
     * @return Cart
     */
    Cart.addItem = function(productId, sessionId, options) {
    	return _addItem(productId, sessionId, options);
    };

    return Cart;
};