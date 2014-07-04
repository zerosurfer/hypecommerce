module.exports = function() {
    this.name = 'Category',
    this.enabled = false,
    this.depends = {
        'core': '>=1.0.0.0'
    },
    this.creator = require('./lib/example'),
    this.models = require('./lib/models'),
    this.routes = require('./lib/routes'),
    this.scripts = require('./lib/scripts'),
    this.version = '0.0.0.1'
};
