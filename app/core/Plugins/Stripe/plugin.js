/**
 * Hype Commerce
 *
 * @package		Hype
 * @module		Stripe
 * @version		1.0.0
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

module.exports = {
    name: 'Stripe',
    enabled: true,
    version: '1.0.0',
    description: 'Stripe payment gateway integration',
    author: 'Thomas Lackemann',
    copyright: '2014',
    image: __dirname + '/lib/icon.jpg',
    license: 'MIT',
    depends: {
        'Core': '>=1.0.0'
    },
    main: require('./lib/stripe'),
    // models: require('./lib/models'),
    // routes: require('./lib/routes'),
    // scripts: './lib/install'
};