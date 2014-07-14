var passport = require('Passport');

module.exports = function(Auth, Hype, _) {
    Auth.login = function(email, password) {
        console.log('in login method');
    };

    Auth.logout = function() {
        console.log('in logout method');
    };

    Auth.isLoggedIn = function() {
        console.log('in isLoggedIn method');
    };

    Auth.register = function() {
        console.log('in register method');
    };

    return Auth;
};