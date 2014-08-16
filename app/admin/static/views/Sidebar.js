/*global define */
define([
	'marionette',
	'views/Sidebar/Item'
], function (Marionette, Item) {
	'use strict';

	return Marionette.CollectionView.extend({
		childView: Item,

		buildChildView: function(child, ChildViewClass, childViewOptions){
			// build the final list of options for the childView class
			if (child.attributes.children) {
				console.log('how do recursive');
			}
			var options = _.extend({model: child}, childViewOptions);
			// create the child view instance
			var view = new ChildViewClass(options);
			// return it
			return view;
		},
	});
});