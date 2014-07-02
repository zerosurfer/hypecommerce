var underscore = require('underscore');

module.exports = function(Hype) {
    "use strict";

    var HypeModule = function(fn, plugin, config) {
        this.id = 'somerandomstring'; // @todo: update to use real id generation
        this._enabled = config.enabled || false;
        this.models = config.models;
        this.controllers = config.controllers;
        this.instance = undefined;
        this._started = false;
        this.plugin = plugin;

        return this;
    };

    HypeModule.prototype.start = function() {
        this.instance = fn(this.plugin, Hype, _);
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

    HypeModule.prototype.isStarted = function() {
        return this._started;
    };

    HypeModule.prototype.isEnabled = function() {
        return this._enabled;
    };

    return HypeModule;
};