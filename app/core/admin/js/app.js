require.config({
  paths: {
    'jquery': 'lib/jquery'
  },
  shim: {
    'lib/underscore': {
      exports: '_'
    },
    'lib/backbone': {
      deps: ["lib/underscore", "jquery"],
      exports: 'Backbone'
    },
    'foundation.min': {
      exports: 'foundation'
    }
  }
});

require(
  ["jquery",
    "lib/underscore",
    "lib/backbone",
    "foundation.min"
    // "views/cartcollectionview"
  ],
  function($, _, B) {
    $(function() {
      console.log("Started backbone app");
    });
  }
);

