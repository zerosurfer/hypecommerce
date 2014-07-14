/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		0.0.1.0
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */
 
var Installer,
	_ = require('underscore');

module.exports = function() {

	Installer = function(Hype) {
		// this.installScript = function() {
		// 	var self = this,
		// 		loaded = when.defer();

		// 	self.log("Checking for new installation scripts");

		// 	// Run the installer on a script
		// 	var installVersion = function(module, script, version) {
		// 		var Install = require(script);
		// 		var install = new Install(self);
		// 		// Run the script
		// 		if (typeof(install.up) !== undefined) {
		// 			install.up();

		// 			// Mark the db as updated

		// 			// Attempt to find something
		// 			var InstallSetting = self.models.setting;
		// 			InstallSetting.Db.findOneAndUpdate(
		// 				{ 'path' : "module/" + module + "/install" },
		// 				{ 'value': version.replace('.js', '') },
		// 				{ 'upsert': true },
		// 				function(err, doc) {
		// 					// executed query
		// 				}
		// 			);

		// 		}

		// 	}
		// 	// Run the uninstaller on a script
		// 	// @todo uninstall something when the version is lower
		// 	var uninstallVersion = function(script) {
		// 		var Install = require(script);
		// 		var install = new Install();

		// 		if (typeof(install.down) !== undefined) {
		// 			install.down();
		// 		}
		// 	}

		// 	// Need to read the loaded version numbers
		// 	var instanstiatedVersions = {};
		// 	var moduleCount = 0;
		// 	var dbVersions = {};
		// 	var modules = {};

		// 	// Find all db versions
		// 	var Setting = this.Model.setting;
		// 	Setting.Db.find({ 'path': /install/ }, function(err, settings) {
		// 		for (var setting in settings) {
		// 			dbVersions[settings[setting].path] = settings[setting];
		// 		}
		// 		// Find all loaded version
		// 		for (var namespace in self.Module) {
		// 			for (var module in self.Module[namespace]) {
		// 				var modulePath = "module/" + namespace + "/" + module + "/install";
		// 				instanstiatedVersions[modulePath] = self.Module[namespace][module];
		// 				modules[modulePath] = namespace + "/" + module;
		// 				moduleCount++;
		// 			}
		// 		}

		// 		var j = 0;
		// 		// Compare the differences
		// 		for (var instPath in instanstiatedVersions) {
		// 			var instVersion = instanstiatedVersions[instPath].version.replace(/\./g, "");
		// 			var needToInstall = false;

		// 			// Check the db path
		// 			var dbVersion = (dbVersions[instPath] !== undefined) ? dbVersions[instPath].value.replace(/\./g, "") : 0;
		// 			if (dbVersions[instPath] === undefined) {
		// 				self.log("Found new module: " + instanstiatedVersions[instPath].name + " (Version: " + instanstiatedVersions[instPath].version + ")");
		// 				needToInstall = true;
		// 			} else {
		// 				var dbVersion = dbVersions[instPath].value.replace(/\./g, "");
		// 				if (dbVersion < instVersion) {
		// 					needToInstall = true;
		// 				}
		// 			}

		// 			if (needToInstall) {
		// 				// Read the versions we need
		// 				var dir = path.resolve('app/plugins') + "/" + modules[instPath] + "/install";
		// 				var items = fs.readdirSync(dir);
		// 				for (var item in items) {
		// 					var scriptVersion = items[item].replace(/\./g, "").replace('js', '');
		// 					if (scriptVersion > dbVersion && scriptVersion <= instVersion) {
		// 						//module, script, version, setting
		// 						installVersion(modules[instPath], dir + "/" + items[item], items[item]);
		// 					}
		// 				}
		// 			}

		// 			if (j + 1 == moduleCount) {
		// 				loaded.resolve();
		// 			}

		// 			j++;
		// 		}
		// 		//loaded.resolve();

		// 		self.log("Done checking for new installation scripts");

		// 	});

		// 	return loaded.promise;
		// }
	}
}