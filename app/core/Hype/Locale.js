/**
 * Hype Commerce
 *
 * @package     Hype
 * @version     0.0.1
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

var Locale,
	i18n = require('i18next');

module.exports = function(Hype) {
	"use strict";
	
	/**
     * Core Locale class
     *
     * @constructor
     * @return {Locale}
     */
	Locale = function() {
		i18n.init();
		i18n.setLng('en-US', function(t) {
			/* loading done */
		});
 	}

 	return new Locale();
}