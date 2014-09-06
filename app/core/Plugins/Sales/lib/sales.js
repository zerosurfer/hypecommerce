module.exports = function(Sales, Hype, _) {
    var privateFunc = function() {
        return 'is real';
    };

    Sales.publicFunc = function() {
        return 'The Hype ' + privateFunc();
    };
    

    return Sales;
};