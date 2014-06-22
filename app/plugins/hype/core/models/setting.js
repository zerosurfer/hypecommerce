/**
 * Need a way to load in the hype app from here and be able to write something like the below
 *
 *
 */

var	Setting;

Setting = function(db) {
	
	this.options = {

	},

	this.schema = {
		path: String, // module/group/setting
		value: String, // some value
		created: { type: Date, default: Date.now },
		updated: { type: Date, default: Date.now }
	},
	this.deps = {
		store: 'Store',
		view: 'View',
	}

	return this;
}
module.exports = Setting;