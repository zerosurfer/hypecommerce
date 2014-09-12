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
    events = require('events'),
    emitter = new events.EventEmitter();

module.exports = function(Hype) {
    "use strict";

    var HypePlugin = function() {
    };

    HypePlugin.prototype.extend = function(obj) {
        this = _.extend(this, obj);
        return this;
    };

    HypePlugin.prototype.create = function(Model, options) {
        var lcModelName = Model.modelName.toLowerCase(),
            model = new Model(options);

        model.save(function(err) {
            if (!err) {
                Hype.notify('hype.' + lcModelName + '.created', Model);
            }
        });
    };

    HypePlugin.prototype.remove = function(Model, options) {
        var lcModelName = Model.modelName.toLowerCase(),
            model = new Model(options);

        model.remove(function(err) {
            if (!err) {
                Hype.notify('hype.' + lcModelName + '.removed');
            }
        });
    };

    HypePlugin.prototype.save = function(Model, options) {
        var lcModelName = Model.modelName.toLowerCase(),
            model = new Model(options);

        model.save(function(err) {
            if (!err) {
                Hype.notify('hype.' + lcModelName + '.saved', Model);
            }
        });
    };

    return HypePlugin;
};