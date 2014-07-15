module.exports = function(Hype) {
    var auth = Hype.require('Auth');

    return {
        '/admin/auth/login': {
            post: function(req, res, next) {
              passport.authenticate('local', function(err, user, info) {
                if (err) { return next(err); }
                if (!user) { return res.redirect('/login'); }
                req.logIn(user, function(err) {
                  if (err) { return next(err); }
                  return res.redirect('/users/' + user.username);
                });
              })(req, res, next);
            },
            get: function(req, res) {
                res.redirect('/admin');
            }
        },
        '/admin/auth/logout': {
            get: function(req, res) {
                auth.logout();
                res.redirect('/admin/login');
            }
        },
        '/admin/auth/isLoggedIn': {
            get: function(req, res) {
                //return (req.user) ? res.json()
            }
        },
        '/admin/auth/register': {
           post: function(req, res) {
                var data = {
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password
                };

                auth.register(data).done(function(user) {
                    req.logIn(user, function(err) {

                        if (err) { return res.json(400, err); }

                        return res.json(200, user);
                    });
                });
            }
        },
        'admin/auth/update': {
            put: function(res, req) {

            }
        }
    }
};