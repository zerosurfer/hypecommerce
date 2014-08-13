/*global define */
define([
	'backbone',
	'models/MenuItem',
], function (Backbone, MenuItem) {
	'use strict';

	return Backbone.Collection.extend({
		model: MenuItem,
		url: '/admin/api/menu',
		initialize: function(){
			this.fetch();
		}

		//localStorage: new Backbone.LocalStorage('todos-backbone'),

		// getCompleted: function () {
		// 	//return this.where({completed: true});
		// },

		// getActive: function () {
		// 	return this.where({completed: false});
		// },

		//comparator: 'created'
	});
});