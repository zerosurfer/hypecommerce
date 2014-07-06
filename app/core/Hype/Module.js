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
    crypto = require('crypto'),
    fs = require('fs'),
    path = require('path');

module.exports = function(Hype) {
    "use strict";

    var HypeModule = function(name, plugin, config, filepath) {
        this.name = name;
        this._enabled = config.enabled || false;
        this.models = (config.models) ? config.models : undefined;
        this.filepath = filepath;
        this.routes = (config.routes) ? config.routes : undefined;
        this.scripts = (config.scripts) ? config.scripts : undefined;
        this.instance = undefined;
        this._started = false;
        this.creator = config.main;
        this.plugin = plugin;
        this.version = config.version;

        return this;
    };

    HypeModule.prototype.start = function() {
        var md5Hash = crypto.createHash('md5');
        this.instance = this.creator(this.plugin, Hype, _);
        
        // Assign an id
        this.id = md5Hash.update(this.getData()).digest('hex');

        this._started = true;
    };

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

    HypeModule.prototype.install = function() {
        var folderPath = path.resolve(this.filepath + '/' + this.scripts),
            files,
            fileVersions,
            dbVersion,
            installModel;

        var getLatestVersion = function(arr) {
            var version,
                versions = [];
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

            return versions[0];
        }

        // Check for new installations
        if (this.scripts) {
            // Get the latest version
            Hype.log("Checking updates for " + this.name + " v" + this.version);
            //Check latest file version
            Hype.debug("Checking latest scripts in " + folderPath);
            files = fs.readdirSync(folderPath);
            console.log(getLatestVersion(files));

            // Check latest db version
            Hype.debug("Checking latest version in database");
            installModel = Hype.dba.getModel('Install');

            // @todo - Running into an async problem right here, will need to fix
            installModel.find({ 'module': this.name }, function(err, settings) { 
                console.log(settings);
                // If we don't have anything here but we have files to 
            });
        }
    }

    HypeModule.prototype.is = function(flag) {
        return this['_' + flag];
    };

    return HypeModule;
};