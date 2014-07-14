var Install;

module.exports = function(Hype) {

	Install = function() {

		this.up = function() {
			Hype.log("Installing cart");
		},

		this.down = function() {
			Hype.log("Uninstalling cart");
		}
	}
	
	return new Install();
}