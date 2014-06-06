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
 * @version		0.0.1.0
 * @author		Hype Commerce Team <team@hypecommerce.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypecommerce.com/)
 * @license		http://www.hypecommerce.com/license
 */

(function() {
	var simple = require("../components/simple/routes.js"),
		middlewarize = require("../libs/APICreator.js"),
		Users = require("../components/users/index.js"),
		RestfulAuth = require("../components/restfulauth/index.js");

	module.exports = {
		load: function(app, hype, modules, dbs) {
			var users = Users.init(dbs["sampleUsers"]),
				restfulauth = RestfulAuth.init(users);

			users.api = middlewarize.createAPI(users);

			// app.post("/api/auth", [restfulauth], dummy.ok);
			app.post("/createUser", users.api.create);
			app.get("/createUser", users.api.create);
			app.get("/readUser", users.api.read);
			app.get("/updateUser", users.api.update);
			app.get("/deleteUser", users.api.del);
			app.get("/listUsers", users.api.list);
			app.get("/hello", simple.helloWorld);

			// Determine enabled modules
			var activeModules = [];
			for (var i in modules) {
				var mod = modules[i];
				if (mod.enabled !== undefined && mod.enabled === true) {
					activeModules[i] = mod;
				}
			}

			// Load the active modules
			for (var mod in activeModules) {
				var data = activeModules[mod];
				var loadedMod = require('./code/' + data.package + '/' + mod + '/config.js');
				loadedMod.load();
			}
		}
	};
}());