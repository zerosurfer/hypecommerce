/**
 * Hype Commerce
 *
 * @package     Hype
 * @version     1.0.0
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

var _ = require('underscore'),
    path = require('path'),
    fs = require('fs');

module.exports = function(Hype) {
    "use strict";
    var Initializer;

    Initializer = function() {
        var self = this;
        var Modules = {};

        this.Server;
        this.Db;
        this.init = function(Db, Server) {
            Hype.listen('hype:server:complete', function() {
                self._init(Db, Server);
            })
        }

        this._init = function(Db, Server) {
            // Load the necessary core plugin files
            Hype.log("Preparing to load core modules");
            this.loadPlugins(path.resolve('./app/core/Plugins'));
            // Load any third-party plugin files
            Hype.log("Preparing to load third-party modules");
            fs.readdirSync(path.resolve('./app/plugins')).forEach(function(file) {;
                self.loadPlugins(path.resolve('./app/plugins/' + file));
            });

            this.Db = Db;
            this.Server = Server;

            // // Init models
            this.initModels(Db);
            // // Init routes
            // this.initRoutes();
            Hype.notify('hype:initializer:complete');
        },

        this.loadPlugins = function(filepath) {
            var HypePlugin = require('./Plugin')(),
                HypeModule = require('./Module')(),
                self = this;

            Hype.log('Reading plugins from ' + filepath);

            // Read the directory
            fs.readdirSync(filepath).forEach(function(file) {
                var pluginPath = filepath + '/' + file,
                    config,
                    name,
                    hypePlugin,
                    admin,
                    adminName;

                // Skip hidden folders and files
                if (file.indexOf('.') !== 0) {
                    // Configure the plugin
                    if(fs.existsSync(pluginPath + '/plugin.js')) {
                        config = require(pluginPath + '/plugin.js');
                        name = config.name;
                        // If we're not enabled, don't bother loading it to save resources
                        if (config.enabled) {
                            if (typeof config === 'function') {
                                config = config();
                            }
                            // Configure the admin
                            if(fs.existsSync(pluginPath + '/admin.js')) {
                                admin = require(pluginPath + '/admin.js'),
                                adminName = admin.name;
                                if (typeof admin === 'function') {
                                    admin = admin();
                                }
                                // Add the admin to config
                                config.admin = admin;
                            }
                            Hype.log("Adding plugin " + name + " v" + config.version);
                            // Instantiate the plugin
                            hypePlugin = new HypePlugin();
                            // Add the plugin to a protected module
                            Modules[name] = new HypeModule(name, hypePlugin, config, filepath + '/' + file);
                            // Start the module right away
                            Modules[name].start();
                        } else {
                            Hype.log("Skipping plugin " + name + " (not enabled)");
                        }
                    } else {
                        Hype.log("Skipping plugin " + name + " (plugin.js not found)");
                    }
                }
            });
        },

        this.getModules = function() {
            return Modules;
        },

        this.getModule = function(module) {
            return Modules[module];
        },

        this.requireModule = function(module, Hype) {
            return Modules[module].init(Hype);
        },

        this.initModels = function(Db) {
            var supermodels = {},
                supermenu = {
                    menu: {}
                };

            var deep = function(a, b) {
                return (_.isObject(a) && _.isObject(b)) ? _.extend(a, b, deep) : b;
            };

            _(Modules).each(function(module) {
                // Have an instance of each raw model
                if (module.is('started')) {
                    //console.log(module);
                    if (module.models) {
                        _(module.models).each(function(model, modelName) {
                            Db.addRawModel(modelName, model);
                        });
                    }
                }
            });

            // Join all instances of "extend" properties to form a supermodel
            _(Modules).each(function(module) {
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
            //Hype.Admin.menu = sortMenu(supermenu.menu);

            // Recursively load all the models
            _(supermodels).each(function(model, modelName) {
                Db.loadModel(modelName, model);
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

        this.initScripts = function(modules, Hype) {
            var moduleInstalled = {};
            //console.log(modules);
            // Sort the module dependencies
            _(Modules).each(function(module) {
                if (module.is('started')) {
                    if (module.depends) {
                        Hype.log("Checking dependencies for " + module.name);
                        _(module.depends).each(function(version, depend) {

                            hasVersion(depend, version, Modules);
                            
                        });
                    }
                    
                }
            });

           _(Modules).each(function(module) {
                if (module.is('started')) {
                    module.install();
                }
            });
        };

        /**
         * Determines if we have the right version loaded
         *
         * @param   String  module;     Name of the module
         * @param   String  version;    Version number (1.0.0)
         * @param   Array   modules;    The list of loaded modules
         * @return  Boolean
         */
        var hasVersion = function(module, version, modules) {
            var error,
                tmpVersion,
                rawVersionNumber,
                comparison;

            // Get the raw version number without the periods
            tmpVersion = version.replace(/\./g, '');

            // Strip the comparator
            comparison = function() {
                var comparator = '',
                    i = 0;
                for (i; i < tmpVersion.length; i++) {
                    if (isNaN(tmpVersion[i])) {
                        comparator += tmpVersion[i];
                    } else {
                        break;
                    }
                }

                return comparator;
            }();
            // Get raw the version
            rawVersionNumber = function() {
                var ver = '',
                    i = 0;
                for (i; i < tmpVersion.length; i++) {
                    if (!isNaN(tmpVersion[i])) {
                        ver += tmpVersion[i];
                    }
                }
                return ver;
            }();

            // First let's check to make sure we even have the module
            if (modules[module]) {
            } else {
                error = "Could not find module " + module;
                throw error;
            }
        }

        /**
         * Determines if versions are greater than (equals), less than (equals), or the same (1.0.0 == 1.0.0.0)
         *
         * @param   String  version;        Version number (1.0.0)
         * @param   String  compareVersion; Version number (1.0.0)
         * @param   String  comparison
         */
        var compareVersions = function(version, compareVersion, comparison) {
            if (comparison) {
                switch (comparison) {
                    case '>=' :

                        break;
                    case '>' :

                        break;
                    case '=' :
                    case '==':

                        break;
                    case '<=':

                        break;
                    case '<':

                        break;
                }
            }
        }

        var installModuleScripts = function(module) {

        }

        this.initRoutes = function(modules, Hype, app) {
            _(Modules).each(function(module) {
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
        }
    };

    return new Initializer();
    // return {
    //     init: function(modules, Hype, app) {
    //         initModels(modules, Hype);
    //         initScripts(modules, Hype);
    //         initRoutes(modules, Hype, app);
    //     }
    // };
};