/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Review
 * @version     0.0.1
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

module.exports = {
    menu: {
    	configuration: {
            children: {
        		admin: {
                    label: "Admin",
                    tags: [
                        "admin", "users", "groups", "permissions", "access", "control"
                    ],
                    sort: 100,
                    icon: "\f023",
                    url: "/configuration/admin"
                }
            }
    	}
    }
};