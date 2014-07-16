module.exports = {
    name: 'Customer',
    enabled: true,
    depends: {
        'core': '>=1.0.0.0'
    },
    main: require('./lib/customer'),
    models: require('./lib/models'),
    //routes: require('./lib/routes'),
    scripts: './lib/install',
    admin: {
        routes: require('./lib/admin/routes')
    },
    version: '0.0.0.1'
};
