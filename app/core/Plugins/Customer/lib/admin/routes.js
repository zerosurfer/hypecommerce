/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Customer
 * @version     0.0.1
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

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