/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Email
 * @version     0.0.1.0
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

 module.exports = {
    menu: {
    	customer: {
    		label: "Customers",
            sort: 30,
            tags: [
                "manage", "customers", "attributes"
            ],
    		icon: "\f118", // fa-smile-o (could also be an image)
    		url: "/customers",
    	},
        configuration: {
            children: {
                email: {
                    label: "Email Templates",
                    tags: [
                        "email", "transactional", "templates"
                    ],
                    sort: 200,
                    icon: "\f0e3",
                    url: "/configuration/email"
                }
            }
        }
    }
};