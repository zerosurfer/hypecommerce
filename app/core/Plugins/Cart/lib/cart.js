module.exports = function(Cart, Hype, _) {
    var privateFunc = function() {
        return 'is real';
    };

    Cart.getItems = function() {
        return 'Getting cart items';
    };

    return Cart;
};