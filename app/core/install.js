/**
 * Installs scripts
 *
 *
 */
var Install;

Install = function(db) {
	this.db = db || false;

	return this;
};
Install.prototype.getDb = function() {
	return db;
}
Install.prototype.beforeSave = function() {
	// set in progress flag
}
Install.prototype.afterSave = function() {
	// turn in progress flag off
	// set a config variable in db to let system know we're done
}

module.exports = Install;