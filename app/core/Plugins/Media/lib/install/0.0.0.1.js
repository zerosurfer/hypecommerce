var Install;

module.exports = function(Hype) {

	Install = function() {

		this.up = function() {
			Hype.log("Installing media");
		},

		this.down = function() {
			Hype.log("Uninstalling media");
		}
	}
	
	return new Install();
}