/*global define */

define([
	'marionette',
	'views/Layout'
], function (Marionette, Layout) {
	'use strict';

	var app = new Marionette.Application(),
		layout = new Layout();

	app.addRegions({
		setup: '#hypecommerce-setup'
	});

	app.addInitializer(function () {
		this.setup.show(layout);
	});

	return window.app = app;
});
