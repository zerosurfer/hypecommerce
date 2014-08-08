/*global define */
define([
	'marionette',
	'templates',
	'views/Steps/Database',
	'views/Steps/Server',
	'views/Steps/Store',
	'views/Steps/Plugins',
	'views/Steps/Review',
], function (Marionette, templates, DatabaseStep, ServerStep, StoreStep, PluginsStep, ReviewStep) {
	'use strict';

	return Marionette.CompositeView.extend({
		template: templates.steps,

		itemView: StoreStep,

		itemViewContainer: '#current-step',

		// ui: {
		// 	toggle: '#toggle-all'
		// },

		// events: {
		// 	'click #toggle-all': 'onToggleAllClick'
		// },

		// initialize: function () {
		// 	this.listenTo(this.collection, 'all', this.updateToggleCheckbox, this);
		// },

		onRender: function () {
			console.log('updating the current step');
			//this.updateToggleCheckbox();
		},

		// updateToggleCheckbox: function () {
		// 	var allCompleted = this.collection.reduce(function (lastModel, thisModel) {
		// 		return lastModel && thisModel.get('completed');
		// 	}, true);

		// 	this.ui.toggle.prop('checked', allCompleted);
		// },

		// onToggleAllClick: function (event) {
		// 	var isChecked = event.currentTarget.checked;

		// 	this.collection.each(function (todo) {
		// 		todo.save({ completed: isChecked });
		// 	});
		// }
	});
});
