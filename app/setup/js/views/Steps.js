/*global define */
define([
	'marionette',
	'templates',
	'views/Steps/Database',
	'views/Steps/Server',
	'views/Steps/Store',
	'views/Steps/Plugins',
	'views/Steps/Review',
], function (Marionette, Templates, DatabaseStep, ServerStep, StoreStep, PluginsStep, ReviewStep) {
	'use strict';

	return Marionette.Layout.extend({
		template: Templates.steps,

		regions: {
			step: '#current-step'
		},

		onRender: function () {
			console.log('updating the current step');
			this.step.show(new StoreStep());
		},
	});
});
