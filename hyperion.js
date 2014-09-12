#!/usr/bin/env node
/**
 * commander CLI
 *
 * @package		Hype
 * @version		0.0.1
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

var _ = require('underscore'),
	commander = require('commander'),
	Hyperion = require('./app/core/Hype/Hyperion.js')(commander);

// Start the process
Hyperion.init();

// Process the arguments
Hyperion.process();