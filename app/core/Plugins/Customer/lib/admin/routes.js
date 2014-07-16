module.exports = function(Hype) {
    var auth = Hype.require('Auth');

    return {
        '/admin/customer': {
            get: function(req, res) {
                res.redirect('/admin');
            }
        }
    }
};