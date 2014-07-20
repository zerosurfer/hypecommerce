/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Customer
 * @version     0.0.1.0
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

module.exports = {
    name: 'Customer',
    enabled: true,
    depends: {
        'core': '>=1.0.0.0'
    },
    main: require('./lib/customer'),
    models: require('./lib/models'),
    //routes: require('./lib/routes'),
    scripts: './lib/install',
    version: '0.0.0.1'
};
