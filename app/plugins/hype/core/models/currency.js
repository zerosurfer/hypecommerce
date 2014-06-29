/**
 * Need a way to load in the hype app from here and be able to write something like the below
 *
 *
 */

var	Currency;

Currency = function() {
	
	this.schema = {
		name: String,
		character: String, // currency char, like B for Bitcoin or $ for Dollar
		decimals: Number,
		created: { type: Date, default: Date.now },
		updated: { type: Date, default: Date.now }
	}

	return this;
}

module.exports = Currency;