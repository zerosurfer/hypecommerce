var	User;

User = function() {

	this.schema = {
		firstname: String,
		lastname: String,
		password: String,
		resetToken: String,
		created: { type: Date, default: Date.now },
		updated: { type: Date, default: Date.now }
	}

	return this;
}

module.exports = User;
