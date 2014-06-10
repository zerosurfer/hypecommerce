define([
	"spa/templates"
	],
	function(templates){
		var Layout = Backbone.Marionette.Layout.extend({
		  template: 'layout',
		  regions: {
		    menu: "#menu",
		    content: "#content"
		  }
		});
		return Layout;
	});