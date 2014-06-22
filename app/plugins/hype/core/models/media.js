/**
 * Need a way to load in the hype app from here and be able to write something like the below
 *
 *
 */

var	Media;

Media = function(db) {
	
	this.schema = {
		filename: String,
		filepath: String,
		description: String,
		type: String, // mp4, wav, jpg, etc.
		created: { type: Date, default: Date.now },
		updated: { type: Date, default: Date.now }
	}

	return this;
}

module.exports = Media;