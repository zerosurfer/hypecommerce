module.exports = function(Hype) {
    var auth = Hype.require('Auth');

    return {
        '/admin/dashboard': {
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
        }
    }
};