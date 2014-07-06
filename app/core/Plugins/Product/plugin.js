module.exports = {
    name: 'Product',
    enabled: false,
    depends: {
        'core': '>=1.0.0.0'
    },
    main: require('./lib/product'),
    models: require('./lib/models'),
    routes: require('./lib/routes'),
    scripts: './lib/scripts',   // @kurt - auto-assume this will always be a folder, or should we write
                                // something like scripts: './lib/scripts/*' ? - it's assuming right now
    version: '0.0.0.1'
};
