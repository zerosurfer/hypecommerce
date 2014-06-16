# Structuring Data for Hype

## Creating a data module

```
Hype.module('Data.Namespace', function(Mod, App, Backbone, Marionette, $, _) {
    "use strict";

    var Example = Backbone.Model.extend({});

    var Examples = Backbone.Collection.extend({
        url: 'some/restful/path',
        model: Example
    });

    Mod.Example = Example;
    Mod.Examples = Examples;
});
```
## Using in application

```
Hype.module('Widgets.Namespace', function(Mod, App, Backbone, Marionette, $, _) {
    "use strict";

    var Layout = Marionette.Layout.extend({
        template: 'Widgets/Namespace/Layout',
        regions: {
            someRegion: '#some-region'
        },
        initialize: function(options) {
            // aggregate all data for the widget
            this.exampleCollection = new App.Data.Namespace.Examples();
            this.example2Collection = new App.Data.Namespace.Examples2();

            this.dataPromise = $.when(
                this.exampleCollection.fetch(),
                this.example2Collection.fetch()
            );

            // handle other initialization stuffs
        },
        onRender: function() {
            var self = this;

            // when all data is returned do rendering stuff
            this.dataPromise.done(function() {

                self.someRegion.show(Mod.SubView.get({collection: self.exampleCollection}));
            });
        }
    });
});
```
