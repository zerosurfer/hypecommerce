var Install;

module.exports = function(Hype) {

	Install = function() {

		this.up = function() {
			Hype.log("Installing store");
		},

		this.down = function() {
			Hype.log("Uninstalling store");
		}
	}
	
	return new Install();
}