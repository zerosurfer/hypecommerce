/**
 * Hype Commerce
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Hype Commerce Creative Commons License that is bundled with
 * this package in the file LICENSE.txt. It is also available through the world-wide-web at this
 * URL {@link http://www.hypecommerce.com/license}. If you did not receive a copy of the license
 * and are unable to obtain it through the world-wide-web, please send an email to
 * {@link mailto:license@hypecommerce.com} so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Hype Commerce to newer versions in the
 * future. If you wish to customize Hype Commerce for your needs please refer to
 * {@link http://www.hypecommerce.com/} for more information.
 *
 * @package		Hype
 * @version		0.0.1.0
 * @author		Hype Commerce Team <team@hypecommerce.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypecommerce.com/)
 * @license		http://www.hypecommerce.com/license
 */

// Load libraries
var	fs      = require('fs'),
    url     = require('url'),
    when    = require('when'),

// Define variables
    config;

exports.loadConfiguration = function() {
	// Promise we'll finish
	var loaded = when.defer();

	fs.exists("app/core/config.js", function checkConfiguration(fileExists) {
		if (fileExists) {
			// We should do some preloading here
			config = require('./config');
			console.log(config);
			loaded.resolve();
		} else {
			// @todo GUI Installer
			// In the meantime, wah wah wah
			loaded.reject();
		}
	});

    // Fufill the promise
    return loaded.promise;
};