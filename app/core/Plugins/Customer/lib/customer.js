module.exports = function(Example, Hype, _) {
    var privateFunc = function() {
        return 'is real';
    };

    Example.publicFunc = function() {
        return 'The Hype ' + privateFunc();
    };

    return Example;
};