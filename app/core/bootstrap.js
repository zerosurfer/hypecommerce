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

/**
* A NOTE ON Extending modules
*
* We load all hype modules first, then "rewrite" them using the local config.js files
*
* Example:
* Load hype/core/config.js - set all configuration necessary
* Load local/mymodule/config.js which contains something like:
*
*  core: {
*    api: {
*	    routes: {
*	      '/test' : {
*		    method: 'get',
*		      callback: function(request, response) {
*			    response.send(200, 'hi test');
*			  }
*		  }
*	    }
*    }
*  )
*
* This would overwrite the api route and do it's own thing - this is going to get rough with multiple extends, no?
* We'll need to find a sane way to deal with this
*/

// Load libraries
var	fs = require('fs'),
	url = require('url'),
	path = require('path'),
	express = require('express'),
	app = express(),
	server = require('./Server')(app),
	hype = require('./Hype')(app);

module.exports = (function() {
	"use strict";

	// Start it up
	hype.log('Signals clear for launch');

	hype.log('Loading core plugins');
	hype.loadPlugins('./core/Plugins');
	hype.log('Core plugins loaded');

	hype.log('Loading third party plugins');
	fs.readdirSync('./Plugins', function(file) {
		hype.loadPlugins('./Plugins/' + file);
	});
	hype.log('Third party plugins loaded');


	hype.log('Starting Hype');
	hype.start();

	hype.log('Starting server');
	server.start();
	hype.log('Hype is running. Enjoy!');
})();
