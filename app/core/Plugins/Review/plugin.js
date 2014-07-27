/**
 * Hype Commerce
 *
 * @package		Hype
 * @module		Review
 * @version		0.0.1.0
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

module.exports = {
    name: 'Review',
    description: 'Product reviews and ratings',
    author: 'Thomas Lackemann',
    copyright: '2014',
    image: __dirname + '/lib/icon.jpg',
    license: 'MIT',
    enabled: true,
    depends: {
        'core': '>=1.0.0.0'
    },
    main: require('./lib/review'),
    //models: require('./lib/models'),
    version: '0.0.0.1'
};
