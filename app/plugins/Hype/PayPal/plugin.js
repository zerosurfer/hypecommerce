/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      PayPal
 * @version     0.0.1
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

module.exports = {
    name: 'PayPal',
    enabled: true,
    version: '0.0.1',
    description: 'PayPal gateway integration',
    author: 'Thomas Lackemann',
    copyright: '2014',
    image: __dirname + '/lib/icon.jpg',
    license: 'MIT',
    depends: {
        'System': '>=0.0.1'
    },
    main: require('./lib/paypal'),
    // models: require('./lib/models'),
    // routes: require('./lib/routes'),
    // scripts: './lib/install'
};