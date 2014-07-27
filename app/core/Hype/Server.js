/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		0.0.1.0
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

var Server,
	path = require('path'),
	_ = require('underscore');

module.exports = function(Hype) {

	Server = function() {
		this.start = function(app, express, passport, Hype, Admin) {
			var MongoStore = require('connect-mongo')(express);

			// set up passport auth
			require('./PassportAuth')(Hype, app, passport);

			var self = this,
				r,
				route,
				routeMethod,
				routeCallback;

			Hype.log('Preparing the server');
			app.use(express.cookieParser());
			app.settings.env = Hype.env || 'development';
			app.use(express.favicon());
			app.use(express.logger("dev"));
			app.engine('html', require('ejs').renderFile);
			app.set('views', Hype.themePath);
			app.use(express.json());       // to support JSON-encoded bodies
			app.use(express.urlencoded());
			app.use(Hype.configuration.admin + '/static', express.static(path.resolve(__dirname + '/../../admin/static')));
			app.use(Hype.configuration.admin + '/scripts', express.static(path.resolve(__dirname + '/../../admin/scripts')));

			app.use(express.session({
				store: new MongoStore({
					db: Hype.Db.getConnectionDb()
				}),
				secret: Hype.secret
			}));
			app.use(passport.initialize());
			app.use(passport.session());

			// Render the theme path
			app.get('/', function (req, res) {
				res.render('index.html');
			});

			// Setup to use the admin
			app.get(Hype.configuration.admin, function (req, res) {
				res.render(path.resolve(__dirname  + '../../..' + '/admin/index.html'));
			});

			// console.log(Hype.Admin.menu.configuration);

			// Setup a custom 404 page fallback
			app.use(function(req, res, next){
				res.status(404);

				// respond with html page
				if (req.accepts('html')) {
					res.render(Hype.themePath + '/404.html', { url: req.url });
					return;
				}

				// respond with json
				if (req.accepts('json')) {
					res.send({ error: 'Not found' });
					return;
				}
			});

			app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));


			Hype.log("Starting server");
			app.listen(Hype.configuration.port, function() {
				Hype.log('Hype server listening on port ' + Hype.configuration.port + ' in ' + 	app.settings.env + ' mode');
			});
		}
	}

	return new Server();
}