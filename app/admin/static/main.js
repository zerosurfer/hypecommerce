require.config({
  paths: {
    'jquery': 'components/jquery/dist/jquery',
    'underscore': 'components/underscore/underscore',
    'backbone': 'components/backbone/backbone',
    'marionette': 'components/marionette/lib/backbone.marionette'
  }
});

require(['views/app'], function(AppView) {
	new AppView;
});