/*global define */
define(function (require) {
	'use strict';

	return {
		layout: require('tpl!templates/layout.tmpl'),
		main: require('tpl!templates/dashboard.tmpl'),
		footer: require('tpl!templates/footer.tmpl'),
		header: require('tpl!templates/header.tmpl'),
		sidebar: require('tpl!templates/sidebar.tmpl'),

		sidebarItem: require('tpl!templates/sidebar/item.tmpl')
	};
});