module.exports = {
    name: 'System',
    enabled: true,
    depends: {
        'core': '>=1.0.0.0'
    },
    main: require('./lib/system'),
    models: require('./lib/models'),
    version: '0.0.0.1'
};
