define([
	"spa/templates"
	],
	function(templates){
		var Hello = Backbone.Marionette.ItemView.extend({
			template: 'hello'
		});
		return Hello;
	});