var Install = function(Hype) {

	this.up = function() {
		Hype.Log.log('Installing Core-1.0.0.0');

		var Currency = Hype.Model.currency,
			Language = Hype.Model.language,
			View = Hype.Model.view
			Store = Hype.Model.store;

		// Adds currency
		var currency = Currency.Db.create({
			name: 'US Dollar',
			character: '$',
			decimals: 2
		});

		// Add language
		var languge = Language.Db.create({
			name: 'English (US)',
			code: 'en_US'
		});

		// Add View
		var view = View.Db.create({
			name: 'My Store English', // English
			code: 'store-en_US', // en_US | de_DE
			url: 'http://localhost:5000/', // http://www.hypecommerce.com/ | http://www.hypecommerce.de/
			language: 'en_US', // en_US | de_DE
			primary: true, // true
			currency: [currency]
		});

		var store = Store.Db.create({
			name: 'My Store', // My Store
			code: 'store', // default
			views: [view], // [en_US, en_UK, de_DE, fr_FR, es_ES]
		});

		Hype.Log.log("Done install Core-1.0.0.0");
	},

	this.down = function() {

	}

	return this;
};

module.exports = Install;