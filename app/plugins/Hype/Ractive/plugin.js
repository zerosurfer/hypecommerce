/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Ractive
 * @version     0.0.1
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

module.exports = {
    name: 'Ractive',
    description: 'Default theme for Hype Commerce, plugin allows you to control the different appearance items',
    author: 'Thomas Lackemann',
    copyright: '2015',
    image: __dirname + '/lib/icon.jpg',
    license: 'MIT',
    enabled: true,
    depends: {
        'System': '>=0.0.1'
    },
    main: require('./lib/ractive'),
    version: '0.0.0.1'
};
