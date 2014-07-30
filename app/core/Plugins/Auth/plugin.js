/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Auth
 * @version     1.0.0
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

module.exports = {
    name: 'Auth',
    enabled: true,
    version: '1.0.0',
    description: 'Core authentication',
    author: 'Kurtis Kemple',
    copyright: '2014',
    image: __dirname + '/lib/icon.jpg',
    license: 'MIT',
    depends: {
        'System': '>=1.0.0'
    },
    main: require('./lib/auth'),
    // models: require('./lib/models'),
    routes: require('./lib/routes'),
    // scripts: './lib/install'
};