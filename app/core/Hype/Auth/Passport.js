var LocalStrategy = require('passport-local').Strategy;
        //FacebookStrategy = require('passport-facebook').Strategy,
        //GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
        //LinkedInStrategy = require('passport-linkedin').Strategy,
        //Account = require('../app/modules/Account');

module.exports = function(hype, app, passport) {
    "use strict";

    var AccountModel = hype.Db.getModel('AdminUser');

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        AccountModel.findById(id, function(err, user) {
            user = Account.sanitizeUser(user);
            user.isLoggedIn = true;
            done(err, user);
        });
    });

    // Local Strategy
    passport.use(
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, function(email, password, done) {
            AccountModel.findOne({ email: email }, function (err, user) {
                if (err) { return done(err); }

                if (!user) {
                    return done(null, false, { message: 'Incorrect email or password.' });
                }

                if (!user.authenticate(password)) {
                    return done(null, false, { message: 'Incorrect email or password.' });
                }

                return done(null, user);
            });
        })
    );

    /*
    // Facebook Strategy
    passport.use(
        new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL
        }, function(accessToken, refreshToken, profile, done) {

            // gather fb info
           var info = {
                provider: 'facebook',
                facebook: profile,
                fullName: profile._json.name,
                email: profile._json.email,
                birthday: new Date(profile._json.birthday),
                gender: profile._json.gender,
                work: {
                    position: profile._json.work[0].position.name
                },
                facebookId: profile._json.id
            };

            // check for user, if found update, else create
            var query = AccountModel.findOne({
                $or: [ { 'email': profile._json.email }, { 'facebookId': profile._json.id } ]
            });

            var promise = query.exec();

            promise.then(function(user) {
                if (!user) {
                    return AccountModel.create(info, function(err, usr) {
                        if (err) { return done(err); }

                        return done(null, usr);
                    });
                }

                return done(null, user);
            }, function(err) {
                return done(err);
            });

            return promise;
        })
    );

    // Google Strategy
    passport.use(
        new GoogleStrategy({
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackURL
        }, function(accessToken, refreshToken, profile, done) {

            // gather google info
            var info = {
                provider: 'google',
                google: profile._json,
                fullName: profile._json.name,
                email: profile._json.email,
                profileURL: profile._json.picture,
                gender: profile._json.gender,
                googleId: profile._json.id
            };

            // check for user, if found update, else create
            var query = AccountModel.findOne({
                $or: [ { 'email': profile._json.email }, { 'googleId': profile._json.id } ]
            });

            var promise = query.exec();

            promise.then(function(user) {
                if (!user) {
                    return AccountModel.create(info, function(err, usr) {
                        if (err) { return done(err); }

                        return done(null, usr);
                    });
                }

                return done(null, user);
            }, function(err) {
                return done(err);
            });

            return promise;
        })
    );
    */
};