var Install;

module.exports = function(Hype) {

	Install = function() {

		this.up = function() {
			Hype.log("Installing Store v0.0.0.1");

			var store = Hype.require('store'),
				Store = Hype.Db.getModel('Store'),
				View = Hype.Db.getModel('View'),
				Language = Hype.Db.getModel('Language'),
				Currency = Hype.Db.getModel('Currency'),
				stores = [],
				views = [],
				languages = [],
				currencies = [],
				currencyModels = {},
				languageModels = {},
				i = 0,
				j = 0,
				k = 0,
				l = 0;

			languages = [
				{
					code: "en_US",
					label: "English (US)"
				},
				{
					code: "es_ES",
					label: "Spanish"
				}
			];

			currencies = [
				{
					code: "usd",
					label: "US Dollar",
					symbol: "$",
					decimals: 2
				},
				{
					code: "eur",
					label: "Euro",
					symbol: "€",
					decimals: 2
				}
			];

			stores = [
				{
					name: "My Store",
					url: "http://localhost/",
					viewsStr: [
						"English",
						"Spanish"
					]
				}
			];

			views = [
				{
					name: "English",
					description: "English store view for My Store",
					code: "en_US",
					languageStr: ""
				},
				{
					name: "Spanish",
					description: "Spanish store view for My Store",
					code: "es_ES"
				}
			];


			store.listen('store:createCurrency', function(e) {
				var tmpModel;

				if (i < currencies.length) {
					Hype.log("Creating currency " + e.label);
					// Create the new permission
					tmpModel = new Currency(e);
					// Add the model to the models object for later use
					tmpModel.save(function(err) {
						if (err) return handleError(err);

						currencyModels[e.label] = tmpModel;

						i++;
						store.notify('store:createCurrency', currencies[i]);
					});

				} else {
					// Move to the next step, languages
					store.notify('store:createLanguage', groups[j]);
				}
			});

			store.listen('store:createLanguage', function(e) {
				var tmpModel;

				if (j < languages.length) {
					Hype.log("Creating language " + e.label);
					// Create the new permission
					tmpModel = new Language(e);
					// Add the model to the models object for later use
					tmpModel.save(function(err) {
						if (err) return handleError(err);

						languageModels[e.label] = tmpModel;

						j++;
						store.notify('store:createLanguage', langauges[j]);
					});

				} else {
					// Move to the next step, views
					store.notify('store:createView', views[j]);
				}
			});

			store.listen('store.createView', function(e) {
				var tmpModel;

				if (j < views.length) {
					Hype.log("Creating language " + e.label);
					// Create the new permission
					tmpModel = new View(e);
					// Add the model to the models object for later use
					tmpModel.save(function(err) {
						if (err) return handleError(err);

						viewsModels[e.label] = tmpModel;

						j++;
						store.notify('store:createLanguage', langauges[j]);
					});

				} else {
					// Move to the next step, views
					store.notify('store:createView', views[j]);
				}
			});

			store.listen('store:createStore', function(e) {

			});

			// Create our currencies
			store.notify('createCurrency', currencies[i]);


			Hype.log("Finished installing Store v0.0.0.1");
		},

		this.down = function() {
			Hype.log("Uninstalling store");
		}
	}
	
	return new Install();
}