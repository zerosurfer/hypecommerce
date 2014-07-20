/*global define */
define([
	'backbone',
	'models/Widget',
], function (Backbone, Widget) {
	'use strict';

	return Backbone.Collection.extend({
		model: Widget,

		//localStorage: new Backbone.LocalStorage('todos-backbone'),

		// getCompleted: function () {
		// 	//return this.where({completed: true});
		// },

		// getActive: function () {
		// 	return this.where({completed: false});
		// },

		comparator: 'created'
	});
});