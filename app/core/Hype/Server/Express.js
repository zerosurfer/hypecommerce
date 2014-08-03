var path = require('path'),
	express = require('express'),
	app = express();

module.exports = function(Hype) {
	var Express = function() {
		var self = this,
			r,
			route,
			routeMethod,
			routeCallback;

		this.init = function(Config, Auth, Admin, install) {
			// Setup express
			app.use(express.cookieParser());
			app.use(express.favicon());
			app.use(express.logger("dev"));
			app.engine('html', require('ejs').renderFile);
			app.use(express.json());
			app.use(express.urlencoded());

			if (!install) {
				app.set('views', Config.themePath);
				app.use(Config.admin + '/static', express.static(path.resolve(__dirname + '/../../../admin/static')));
				app.use(Config.admin + '/scripts', express.static(path.resolve(__dirname + '/../../../admin/scripts')));
				// @kurt - these should be something like Auth.init() and it will call both of them
				//app.use(passport.initialize());
				//app.use(passport.session());

				// Render the theme path
				app.get('/', function (req, res) {
					res.render('index.html');
				});

				// Setup to use the admin
				app.get(Config.admin, function (req, res) {
					res.render(path.resolve(__dirname  + '../../../../admin/index.html'));
				});

				// Setup a custom 404 page fallback
				app.use(function(req, res, next){
					res.status(404);
					// respond with html page
					if (req.accepts('html')) {
						res.render(Config.express.themePath + '/404.html', { url: req.url });
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
				
				Hype.listen('hype:admin:menuLoaded', function(supermenu) {
					Admin.addMenu(supermenu.menu);
				});
			} else {
				app.set('views', 'app/setup');
				app.use('/setup/', express.static(path.resolve(__dirname + '/../../../setup')));
				app.get('/setup', function (req, res) {
					res.render('index.html');
				});
			}

			Hype.notify('hype:server:complete');
		},

		this.connect = function(Config) {
			var port = process.env.PORT || Config.express.port;
			app.listen(port, function() {
				Hype.log('Your store is up and running!');
				Hype.log('Access your store by navigating to ' + Config.express.url + ':' + port + '/');
			});
		}

	}

	return new Express();
}