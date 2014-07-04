var underscore = require('underscore');

module.exports = function(Hype) {
    "use strict";

    var HypeModule = function(plugin, config) {
        this.id = 'somerandomstring'; // @todo: update to use real id generation
        this._enabled = config.enabled || false;
        this.models = (config.models) ? config.models : undefined;
        this.routes = (config.routes) ? config.routes : undefined;
        this.scripts = (config.scripts) ? config.scripts : undefined;
        this.instance = undefined;
        this._started = false;
        this.creator = config.creator;
        this.plugin = plugin;
        this.version = config.version;

        return this;
    };

    HypeModule.prototype.start = function() {
        this.instance = this.creator(this.plugin, Hype, _);
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

    HypeModule.prototype.is = function(flag) {
        return this['_' + flag];
    };

    return HypeModule;
};