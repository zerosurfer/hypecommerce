/**
 * Will handle logic for clustering application using 'cluster' npm package
 *
 *
 */
var cluster = require("cluster"),
	when = require('when'),
	Cluster;

Cluster = function() {

	this.init = function(Hype) {

		var loaded = when.defer();
		Hype.log("Starting the cluster");

		if (cluster.isMaster) {
			// Setup the workers
			cluster.setupMaster({
				exec : './app/core/worker.js'
			});

			// Fork workers.
			for (var i = 0; i < Hype.configuration.nodes; i++) {
				Hype.log("Cluster spinning up new worker (#" + (i + 1) + ")");
				cluster.fork();
			}

			cluster.on('exit', function(worker, code, signal) {
				Hype.log("Cluster node " + worker.process.pid + " has died");
			});
		} else {

			Hype.log("TESTING up ");
			Hype.Server.init(Hype).then(function() {
				loaded.resolve();
			});
		}

		return loaded.promise;
	}

	return this;
}

module.exports = Cluster;