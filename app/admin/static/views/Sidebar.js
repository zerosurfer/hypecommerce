/*global define */
define([
	'marionette',
	'templates',
	'jquery'
], function (Marionette, templates, $) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.sidebar,

		ui: {
			input: '#side-menu li'
		},

		events: {
			'click #side-menu li': 'onClickMenu'
		},
		
		onClickMenu: function (e) {
			e.preventDefault();
			
			console.log(this.ui.input);

		}
	});
});