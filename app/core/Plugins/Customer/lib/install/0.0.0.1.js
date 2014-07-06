var Install;

module.exports = function(Hype) {

	Install = function() {

		this.up = function() {
			Hype.log("Installing customer");
		},

		this.down = function() {
			Hype.log("Uninstalling customer");
		}
	}
	
	return new Install();
}