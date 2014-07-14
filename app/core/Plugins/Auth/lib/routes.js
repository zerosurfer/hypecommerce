module.exports = function(Hype) {
    var auth = Hype.require('Auth');

    return {
        '/auth/login': {
            method: 'post',
            callback: function(req, res, next) {
              passport.authenticate('local', function(err, user, info) {
                if (err) { return next(err); }
                if (!user) { return res.redirect('/login'); }
                req.logIn(user, function(err) {
                  if (err) { return next(err); }
                  return res.redirect('/users/' + user.username);
                });
              })(req, res, next);
            }
        },
        '/auth/logout': {
            method: 'get',
            callback: function(res, req) {
                auth.logout();
                res.redirect('/dashboard');
            }
        },
        '/auth/isLoggedIn': {
            method: 'get',
            callback: function(res, req) {
                auth.isLoggedIn();
            }
        },
        '/auth/register': {
            method: 'get',
            callback: function(res, req) {
                auth.register();
            }
        }
    }
};