module.exports = {
    name: 'Cart',
    enabled: true,
    depends: {
        'Core': '>=1.0.0.0'
    },
    main: require('./lib/cart'),
    models: require('./lib/models'),
    //routes: require('./lib/routes'),
    scripts: './lib/install',   // @tom - from the way it looks like you are loading i would say its safe to force a folder here
                                // it will help keep third party plugins in line and organized
    version: '0.0.0.1'
};

/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Cart
 * @version     1.0.0
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

module.exports = {
    name: 'Cart',
    enabled: true,
    version: '1.0.0',
    description: 'Shopping cart',
    author: 'Thomas Lackemann',
    copyright: '2014',
    image: __dirname + '/lib/icon.jpg',
    license: 'MIT',
    depends: {
        'Core': '>=1.0.0',
        'Sales': '>=1.0.0'
    },
    main: require('./lib/cart'),
    models: require('./lib/models'),
    // routes: require('./lib/routes'),
    scripts: './lib/install'
};