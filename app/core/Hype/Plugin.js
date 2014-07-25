/**
 * Hype Commerce
 *
 * @package     Hype
 * @version     0.0.1.0
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */
 
var _ = require('underscore')
    events = require('events'),
    emitter = new events.EventEmitter();

module.exports = function(Hype) {
    "use strict";

    var HypePlugin = function() {};

    HypePlugin.prototype.extend = function(obj) {
        this = _.extend(this, obj);
        return this;
    };

    HypePlugin.prototype.listen = function(event, callback) {
        emitter.on(event, callback);
    };


    HypePlugin.prototype.notify = function(event, arg) {
        emitter.emit(event, arg);
    }

    return HypePlugin;
};