/*global define */

define([
	'marionette',
	'collections/Widgets',
	'views/Header',
	'views/Sidebar',
	'views/Dashboard',
	'views/Footer'
], function (Marionette, Widgets, Header, Sidebar, Dashboard, Footer) {
	'use strict';

	var app = new Marionette.Application();
	var widgets = new Widgets();

	var viewOptions = {
		collection: widgets
	};

	var header = new Header();
	var sidebar = new Sidebar();
	var main = new Dashboard(viewOptions);
	var footer = new Footer();

	app.addRegions({
		header: '#hype-admin-header',
		main: '#hype-admin-dashboard',
		sidebar: '#hype-admin-sidebar',
		footer: '#hype-admin-footer'
	});

	app.addInitializer(function () {
		app.header.show(header);
		app.sidebar.show(sidebar);
		app.main.show(main);
		//app.footer.show(footer);

		//todoList.fetch();
	});

	// app.listenTo(todoList, 'all', function () {
	// 	app.main.$el.toggle(todoList.length > 0);
	// 	app.footer.$el.toggle(todoList.length > 0);
	// });

	// app.vent.on('todoList:filter', function (filter) {
	// 	footer.updateFilterSelection(filter);

	// 	document.getElementById('todoapp').className = 'filter-' + (filter === '' ? 'all' : filter);
	// });

	// app.vent.on('todoList:clear:completed', function () {
	// 	todoList.getCompleted().forEach(function (todo) {
	// 		todo.destroy();
	// 	});
	// });

	return window.app = app;
});