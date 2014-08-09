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

		currentStep: 0,

		steps: [
			'store',
			'database',
			'server',
			'plugins',
			'review'
		],

		events: {
		    'click .next-step': 'clickNextStep',
		    'click .prev-step': 'clickPrevStep',
		},

		clickNextStep: function(e) {
			e.preventDefault();
			var Step = function() {};

			this.currentStep++;

			switch(this.steps[this.currentStep]) {
				case 'store' :
					Step = new StoreStep();
					break;
				case 'database' :
					Step = new DatabaseStep();
					break;
				case 'server' :
					Step = new ServerStep();
					break;
				case 'plugins' :
					Step = new PluginsStep();
					break;
				case 'review' :
					Step = new ReviewStep();
					break;
			}

			this.step.show(Step);
		},

		clickPrevStep: function(e) {
			e.preventDefault();
			var Step = function() {};

			this.currentStep--;

			switch(this.steps[this.currentStep]) {
				case 'store' :
					Step = new StoreStep();
					break;
				case 'database' :
					Step = new DatabaseStep();
					break;
				case 'server' :
					Step = new ServerStep();
					break;
				case 'plugins' :
					Step = new PluginStep();
					break;
				case 'review' :
					Step = new ReviewStep();
					break;
			}

			this.step.show(Step);
		},

		onRender: function () {
			console.log('updating the current step');
			this.step.show(new StoreStep());
		},
	});
});
