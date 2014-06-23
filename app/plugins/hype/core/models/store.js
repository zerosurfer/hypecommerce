/**
 * Need a way to load in the hype app from here and be able to write something like the below
 *
 *
 */

var	Store;

Store = function() {
	
	this.schema = {
		name: String, // My Store
		code: String, // default
		//views: ['View'], // [en_US, en_UK, de_DE, fr_FR, es_ES]
		created: { type: Date, default: Date.now },
		updated: { type: Date, default: Date.now }
	},
	this.deps = {
		views: ['View']
	}

	return this;
}
module.exports = Store;