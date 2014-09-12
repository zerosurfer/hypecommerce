/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Product
 * @version     0.0.1
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

module.exports = {
    name: 'Product',
    enabled: true,
    version: '0.0.1',
    description: 'Simple, combined (grouped), virtual, and configurable products',
    author: 'Thomas Lackemann',
    copyright: '2014',
    image: __dirname + '/lib/icon.jpg',
    license: 'MIT',
    depends: {
        'System': '>=0.0.1',
        'Store': '>=0.0.1',
        'Media': '>=0.0.1',
        'Customer': '>=0.0.1',
        'Category': '>=0.0.1'
    },
    main: require('./lib/product'),
    models: require('./lib/models'),
    // routes: require('./lib/routes'),
    scripts: './lib/scripts'
};