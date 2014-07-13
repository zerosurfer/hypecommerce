/**
 * Hype Commerce
 *
 * @package     Hype
 * @version     0.0.1.0
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

var _ = require('underscore'),
    Models = {},
    installer = require('./Installer');

module.exports = (function(installer, _) {
    "use strict";

    var initModels = function(modules, hype) {
        var supermodels = {};

        _(modules).each(function(module) {
            // Have an instance of each raw model
            if (module.is('started')) {
                //console.log(module);
                if (module.models) {
                    _(module.models).each(function(model, modelName) {
                        Models[modelName] = model;
                    });
                }
            }
        });

        // Join all instances of "extend" properties to form a supermodel
        _(modules).each(function(module) {
            if (module.is('started')) {
                if (module.models) {
                    _(module.models).each(function(model, modelName) {
                        if (supermodels[modelName] !== undefined && model.schema !== undefined) {
                            // Loop through the extend and add the attribtues
                            // @todo make this a lot better, triple nested foreach loop
                            _(model.schema).each(function(attribute, attributeName) {
                                supermodels[modelName].schema[attributeName] = attribute;
                            });

                            // @kurt - Check it out, extending our models for schema
                            // @todo - Make models extendable (hasMany, hasOne)
                            //if (modelName === 'Order') console.log(supermodels[modelName]);
                        } else {
                            supermodels[modelName] = model;
                        }
                    });
                }
            }
        });

        // Recursively load all the models
        _(supermodels).each(function(model, modelName) {
            loadModel(modelName, model, hype);
        });
    };

    var initScripts = function(modules, hype) {
       _(modules).each(function(module) {
            if (module.is('started')) {
                module.install();
            }
        });
    };

    var initRoutes = function(modules, hype, app) {
        // _(modules).each(function(module) {
        //     if (module.is('started')) {
        //         if (module.routes) {
        //             var routes = module.routes(hype);
        //             // console.log(routes);
        //             _(routes).each(function(route, routeName) {
        //                 // log the route addition
        //                 hype.log('Adding ' + route.method.toUpperCase() + ' route: ' + routeName)

        //                 // using array notation to call the appropriate method
        //                 app[route.method.toLowerCase()](routeName, route.callback);
        //             });
        //         }
        //     }
        // });
    };

    // Recursively load the models into mongoose
    var loadModel = function(name, model, hype) {

        if (!hype.dba.hasModel(name)) {

            hype.debug("Adding model: " + name);

            // Set that we're processing the model
            hype.dba.startProcessing(name);

            // if model has dependencies
            if (model.deps) {
                // for each dep
                // - check to see if it is instantiated
                // - if not instantiate it
                // - get the model
                // - update the current schema
                // - add model to dba
                if (model.deps.hasMany) {
                    _(model.deps.hasMany).each(function(dep, localName) {
                        if (!hype.dba.hasModel(dep) && !hype.dba.isProcessing(dep)) {
                            loadModel(dep, Models[dep], hype);
                        }
                        model.schema[localName] = [hype.dba.getModel(dep)];
                    });
                }

                if (model.deps.hasOne) {
                    _(model.deps.hasOne).each(function(dep, localName) {
                        if (!hype.dba.hasModel(dep) && !hype.dba.isProcessing(dep)) {
                            loadModel(dep, Models[dep], hype);
                        }
                        // @kurt - idk why but this really doesn't like not being an array
                        // @tom - we will have to see, if thats the case, then we can get rid of hasOne/hasMany, its doing the same thing, i will investigate
                        model.schema[localName] = [hype.dba.getModel(dep)];
                    });
                }

                hype.dba.addModel(name, model.schema);

            } else {
                hype.dba.addModel(name, model.schema);
            }

            hype.dba.stopProcessing(name);
        }
    };

    return {
        init: function(modules, hype, app) {
            initModels(modules, hype);
            initScripts(modules, hype);
            initRoutes(modules, hype, app);
        }
    };
})(installer, _);
