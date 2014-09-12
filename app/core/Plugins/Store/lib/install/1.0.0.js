var Install;

module.exports = function(Hype) {

	Install = function() {

		this.up = function() {
			Hype.log("Upgrading store");
		},

		this.down = function() {
			Hype.log("Downgrading store");
		}
	}
	
	return new Install();
}