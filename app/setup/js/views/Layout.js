define([
	'marionette',
	'templates',
	'views/Header',
	'views/Breadcrumbs',
	'views/Steps',
	'views/Footer'
], function(Marionette, Templates, Header, Breadcrumbs, Steps, Footer) {
	'use strict';

	return Marionette.Layout.extend({
		template: Templates.layout,
		// define regions
		regions: {
			header: '#header',
			breadcrumbs: '#breadcrumbs',
			main: '#main',
			footer: '#footer'
		},

		onRender: function() {
			this.header.show(new Header());
			this.breadcrumbs.show(new Breadcrumbs());
			this.main.show(new Steps());
			this.footer.show(new Footer());
		}
	});
});