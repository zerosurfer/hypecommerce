/**
 * Hype Commerce
 *
 * @package		Hype
 * @module		VAT
 * @version		0.0.1
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

module.exports = function(VAT, Hype, _) {
    var privateFunc = function() {
        return 'is real';
    };

    VAT.publicFunc = function() {
        return 'The Hype ' + privateFunc();
    };

    return VAT;
};