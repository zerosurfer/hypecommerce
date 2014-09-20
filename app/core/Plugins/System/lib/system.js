/**
 * Hype Commerce
 *
 * @package		Hype
 * @module		System
 * @version		0.0.1
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

module.exports = function(System, Hype, _) {
    var privateFunc = function() {
        return 'is real';
    };

    System.getStoreConfig = function(path, store) {
        return true;
    };

    return System;
};