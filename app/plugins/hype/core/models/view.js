/**
 * Need a way to load in the hype app from here and be able to write something like the below
 *
 *
 */

var	View;

View = function(db) {
	
	this.schema = {
		name: String, // English
		code: String, // en_US | de_DE
		url: String, // http://www.hypecommerce.com/ | http://www.hypecommerce.de/
		language: String, // en_US | de_DE
		primary: Boolean, // true
		created: { type: Date, default: Date.now },
		updated: { type: Date, default: Date.now }
	},
	this.deps = {
		currency: 'Currency' // Currency.character = $
	}

	return this;
}

module.exports = View;