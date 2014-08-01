/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Product
 * @version     1.0.0
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

module.exports = {
    name: 'Product',
    enabled: true,
    version: '1.0.0',
    description: 'Simple, combined (grouped), virtual, and configurable products',
    author: 'Thomas Lackemann',
    copyright: '2014',
    image: __dirname + '/lib/icon.jpg',
    license: 'MIT',
    depends: {
        'System': '>=1.0.0',
        'Store': '>=1.0.0',
        'Media': '>=1.0.0',
        'Customer': '>=1.0.0',
        'Category': '>=1.0.0'
    },
    main: require('./lib/product'),
    models: require('./lib/models'),
    // routes: require('./lib/routes'),
    scripts: './lib/scripts'
};