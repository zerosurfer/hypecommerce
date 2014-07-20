var Locale,
	i18n = require('i18next');

module.exports = function(Hype) {

	Locale = function() {
		i18n.init();
		i18n.setLng('en-US', function(t) {
			/* loading done */
		});
 	}

 	return new Locale();
}