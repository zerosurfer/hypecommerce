var passport = require('Passport');

module.exports = function(Auth, Hype, _) {
    Auth.login = function(email, password) {
        Hype.debug('in login method');
    };

    Auth.logout = function() {
        Hype.debug('in logout method');
    };

    Auth.isLoggedIn = function() {
        Hype.debug('in isLoggedIn method');
    };

    Auth.register = function() {
        Hype.debug('in register method');
    };

    return Auth;
};