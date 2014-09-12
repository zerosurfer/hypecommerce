/**
 * Hype Commerce
 *
 * @package		Hype
 * @module		Cms
 * @version		0.0.1
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

module.exports = {
    menu: {
    	cms: {
    		label: "Cms",
            sort: 60,
    		icon: "\f0c5",
    		url: "/cms",
    		children: {
    			cms: {
		    		label: "Blocks",
		            sort: 100,
		    		icon: "\f009",
		    		url: "/cms/blocks"
		    	},
    			pages: {
		    		label: "Pages",
		            sort: 120,
		    		icon: "\f15c",
		    		url: "/cms/pages",
		    		children: {}, // require file to return a list of pages
		    	},
    			sliders: {
		    		label: "Sliders",
		            sort: 110,
		    		icon: "\f04b",
		    		url: "/cms/blocks"
		    	}
    		}
    	}
    }
};