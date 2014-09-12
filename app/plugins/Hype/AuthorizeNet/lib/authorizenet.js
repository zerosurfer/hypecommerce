/**
 * Hype Commerce
 *
 * @package		Hype
 * @module		AuthorizeNet
 * @version		0.0.1
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

module.exports = function(Example, Hype, _) {
    var privateFunc = function() {
        return 'is real';
    };

    Example.publicFunc = function() {
        return 'The Hype ' + privateFunc();
    };

    return Example;
};