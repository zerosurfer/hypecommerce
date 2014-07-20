require.config({

	paths: {
		'jquery': 'components/jquery/dist/jquery',
		'underscore': 'components/underscore/underscore',
		'backbone': 'components/backbone/backbone',
		'marionette': 'components/marionette/lib/backbone.marionette'
	},

	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone',

		},
		marionette: {
			exports: 'Backbone.Marionette',
			deps: ['backbone']
		}
	},

	deps: ['jquery', 'underscore']
});

require([
	'app',
	'backbone',
	'routers/index',
	'controllers/index',
	'views/app'
], function (app, Backbone, Router, Controller) {
	'use strict';

	app.start();

	new Router({ controller: Controller });

	Backbone.history.start();

	new AppView;
});
