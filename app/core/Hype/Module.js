/**
 * Hype Commerce
 *
 * @package     Hype
 * @version     0.0.1
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

var _ = require('underscore'),
    crypto = require('crypto'),
    fs = require('fs'),
    path = require('path');

module.exports = function(Hype) {
    "use strict";

    /**
     * Core Module class
     *
     * @constructor
     * @param {string} name Name of the module
     * @param {HypePlugin} plugin A copy of the instantiated HypePlugin object
     * @param {object} config The configuration file for the particular module
     * @param {string} filepath A full path to the location of the module
     * @return {HypeModule}
     */
    var HypeModule = function(name, plugin, config, filepath) {
        this.name = name;
        this.models = (config.models) ? config.models : undefined;
        this.routes = (config.routes) ? config.routes : undefined;
        this.scripts = (config.scripts) ? config.scripts : undefined;
        this.instance = undefined;
        this._started = false;
        this._enabled = config.enabled || false;
        this.creator = config.main;
        this.routes = config.routes;
        this.version = config.version;
        this.filepath = filepath;
        this.plugin = plugin;
        this.cron = config.cron;
        this.depends = config.depends;
        this.admin = (config.admin) ? config.admin : undefined;

        return this;
    };

    HypeModule.prototype.start = function() {
        var md5Hash = crypto.createHash('md5');
        this.id = md5Hash.update(this.getData()).digest('hex');
        this._started = true;
    };

    HypeModule.prototype.init = function(Hype) {
        return this.creator(this.plugin, Hype, _);
    }

    HypeModule.prototype.stop = function() {
        this.instance = undefined;
        this._started = false
    };

    HypeModule.prototype.enable = function() {
        this._enabled = true;
    };

    HypeModule.prototype.disable = function() {
        this._enabled = false;
        this.stop();
    };

    HypeModule.prototype.getData = function(data) {
        if (data === undefined) {
            return JSON.stringify(this);
        }

        return this[data];
    }

    HypeModule.prototype.install = function(Hype, Db) {
        var folderPath = path.resolve(this.filepath + '/' + this.scripts),
            files,
            self = this,
            fileVersion,
            dbVersion,
            installModel = Db.getModel('Install'),
            configVersion;

        var getLatestVersion = function(arr) {
            var version,
                versions = [];
            if (arr.length > 0) {
                for(var i = 0; i < arr.length; i++) {
                    // format version
                    versions.push(arr[i].replace(/\./g, '').replace('js', ''));
                }

                versions = versions.sort(function compare(a, b) {
                    if (a < b)
                        return 1;
                    if (a >= b)
                        return -1;

                    return 0;
                });
            } else {
                versions[0] = 0;
            }

            return versions[0];
        }
        /**
         * @todo -  The below needs to be majorly refactored, it's currently heavily based on MongoDb
         *          We need a sane way to handle the installing of modules and their "tables". This 
         *          should mostly be handled by the Database adapter (./Database.js)
         */
        var determineInstallAction = function(fileVersion, dbVersion, configVersion) {
            var installFile;
            if (dbVersion == configVersion) {
                Hype.debug("Nothing to install for " + self.name);
                Hype.notify('hype.module.install');
            }

            // Install if the dbVersion is less than our configVersion
            if (dbVersion < configVersion || dbVersion > configVersion) {

                fs.readdir(folderPath, function(err, files) {
                    var scriptFileVersion,
                        rFiles = files.reverse(),
                        upgradeDowngrade = false;
                    // Reading files

                    Hype.debug("Checking upgrades on " + self.name);
                    for(var f in files) {
                        scriptFileVersion = getLatestVersion([files[f]]);

                        // Check for an upgrade
                        if (dbVersion < configVersion && scriptFileVersion <= configVersion && scriptFileVersion > dbVersion) {
                            Hype.debug("Installing file " + files[f]);
                            installFile = require(folderPath + '/' + files[f])(Hype);
                            installFile.up();
                            // Flag as upgraded
                            upgradeDowngrade = true;
                        }
                    }

                    if (!upgradeDowngrade) {
                        Hype.debug("Checking downgrades on " + self.name);
                        for(var f in files) {
                            scriptFileVersion = getLatestVersion([files[f]]);

                            // Check for a downgrade
                            if (dbVersion > configVersion && scriptFileVersion > configVersion) {
                                Hype.debug("Uninstalling file " + files[f]);
                                installFile = require(folderPath + '/' + files[f])(Hype);
                                installFile.down();
                            }
                        }
                    }
                });

                installModel.findOneAndUpdate(
                     { 'module' : self.name },
                     { 'version': self.version },
                     { 'upsert': true },
                     function(err, doc) {
                        Hype.notify('hype.module.install', doc);
                         // executed query
                     }
                 );
            }
        }

        // Check for new installations
        if (this.scripts) {
            // Get the latest version
            Hype.debug("Checking updates for " + this.name + " v" + this.version);

            //Check latest file version
            files = fs.readdirSync(folderPath);
            fileVersion = getLatestVersion(files);

            // Config version
            configVersion = getLatestVersion([this.version]);

            // @todo - This is mongo right now, we need it to be universal to the Db
            installModel.find({ 'module': this.name }, function(err, settings) {
                dbVersion = (settings[0]) ? getLatestVersion([settings[0].version]) : 0;
                // Attempt to install the module based on the fileVersion, dbVersion, and configVersion
                determineInstallAction(fileVersion, dbVersion, configVersion);
            });
        } else {
            Hype.notify('hype.module.install');
        }
    }

    HypeModule.prototype.addRoute = function(Hype, Server) {
        var route,
            action;
        for (route in this.routes) {
            
            // We have our route, let's add all the necessary events
            for (action in this.routes[route]) {
                Hype.log('Adding route ' + action.toUpperCase() + ' ' + route);
            }
        }
    }

    HypeModule.prototype.is = function(flag) {
        return this['_' + flag];
    };

    return HypeModule;
};