/**
 * Hype Commerce
 *
 * @package		Hype
 * @module		Product
 * @version		0.0.1.0
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

module.exports = {
    menu: {
    	product: {
    		label: "Products",
            sort: 40,
    		icon: "\f069",
    		url: "/products"
    	},

        // Extending the configuration menu
        configuration: {
            children: {
                productAttributes: {
                    label: "Product Attributes",
                    sort: 120,
                    icon: "\f02c",
                    url: "/product/attributes"
                },
            }
        }
    }
};