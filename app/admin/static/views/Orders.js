/*global define */
define([
	'marionette',
	'templates'
], function (Marionette, templates) {
	'use strict';

	return Marionette.CompositeView.extend({
		template: templates.dashboardView,

		itemView: {},

		itemViewContainer: '#order-list',

		// ui: {
		// 	toggle: '#toggle-all'
		// },

		// events: {
		// 	'click #toggle-all': 'onToggleAllClick'
		// },

		initialize: function () {
			//this.listenTo(this.collection, 'all', this.updateToggleCheckbox, this);
		},

		onRender: function () {
			$('.navbar-static-side').css({ height: ($(window).height() - 75) + 'px' });
			$('#side-menu').metisMenu();
			//this.updateToggleCheckbox();
		},

		updateToggleCheckbox: function () {
			var allCompleted = this.collection.reduce(function (lastModel, thisModel) {
				return lastModel && thisModel.get('completed');
			}, true);

			this.ui.toggle.prop('checked', allCompleted);
		},

		onToggleAllClick: function (event) {
			var isChecked = event.currentTarget.checked;

			this.collection.each(function (todo) {
				todo.save({ completed: isChecked });
			});
		}
	});
});