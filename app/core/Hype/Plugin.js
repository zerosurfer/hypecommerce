var _ = require('underscore');

module.exports = function(Hype) {
    "use strict";

    var HypePlugin = function() {};

    HypePlugin.prototype.extend = function(obj) {
        this = _.extend(this, obj);
        return this;
    };

    HypePlugin.prototype.listen = function() {

    };

    HypePlugin.prototype.notify = function() {

    }

    return HypePlugin;
};