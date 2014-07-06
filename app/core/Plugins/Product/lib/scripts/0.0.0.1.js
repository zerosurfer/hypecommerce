var Install;

module.exports = function(Hype) {

	Install = function() {

		this.up = function() {
			Hype.log("Installing product");
		},

		this.down = function() {
			Hype.log("Uninstalling product");
		}
	}
	
	return new Install();
}