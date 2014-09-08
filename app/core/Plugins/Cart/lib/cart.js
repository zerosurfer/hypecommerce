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
    var privateFunc = function() {
        return 'is real';
    };

    Cart.getItems = function() {
    	
        return 'Getting cart items';
    };

    Cart.addItem = function(id) {
    	
    	var CartModel = Hype.Db.getModel('Item');
    }

    return Cart;
};