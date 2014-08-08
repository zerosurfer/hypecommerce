/*global define */
define([
	'marionette',
	'templates'
], function (Marionette, templates) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.breadcrumbs,

		ui: {
			input: '.setup-breadcrumbs li a'
		},

		events: {
			'keypress .setup-breadcrumbs li a': 'changeStep'
		},

		changeStep: function (event) {
			var ENTER_KEY = 13;
			var todoText = this.ui.input.val().trim();

			if (event.which === ENTER_KEY && todoText) {
				this.collection.create({
					title: todoText
				});

				this.ui.input.val('');
			}
		}
	});
});
