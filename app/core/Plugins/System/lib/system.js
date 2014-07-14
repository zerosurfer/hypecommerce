module.exports = function(System, Hype, _) {
    var privateFunc = function() {
        return 'is real';
    };

    System.getStoreConfig = function(path, store) {
        return true;
    };

    return System;
};