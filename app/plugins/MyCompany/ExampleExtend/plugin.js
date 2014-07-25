module.exports = {
    name: 'ExampleExtend',
    
    // This is all optional meta data used for module reading
    description: 'An example module to see how extending models behaves',
    author: 'Thomas Lackemann',
    copyright: '2015',
    image: __dirname + '/lib/icon.jpg',
    license: 'MIT',

    enabled: true,
    depends: {
        'core': '>=1.0.0.0'
    },
    main: require('./lib/extend'),
    models: require('./lib/models'),
    //routes: require('./lib/routes'),
    //scripts: './lib/install',   // @kurt - auto-assume this will always be a folder, or should we write
                                // something like scripts: './lib/scripts/*' ? - it's assuming right now
    version: '0.0.0.1'
};
