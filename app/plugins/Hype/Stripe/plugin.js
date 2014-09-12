/**
 * Hype Commerce
 *
 * @package		Hype
 * @module		Stripe
 * @version		0.0.1
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

module.exports = {
    name: 'Stripe',
    enabled: true,
    version: '0.0.1',
    description: 'Stripe payment gateway integration',
    author: 'Thomas Lackemann',
    copyright: '2014',
    image: __dirname + '/lib/icon.jpg',
    license: 'MIT',
    depends: {
        'System': '>=0.0.1'
    },
    main: require('./lib/stripe'),
    // models: require('./lib/models'),
    // routes: require('./lib/routes'),
    // scripts: './lib/install'
};