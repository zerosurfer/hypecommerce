var Worker,
	_ = require('underscore'),
	Server = require('./server'),
	Hype = require('./app');

Worker = function() {
	var count = 0;

	Hype.configure();
	return Server.init(Hype);

	return this;
}

module.exports = new Worker();