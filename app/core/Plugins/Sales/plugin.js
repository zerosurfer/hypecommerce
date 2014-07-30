/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Sales
 * @version     1.0.0
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

module.exports = {
    name: 'Sales',
    enabled: true,
    version: '1.0.0',
    description: 'Orders, invoices, and returns',
    author: 'Thomas Lackemann',
    copyright: '2014',
    image: __dirname + '/lib/icon.jpg',
    license: 'MIT',
    depends: {
        'Core': '>=1.0.0'
    },
    main: require('./lib/sales'),
    models: require('./lib/models'),
    // routes: require('./lib/routes'),
    // scripts: './lib/install'
};