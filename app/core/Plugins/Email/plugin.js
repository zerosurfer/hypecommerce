/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Email
 * @version     0.0.1.0
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

module.exports = {
    name: 'Email',
    description: 'Email templates',
    author: 'Thomas Lackemann',
    copyright: '2015',
    image: __dirname + '/lib/icon.jpg',
    license: 'MIT',
    enabled: true,
    depends: {
        'core': '>=1.0.0.0'
    },
    main: require('./lib/email'),
    version: '0.0.0.1'
};
