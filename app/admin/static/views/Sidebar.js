/*global define */
define([
	'marionette',
	'views/Sidebar/Item'
], function (Marionette, Item) {
	'use strict';

	return Marionette.CollectionView.extend({
		childView: Item
	});
});