var vows = require('vows'),
    assert = require('assert');

// Create a Test Suite
vows.describe('Initial Hype object').addBatch({
    'when returning true': {
        topic: function () {
            return true;
        },

        'we get true': function (topic) {
            assert.equal(topic, true);
        }
    }
}).exportTo(module); // Run it