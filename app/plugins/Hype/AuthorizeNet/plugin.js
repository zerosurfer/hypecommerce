/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      AuthorizeNet
 * @version     1.0.0
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

module.exports = {
    name: 'AuthorizeNet',
    enabled: true,
    version: '1.0.0',
    description: 'Authorize.net payment gateway integration',
    author: 'Thomas Lackemann',
    copyright: '2014',
    image: __dirname + '/lib/icon.jpg',
    license: 'MIT',
    depends: {
        'System': '>=1.0.0'
    },
    main: require('./lib/authorizenet'),
    // models: require('./lib/models'),
    // routes: require('./lib/routes'),
    // scripts: './lib/install'
};