/**
 * Hype Commerce
 *
 * @package		Hype
 * @module		System
 * @version		0.0.1.0
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

module.exports = {
    menu: {
    	dashboard: {
    		label: "Dashboard",
            sort: 10,
    		icon: "\f0e4",
    		url: "/dashboard"
    	},

        configuration: {
            label: "Configuration",
            sort: 150,
            icon: "\f0ad",
            url: "/configuration",
            children: {
                security: {
                    label: "Security",
                    sort: 100,
                    icon: "\f0e3",
                    url: "/configuration/security"
                },
                developer: {
                    label: "Developer",
                    sort: 110,
                    icon: "\f188",
                    url: "/configuration/developer"
                },
                languages: {
                    label: "Languages",
                    sort: 120,
                    icon: "\f0ac",
                    url: "/configuration/languages"
                },
                stores: {
                    label: "Manage Stores",
                    sort: 130,
                    icon: "\f11e",
                    url: "/configuration/stores"
                },
                system: {
                    label: "System Settings",
                    sort: 140,
                    icon: "\f085",
                    url: "/configuration/system"
                },
            }
        }
    }
};