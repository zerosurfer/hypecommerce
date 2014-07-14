module.exports = {
    name: 'Admin',
    enabled: true,
    depends: {
        'core': '>=1.0.0.0'
    },
    main: require('./lib/admin'),
    models: require('./lib/models'),
    //routes: require('./lib/routes'),
    //scripts: './lib/install',
    version: '0.0.0.1'
};
