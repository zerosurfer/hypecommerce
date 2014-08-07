/*global define */

define([
	'marionette',
	'views/Header',
	'views/Steps',
	'views/Footer'
], function (Marionette, Header, Steps, Footer) {
	'use strict';

	var app = new Marionette.Application();

	var viewOptions = {
		step: 'store'
	};

	var header = new Header();
	var main = new Steps(viewOptions);
	var footer = new Footer();

	app.addRegions({
		header: '#header',
		main: '#main',
		footer: '#footer'
	});

	app.addInitializer(function () {
		app.header.show(header);
		app.main.show(main);
		app.footer.show(footer);

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
