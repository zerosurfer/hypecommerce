define([
	'marionette',
	'templates',
	'views/Header',
	'views/Sidebar',
	'views/Dashboard',
	'views/Footer',
	'collections/MenuItems'
], function(Marionette, Templates, Header, Sidebar, Dashboard, Footer, MenuItems) {
	'use strict';
	var items = new MenuItems();
	var sidebar = new Sidebar({
		collection: items
	});

	return Marionette.LayoutView.extend({
		template: Templates.layout,

		// define regions
		regions: {
			header: '#hype-admin-header',
			sidebar: '#hype-admin-sidebar',
			dashboard: '#hype-admin-dashboard',
			footer: '#hype-admin-footer'
		},

		onRender: function() {

			this.header.show(new Header());
			this.sidebar.show(sidebar);
			this.dashboard.show(new Dashboard());
			this.footer.show(new Footer());
		}
	});
});