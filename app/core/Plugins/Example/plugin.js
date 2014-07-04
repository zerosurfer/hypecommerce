module.exports = {
    name: 'Category',
    enabled: false,
    depends: {
        'core': '>=1.0.0.0'
    },
    creator = require('./lib/example'),
    models = require('./lib/models'),
    routes = require('./lib/routes'),
    scripts = require('./lib/scripts'),
    version = '0.0.0.1'
};
