/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Cms
 * @version     1.0.0
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

module.exports = {
    name: 'Cms',
    enabled: true,
    version: '1.0.0',
    description: 'CMS Pages, static blocks, and sliders',
    author: 'Thomas Lackemann',
    copyright: '2014',
    image: __dirname + '/lib/icon.jpg',
    license: 'MIT',
    depends: {
        'Core': '>=1.0.0'
    },
    main: require('./lib/cms'),
    models: require('./lib/models'),
    // routes: require('./lib/routes'),
    // scripts: './lib/install'
};