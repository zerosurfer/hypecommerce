/**
 * Will handle logic for clustering application using 'cluster' npm package
 *
 *
 */
var cluster = require("cluster"),
	Cluster;

var Cluster = function(Hype) {
	this.init = function() {
		cluster.setupMaster({
			exec : "./server.js",
			args : ["--use", "https"],
			silent : true
		});
	}
	cluster.fork();
}