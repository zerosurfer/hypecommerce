/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		0.0.1.0
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

var HypeAdmin,
	path = require('path');

 module.exports = function(Hype) {
 	HypeAdmin = function() {
 		var _menu = {};

 		this.addMenu = function(menu) {
 			// sort the menu right away
 			this._menu = this.sortMenu(menu);
 		},

 		this.sortMenu = function(elements) {
 			var sortable = [],
                sortedElements = {},
                level = 0,
                elem,
                key,
                position,
                value,
                e,
                i;

            // Get the sort values
            for (e in elements) {
                elem = elements[e];

                // Check for children
                if (elem.children !== undefined) {
                    elem.children = this.sortMenu(elem.children);
                }

                if (elem.sort === undefined) {
                    elem.sort = 9999;
                }

                sortable.push([e, elem.sort]);
            }

            // Sort the level
            sortable.sort(function(a, b) { 
                return a[1] - b[1];
            });

            // Rebuild the elements object
            for(i = 0; i < sortable.length; i++) {
                value = sortable[i];
                position = value[1];
                key = value[0];
                sortedElements[key] = elements[key];
            }

            return sortedElements;
 		},

 		/**
 		 * Check if we're logged in
 		 *
 		 * @return boolean
 		 */
 		this.requiredAuth = function() {
 			return true;
 		},

 		this.index = function(req, res) {
 			res.render(path.resolve('app/admin/index.html'));
 		},

 		this.login = function(req, res) {

 		},

 		this.loginPost = function(req, res) {

 		}

 		return this;
 	}

 	return new HypeAdmin();
 }