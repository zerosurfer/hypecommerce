/**
 * Base helper
 *
 *
 */
var Helper;

Helper = function() {
}

/**
 * Diff an array
 * @param array a
 * @param array b
 */
Helper.prototype.arrDiff = function(a, b) {
    return a.filter(function(i) { return b.indexOf(i) < 0; });
};

/**
 * Diff an object
 * @param array a
 * @param array b
 */
Helper.prototype.objDiff = function(a, b) {
	
}

module.exports = new Helper();