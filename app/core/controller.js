/**
 * Base controller
 *
 *
 */

var domain = require('domain'),
	Controller;

Controller = function() {
	this.catchError = function(error, req, res, next) {
		if (domain.active) {
			console.info('caught with domain');
			domain.active.emit('error', error);
		} else {
			console.log('no domain');

		}
	},

	this.faultyRouteExample = function(res, req, next) {
		var d = domain.create();
		d.on('error', function(error) {
			console.error(error.stack);
			res.send(500, {"error" : error.message });
		});
		d.run(function() {
			throw new Error("Breaking this on purpose");
		});
	}
}

