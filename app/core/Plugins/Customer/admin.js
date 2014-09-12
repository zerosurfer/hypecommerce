/**
 * Hype Commerce
 *
 * @package		Hype
 * @module		Customer
 * @version		0.0.1
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

module.exports = {
    // routes: require("./lib/admin/routes"),
    // widgets: "./lib/admin/widgets",
    // pages: "./lib/admin/pages",
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
                customerGroups: {
                    label: "Customer Groups",
                    tags: [
                        "groups", "permissions", "customer"
                    ],
                    sort: 200,
                    icon: "\f0e3",
                    url: "/customer/groups"
                },
                customerAttributes: {
                    label: "Customer Attributes",
                    tags: [
                        "groups", "attributes", "customer"
                    ],
                    sort: 200,
                    icon: "\f0e3",
                    url: "/customer/attributes"
                },
            }
        }
    }
};