var vows = require('vows'),
    assert = require('assert'),
    Config = require('../config');
    Hype = require('../core/Hype')(Config);

// Create a Test Suite
vows.describe('Initial Hype object').addBatch({
    'when logging statically': {
        topic: function () {
            return Hype.log('This is a log message');
        },

        'we get a Hype object': function (topic) {
            assert.equal(topic, Hype);
        }
    }
}).exportTo(module); // Run it