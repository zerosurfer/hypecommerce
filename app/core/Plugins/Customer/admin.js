/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		0.0.1.0
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

module.exports = {
    routes: require("./lib/admin/routes"),
    widgets: "./lib/admin/widgets",
    menu: {
    	customer: {
    		label: "Customers",
    		icon: "\f118", // fa-smile-o (could also be an image)
    		url: "/customers",
    		// children: {
    			
    		// }
    	}
    }
};
