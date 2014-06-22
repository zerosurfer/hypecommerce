/**
 * Base model for Hype
 *
 */
var Model;

Model = function(dba) {

	this.attrs = {},
	this.originalAttrs = {},
	this.dirty = false,

	this.load = function(id) {
		// get from the db
		// this.attrs = model;
		// this.originalAttrs = model;
	}

	this.save = function() {
		if (this.dirty) {
			// .. save ..
		}
	},

	this.remove = function() {
		// Free up dependencies
	},

	this.testFunc = function() {
		return "Hello function";
	}
}

module.exports = Model;