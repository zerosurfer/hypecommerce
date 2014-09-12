/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Customer
 * @version     0.0.1
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

module.exports = {
    name: 'Customer',
    enabled: true,
    version: '0.0.1',
    description: 'Customer and customer groups',
    author: 'Thomas Lackemann',
    copyright: '2014',
    image: __dirname + '/lib/icon.jpg',
    license: 'MIT',
    depends: {
        'System': '>=0.0.1'
    },
    main: require('./lib/customer'),
    models: require('./lib/models'),
    routes: require('./lib/routes'),
    scripts: './lib/install'
};