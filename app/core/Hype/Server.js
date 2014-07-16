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
	_ = require('underscore');

module.exports = function(Hype) {

	Server = function() {
		this.start = function(app, express, passport, Hype) {
			var MongoStore = require('connect-mongo')(express);

			// set up passport auth
			require('./PassportAuth')(Hype, app, passport);

			var self = this,
				Admin = require('./Admin')(Hype),
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
			app.use(express.session({
				store: new MongoStore({
					db: Hype.dba
				}),
				secret: Hype.configuration.secret
			}));
			app.use(passport.initialize());
			app.use(passport.session());

			// Render the theme path
			app.get('/', function (req, res) {
				res.render('index.html');
			});

			// Add the admin routes
			// These should be required from ./admin.js
			app.get('/' + Hype.configuration.admin, Admin.index);
			app.get('/' + Hype.configuration.admin + '/login', Admin.login);
			app.post('/' + Hype.configuration.admin + '/login', Admin.loginPost);
			app.use(express.static(__dirname + '/admin/static'));

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