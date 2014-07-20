define(['backbone','marionette'], function(Backbone, Marionette) {
	
	var App = Marionette.View.extend({
		initialize: function() {
			console.log( 'Wahoo!' );
		}
	});

  return App;
});