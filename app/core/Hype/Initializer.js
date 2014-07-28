/**
 * Hype Commerce
 *
 * @package     Hype
 * @version     0.0.1.0
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

var _ = require('underscore');

module.exports = (function(_) {
    "use strict";

    var initModels = function(modules, Hype) {
        var supermodels = {},
            supermenu = {
                menu: {}
            };

        var deep = function(a, b) {
            return (_.isObject(a) && _.isObject(b)) ? _.extend(a, b, deep) : b;
        };

        _(modules).each(function(module) {
            // Have an instance of each raw model
            if (module.is('started')) {
                //console.log(module);
                if (module.models) {
                    _(module.models).each(function(model, modelName) {
                        Hype.Db.addRawModel(model, modelName);
                    });
                }
            }
        });

        // Join all instances of "extend" properties to form a supermodel
        _(modules).each(function(module) {
            if (module.is('started')) {
                // Load the models
                if (module.models) {
                    _(module.models).each(function(model, modelName) {
                        if (supermodels[modelName] !== undefined) {
                            // Loop through the extend and add the attribtues
                            // @todo make this a lot better, triple nested foreach loop

                            // Extend all schema attributes
                            if (model.schema !== undefined) {
                                _(model.schema).each(function(attribute, attributeName) {
                                    supermodels[modelName].schema[attributeName] = attribute;
                                });
                            }

                            if (model.deps !== undefined) {
                                if (model.deps.hasOne !== undefined) {
                                    _(model.deps.hasOne).each(function(attribute, attributeName) {
                                        supermodels[modelName].deps.hasOne[attributeName] = attribute;
                                    });
                                }

                                if (model.deps.hasMany !== undefined) {
                                    _(model.deps.hasMany).each(function(attribute, attributeName) {
                                        supermodels[modelName].deps.hasMany[attributeName] = attribute;
                                    });
                                }
                            }

                            // @kurt - Check it out, extending our models for schema
                            //if (modelName === 'Order') console.log(supermodels[modelName]);
                        } else {
                            supermodels[modelName] = model;
                        }
                    });
                }

                // Build the menu object
                // The menu should sit on the Admin class so that the endpoint has access to it
                if (module.admin && module.admin.menu) {
                    _(module.admin.menu).each(function(contents, menu) {
                        if (!supermenu.menu[menu]) {
                            supermenu.menu[menu] = contents;
                        } else {
                            _(contents).each(function(value, key) {
                                if (!supermenu.menu[menu][key]) {
                                    supermenu.menu[menu][key] = value;
                                } else {
                                    // Go one deeper, as to not overwrite children
                                    // @todo optimization
                                    _(value).each(function(v, k) {
                                        supermenu.menu[menu][key][k] = v;
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });

        // console.log(supermenu);
        // Add the supermenu to the Admin
        Hype.Admin.menu = sortMenu(supermenu.menu);

        // Recursively load all the models
        _(supermodels).each(function(model, modelName) {
            Hype.Db.loadModel(modelName, model, Hype);
        });
    };

    var sortMenu = function(elements) {
        var sortable = [],
            sortedElements = {},
            level = 0,
            elem,
            key,
            position,
            value,
            e,
            i;

        // Get the sort values
        for (e in elements) {
            elem = elements[e];

            // Check for children
            if (elem.children !== undefined) {
                elem.children = sortMenu(elem.children);
            }

            if (elem.sort === undefined) {
                elem.sort = 9999;
            }

            sortable.push([e, elem.sort]);
        }

        // Sort the level
        sortable.sort(function(a, b) { 
            return a[1] - b[1];
        });

        // Rebuild the elements object
        for(i = 0; i < sortable.length; i++) {
            value = sortable[i];
            position = value[1];
            key = value[0];
            sortedElements[key] = elements[key];
        }

        return sortedElements;
    }

    var initScripts = function(modules, Hype) {
       _(modules).each(function(module) {
            if (module.is('started')) {
                module.install();
            }
        });
    };

    var initRoutes = function(modules, Hype, app) {
        _(modules).each(function(module) {
            if (module.is('started')) {
                // Add the regular routes
                if (module.routes) {
                    var routes = module.routes(Hype);
                    // console.log(routes);
                    _(routes).each(function(methods, route) {

                        _(methods).each(function(method, methodType) {
                            // log the route addition
                            Hype.log('Adding ' + methodType.toUpperCase() + ' route: ' + route);

                            // using array notation to call the appropriate method
                            app[methodType.toLowerCase()](route, method);
                        });
                    });
                }
                // Add the admin routes
                if (module.admin && module.admin.routes) {
                    var routes = module.admin.routes(Hype);
                    // console.log(routes);
                    _(routes).each(function(methods, route) {

                        _(methods).each(function(method, methodType) {
                            // log the route addition
                            Hype.log('Adding ' + methodType.toUpperCase() + ' route: ' + route);

                            // using array notation to call the appropriate method
                            app[methodType.toLowerCase()](route, method);
                        });
                    });
                }
            }
        });
    };

    return {
        init: function(modules, Hype, app) {
            initModels(modules, Hype);
            initScripts(modules, Hype);
            initRoutes(modules, Hype, app);
        }
    };
})(_);
