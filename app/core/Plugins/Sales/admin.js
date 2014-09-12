/**
 * Hype Commerce
 *
 * @package		Hype
 * @module		Sales
 * @version		0.0.1
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

module.exports = {
    menu: {
    	orders: {
    		label: "Orders",
            sort: 20,
    		icon: "\f07a",
    		url: "/orders",
    		children: {
                today: {
                    label: "Today",
                    sort: 100,
                    url: "/orders/today",
                    alert: '' // require some model here to return the alert (ex: 10, for amount of orders placed today)
                },
                pending: {
                    label: "Pending",
                    sort: 101,
                    url: "/orders/pending",
                    alert: '' // require some model here to return the alert (ex: 10, for amount of orders pending)
                },
                shipped: {
                    label: "Shipped",
                    sort: 102,
                    url: "/orders/shipped",
                    alert: '' // require some model here to return the alert (ex: 10, for amount of orders shipped)
                },
                completed: {
                    label: "Completed",
                    sort: 103,
                    url: "/orders/completed",
                    alert: '' // require some model here to return the alert (ex: 10, for amount of orders completed)
                }
    		}
    	}
    }
};