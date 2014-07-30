/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Media
 * @version     1.0.0
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

module.exports = {
    name: 'Media',
    enabled: true,
    version: '1.0.0',
    description: 'File and video media',
    author: 'Thomas Lackemann',
    copyright: '2014',
    image: __dirname + '/lib/icon.jpg',
    license: 'MIT',
    depends: {
        'Core': '>=1.0.0'
    },
    main: require('./lib/media'),
    models: require('./lib/models'),
    // routes: require('./lib/routes'),
    scripts: './lib/install'
};