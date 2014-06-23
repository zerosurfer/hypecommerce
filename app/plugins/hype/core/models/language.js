/**
 * Need a way to load in the hype app from here and be able to write something like the below
 *
 *
 */

var	Language;

Language = function() {
	
	this.schema = {
		name: String, // English, German, Pirate
		code: String, // en_US, de_DE (where to look for .json translation files)
		created: { type: Date, default: Date.now },
		updated: { type: Date, default: Date.now }
	}

	return this;
}

module.exports = Language;