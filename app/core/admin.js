/**
 * Core admin panel configuration
 *
 *
 */

 var Admin;

 Admin = function(db) {
 	this.requiredAuth = function(req, res) {
 		return function (req, res, next) {
	 		if (req.session && req.session.authenticated) {
	 			return next();
	 		} else {
	 			return res.redirect(res.locals.admin + '/login');
	 		}
 		}
 	},

 	this.index = function(req, res) {
 		console.log('index');
 		res.send(200, 'index');
 	},

 	this.test = function(req, res) {
 		console.log(req.params);
 		res.send(200, 'test');
 	},

 	this.login = function(req, res) {
 		// set the user here when authenticated properly
 		// req.session.user = user;
 		res.render(__dirname + '/admin/index.html');
 	},

 	this.loginPost = function(req, res) {
 		// set the user here when authenticated properly
 		// req.session.user = user;
 		res.send(200, 'login');
 	}

 	return this;
 }

 module.exports = new Admin();