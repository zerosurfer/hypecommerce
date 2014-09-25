/**
 * Hype Commerce
 *
 * @package		Hype
 * @module		Checkout
 * @version		0.0.1
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

module.exports = function(Checkout, Hype, _) {

    var Cart = Hype.require('Cart');

    Checkout.setBillingAddress = function(billingObject) {
    },

    Checkout.setShippingAddress = function(shippingObject) {
    },

    Checkout.setPaymentMethod = function(paymentObject) {
    },

    Checkout.setShippingMethod = function(shippingObject) {
    },

    Checkout.place = function() {
        // Calculate the totals
        this.calculateTotals();

        // Charge the payment method

        // 
    },

    Checkout.calculateTotals = function() {
    	var Tax = Hype.require('Tax');

        // Calculate the taxes on each of the items in the cart
        var items = Cart.getItems();
    };


    return Checkout;
};