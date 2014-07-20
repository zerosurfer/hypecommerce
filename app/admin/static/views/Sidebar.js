define(['backbone','marionette'], function(Backbone, Marionette) {
	
	var Sidebar = Marionette.View.extend({
		initialize: function() {
			
			console.log( 'Wahoo!' );
		}
	});

  return Sidebar;
});