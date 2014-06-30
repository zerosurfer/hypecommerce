var Worker,
	Server = require('./server'),
	Hype = require('./app');

Worker = function() {
	var count = 0;

	Hype.configure();
	Hype.preload();
	Hype.connect();
	return Server.init(Hype);

	return this;
}

module.exports = new Worker();