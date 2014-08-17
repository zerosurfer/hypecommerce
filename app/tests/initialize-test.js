var vows = require('vows'),
    assert = require('assert'),
    Hype = require('../core/Hype');

// Create a Test Suite
vows.describe('Initial Hype object').addBatch({
    'when logging statically': {
        topic: function () {
            return true;
        },

        'we get a log message': function (topic) {
            assert.equal(topic, true);
        }
    }
}).exportTo(module); // Run it