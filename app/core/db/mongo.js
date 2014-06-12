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

// Load necessary modules/files
var	mongoose = require('mongoose');

exports.connect = function(host, username, password, dbname) {
	console.log("Connecting to MongoDB on %s/%s", host, dbname);
	mongoose.connect('mongodb://' + host + '/' + dbname);
};

exports.schemas = [];
exports.models = [];