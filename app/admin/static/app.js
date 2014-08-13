/*global define */

define([
	'marionette',
	'views/Admin'
], function (Marionette, Admin) {
	'use strict';

	var app = new Marionette.Application();

	app.addRegions({
		admin: '#hype-admin',
	});

	app.addInitializer(function () {
		app.admin.show(new Admin());
	});

	return window.app = app;
});