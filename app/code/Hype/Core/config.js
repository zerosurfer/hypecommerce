/**
 * Hype Commerce
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Hype Commerce Creative Commons License that is bundled with
 * this package in the file LICENSE.txt. It is also available through the world-wide-web at this
 * URL {@link http://www.hypecommerce.com/license}. If you did not receive a copy of the license
 * and are unable to obtain it through the world-wide-web, please send an email to
 * {@link mailto:license@hypecommerce.com} so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Hype Commerce to newer versions in the
 * future. If you wish to customize Hype Commerce for your needs please refer to
 * {@link http://www.hypecommerce.com/} for more information.
 *
 * @package		Hype
 * @category	Core
 * @version		1.0.0.0
 * @author		Hype Commerce Team <team@hypecommerce.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypecommerce.com/)
 * @license		http://www.hypecommerce.com/license
 */

(function() {
	// Define the frontname
	var frontname = "core";

	// Define controllers
	var controllers = {
		index: require("./controllers/index.js")
	}

	module.exports = {
		load: function(app, hype) {
			console.log('Core loaded');

			// Autoload the controller actions
			for (var controller in controllers) {
				for (var action in controllers[controller])
				{
					// Setup a fallback controller route
					if (controller === "index" && action === "index") {
						app.get("/" + frontname, controllers[controller][action]);
					}
					if (action === "index") {
						app.get("/" + frontname + "/" + controller, controllers[controller][action]);
					}
					app.get("/" + frontname + "/" + controller + "/" + action, controllers[controller][action]);
				}
			}
		}
	};
}());