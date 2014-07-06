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
    path = require('path');

module.exports = function(Hype) {
    "use strict";

    var HypeModule = function(plugin, config) {
        this._enabled = config.enabled || false;
        this.models = (config.models) ? config.models : undefined;
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

    HypeModule.prototype.is = function(flag) {
        return this['_' + flag];
    };

    return HypeModule;
};