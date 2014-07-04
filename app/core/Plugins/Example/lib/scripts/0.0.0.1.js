var Install;

module.exports = function(Hype) {

	Install = function() {

		this.up = function(Hype) {
			Hype.log("Installing example");
		},

		this.down = function(Hype) {
			Hype.log("Uninstalling example");
		}


	}

}