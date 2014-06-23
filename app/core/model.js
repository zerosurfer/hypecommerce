/**
 * Base model for Hype
 *
 */
var Model

Model = function(Hype, dba) {

	this.attrs = {},
	this.originalAttrs = {},
	this.dirty = false,
	this.Hype = Hype,

	this.getDba = function() {
		return dba;
	}

	this.load = function(id) {
		// get from the db
		// this.attrs = model;
		// this.originalAttrs = model;
		return id;
	}

	// this.save = function() {
	// 	if (this.checkDirty()) {
	// 		// .. save ..
	// 	}
	// },

	this.remove = function() {
		// Free up dependencies
	},

	this.checkDirty = function() {
		// if attrs different from originalAttrs then true
		return true;
	}

	this.testFunc = function() {
		return "Hello function";
	}
}

module.exports = Model;