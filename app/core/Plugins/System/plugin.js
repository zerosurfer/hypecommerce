/**
 * Hype Commerce
 *
 * @package		Hype
 * @module		System
 * @version		1.0.0
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

module.exports = {
    name: 'System',
    enabled: true,
    version: '1.0.0',
    description: 'Core system controls',
    author: 'Thomas Lackemann',
    copyright: '2014',
    image: __dirname + '/lib/icon.jpg',
    license: 'MIT',
    depends: {
        'System': '>=1.0.0'
    },
    main: require('./lib/system'),
    models: require('./lib/models'),
    // routes: require('./lib/routes'),
    // scripts: './lib/install'
};