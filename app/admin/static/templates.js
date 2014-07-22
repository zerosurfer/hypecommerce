/*global define */
define(function (require) {
	'use strict';

	return {
		// widgetView: require('tpl!templates/widgetView.tmpl'),
		dashboardView: require('tpl!templates/dashboard.tmpl'),
		// footer: require('tpl!templates/footer.tmpl'),
		header: require('tpl!templates/header.tmpl'),
		sidebar: require('tpl!templates/sidebar.tmpl'),
		ordersView: require('tpl!templates/orders/index.tmpl')
	};
});