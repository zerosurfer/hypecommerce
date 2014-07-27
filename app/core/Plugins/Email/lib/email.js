module.exports = function(Email, Hype, _) {
    var privateFunc = function() {
        return 'is real';
    };

    Email.getStoreConfig = function(path, store) {
        return true;
    };

    return Email;
};