/**
 * Base model for Hype
 *
 */
var Model;

Model = function(db) {


	this.testFunc = function() {
		console.log("Hello function");
	},

	this.getDb = function() {
		return db.modelCollection;
	}
}

module.exports = Model;