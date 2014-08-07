/*global define */
define(function (require) {
	'use strict';

	return {
		steps: require('tpl!templates/steps.tmpl'),
		stepStore: require('tpl!templates/steps/store.tmpl'),
		stepPlugins: require('tpl!templates/steps/plugins.tmpl'),
		stepDatabase: require('tpl!templates/steps/database.tmpl'),
		stepServer: require('tpl!templates/steps/server.tmpl'),
		stepReview: require('tpl!templates/steps/review.tmpl'),
		footer: require('tpl!templates/footer.tmpl'),
		header: require('tpl!templates/header.tmpl')
	};
});
