/**
 * Core admin panel configuration
 *
 *
 */

 var Admin;

 Admin = function() {
 	this.index = function(req, res) {
 		console.log('index');
 		res.send(200, 'ok');
 	}

 	this.test = function(req, res) {
 		console.log(req.params);
 		res.send(200, 'ok');
 	}

 	return this;
 }

 module.exports = new Admin();