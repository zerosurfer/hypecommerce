/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		0.0.1
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

var HypeError;

module.exports = function() {
	"use strict";
	
	/**
     * Core HypeError class
     *
     * @constructor
     * @return {HypeError}
     */
	HypeError = function(err) {

		this.message = err;

		return this.message;
	}

	return HypeError;
}