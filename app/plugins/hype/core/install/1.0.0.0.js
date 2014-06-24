// Should seed necessary data once
var Install = function(Hype) {
	Hype.Log.log('Installing Core-1.0.0.0');

	// var Currency = Hype.Model.currency,
	// 	Language = Hype.Model.language,
	// 	View = Hype.Model.view;

	// // Adds currencies
	// var currency = new Currency({
	// 	name: 'US Dollar',
	// 	character: '$',
	// 	decimals: 2
	// });
	// currency.save();

	// console.log(currency);

	// // new Currency({
	// // 	name: 'Euro',
	// // 	character: '€',
	// // 	decimals: 2
	// // }).save();

	// // new Currency({
	// // 	name: 'Bitcoin',
	// // 	character: 'B',
	// // 	decimals: 8
	// // }).save();

	// // // Add languages
	// // new Language({
	// // 	name: 'English (US)',
	// // 	code: 'en_US'
	// // }).save();

	// // new Language({
	// // 	name: 'English (UK)',
	// // 	code: 'en_UK'
	// // }).save();

	// // new Language({
	// // 	name: 'German',
	// // 	code: 'de_DE'
	// // }).save();

	// // new Language({
	// // 	name: 'Pirate',
	// // 	code: 'ar_RG'
	// // }).save();

	// //Add View
	// var view = new View({
	// 	name: 'My Store English', // English
	// 	code: 'store-en_US', // en_US | de_DE
	// 	url: 'http://localhost:5000/', // http://www.hypecommerce.com/ | http://www.hypecommerce.de/
	// 	language: 'en_US', // en_US | de_DE
	// 	primary: true, // true
	// 	currency: currency
	// });
	// view.save();

	// console.log(view);

	// // var store = new Store({
	// // 	name: 'My Store', // My Store
	// // 	code: 'store', // default
	// // 	views: [view], // [en_US, en_UK, de_DE, fr_FR, es_ES]
	// // });

	Hype.Log.log("Done install Core-1.0.0.0");
};

module.exports = Install;