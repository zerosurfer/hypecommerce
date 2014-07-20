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

        help: {
            label: "Help",
            sort: 900,
            icon: "\f0e4",
            url: "/help"
        },

        reports: {
            label: "Reports",
            sort: 120,
            icon: "\f080",
            url: "/reports"
        },

        developer: {
            label: "Developer Mode",
            sort: 0,
            icon: "\f188",
            url: "/developer",
            class: "list-group-item-danger",
            visible: true, // should load a model to determine if we're in "Developer Mode" or not
        },

        plugins: {
            label: "Plugins",
            sort: 150,
            icon: "\f0e7",
            url: "/plugins",
            children: {
                manage: {
                    label: "Manage Plugins",
                    sort: 100,
                    icon: "\f141",
                    url: "/plugins/manage"
                },
                find: {
                    label: "Find New Plugins",
                    sort: 100,
                    icon: "\f0ed",
                    url: "/plugins/find"
                }
            }
        },

        configuration: {
            label: "Configuration",
            sort: 150,
            icon: "\f0ad",
            url: "/configuration",
            children: {
                admin: {
                    label: "Admin",
                    sort: 100,
                    icon: "\f023",
                    url: "/configuration/admin"
                },
                security: {
                    label: "Security",
                    sort: 200,
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