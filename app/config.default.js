/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		1.0.0
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */
 
module.exports = {
	version: "1.0.0",
	environment: "setup",
	log: true,
	debug: true,
	setup: {
		server: {
			type: 'express',
			express: {
				url: "http://localhost",
				port: 4973, // "HYPE" on a phone keypad =)
				nodes: 2, // for clustering
				theme: "ractive" // theme is specific, since we're frontend agnostic, who says we even need one
				// express options should go here
			}
		}
	}
}