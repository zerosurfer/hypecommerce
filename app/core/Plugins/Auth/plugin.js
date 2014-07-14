module.exports = function(Hype) {

    return {
        name: 'Auth',
        enabled: true,
        depends: {
            'core': '>=1.0.0.0'
        },
        main: require('./lib/auth.js'),
        //models: require('./lib/models'),
        routes: require('./lib/routes'),
        //scripts: './lib/install',   // @tom - from the way it looks like you are loading i would say its safe to force a folder here
                                    // it will help keep third party plugins in line and organized
        version: '0.0.0.1'
    };
};
