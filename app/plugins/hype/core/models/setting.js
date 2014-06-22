/**
 * Need a way to load in the hype app from here and be able to write something like the below
 *
 *
 */

var	Setting;

Setting = function(db) {
	this.settingFunc = function() {
		console.log("Settings function");
	}

	return this;
}
module.exports = Setting;