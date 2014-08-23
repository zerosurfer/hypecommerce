/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Checkout
 * @version     1.0.0
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

module.exports = {
    name: 'Checkout',
    enabled: true,
    version: '1.0.0',
    description: 'Checkout process',
    author: 'Thomas Lackemann',
    copyright: '2014',
    image: __dirname + '/lib/icon.jpg',
    license: 'MIT',
    depends: {
        'System': '>=1.0.0',
        'Sales': '>=1.0.0',
        'Cart': '>=1.0.0'
    },
    main: require('./lib/checkout'),
    // models: require('./lib/models'),
    routes: require('./lib/routes'),
    // scripts: './lib/install'
};