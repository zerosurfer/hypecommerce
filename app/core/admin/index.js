/**
* Admin theme should live here, probably built in Backbone
*
*
*/

// Require.js allows us to configure mappings to paths
// as demonstrated below:
require.config({
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone',
    foundation: 'libs/foundation.min.js',

    // storage has built in support for requirejs
    // hence, it doesn't need to configured in 'shim'
    storage: 'libs/backbone/backbone.localStorage',
    text: 'libs/require/text'
  },

  shim: {

    foundation: {
      exports: 'foundation'
    },

    underscore: {
      exports: '_'
    },

    backbone: {
      deps: [ 'underscore', 'jquery' ],
      exports: 'Backbone'
    }
  }

});

require([ 'views/app', 'collections/todos' ], function(AppView, AppCollection){
  var app_view = new AppView({
    collection: AppCollection
  });
});