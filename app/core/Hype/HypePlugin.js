var _ = require('underscore');

var HypePlugin = function() {
    this.name = undefined;
    this.id = undefined; // should be random string, if no name, name should be string as well
    this.version = undefined;
    this.enabled = false;
    this.depends = {};
    this.models = {};
    this.routes = {};
    this.scripts = {};

    /**
     * @todo: maybe add more global plugin helpers like extension methods etc...???
     */
    return this;
};

HypePlugin.prototype.extend = function(obj) {
    this = _.extend(this, obj);
    return this;
};

module.exports = HypePlugin;