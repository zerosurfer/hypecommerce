/**
 * Hype Commerce
 *
 * @package   Hype
 * @module    System
 * @version   0.0.1
 * @author    Hype Commerce Team <team@hypejs.com>
 * @copyright Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license   http://www.hypejs.com/license
 */

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