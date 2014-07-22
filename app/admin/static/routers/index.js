/*global define */
define([
	'marionette'
], function (Marionette) {
	'use strict';

	return Marionette.AppRouter.extend({
		appRoutes: {
			'/orders/today': 'testOrders'
		}
	});
});