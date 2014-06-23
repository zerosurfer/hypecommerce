/**
 * Express JS logic
 *
 *
 */
var Server,
	when = require('when'),
	express = require('express'), // Express framework
	app = express(); // Express application;

Server = function() {
	this.init = function(Hype) {
		var self = this,
			loaded = when.defer(),
			r,
			route,
			routeMethod,
			routeCallback;

		Hype.log('Starting application');

		var readAndSetRoutes = function() {
			var namespace, module, controller, route, routeMethod, routeCallback;;

			Hype.log("Preparing to set initial routes");

			// @todo, optimize whatever O notation this is... 
			for (namespace in Hype.enabledModules) {
				for (module in Hype.enabledModules[namespace]) {
					Hype.log("Searching " + namespace + "/" + module + " for controllers");
					// Look for controllers
					if (Hype.enabledModules[namespace][module].api) {
						for (controller in Hype.enabledModules[namespace][module].api) {
							Hype.log("Found controller " + controller);
							for (route in Hype.enabledModules[namespace][module].api[controller].routes) {
								routeMethod = Hype.enabledModules[namespace][module].api[controller].routes[route].method;
								routeCallback = Hype.enabledModules[namespace][module].api[controller].routes[route].callback;
								switch(routeMethod) {
									case 'get' :
										Hype.log("Adding GET route " + route);
										app.get(route, routeCallback);
										break;
									case 'post' :
										Hype.log("Adding POST route " + route);
										app.post(route, routeCallback);
										break;
									case 'delete' :
										Hype.log("Adding DELETE route " + route);
										app.delete(route, routeCallback);
										break;
									case 'put' :
										Hype.log("Adding PUT route " + route);
										app.put(route, routeCallback);
										break;
								}
							}
						}
					}
				}
			}
		}

		app.configure(function(){

			app.use(express.bodyParser());
			app.use(express.cookieParser());
			app.use(express.methodOverride());

			app.settings.env = Hype.env || 'development';

			// CSRF Token for CORS
			// Load locals
			app.use(function(req, res, next) {
				//res.locals.csrftoken = res.session._csrf;
				res.locals.admin = Hype.configuration.admin;
				next();
			})

			app.use(app.router);
			app.use(express.favicon());
			app.use(express.logger("dev"));
			app.engine('html', require('ejs').renderFile);
			app.set('views', Hype.themePath);
			app.get('/', function (req, res) {
				res.render(Hype.themePath + '/index.html');
			});

			// Add the admin routes
			// These should be required from admin.js
			app.get('/' + Hype.configuration.admin, Hype.Admin.requiredAuth(), Hype.Admin.index);
			app.get('/' + Hype.configuration.admin + '/login', Hype.Admin.login);
			app.post('/' + Hype.configuration.admin + '/login', Hype.Admin.loginPost);
			app.get('/' + Hype.configuration.admin + '/:controller/:action', Hype.Admin.test);

			readAndSetRoutes();

			// Setup a custom 404 page
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
		});

		app.listen(Hype.configuration.port, function() {
			Hype.log( 'Express server listening on port %d in %s mode', Hype.configuration.port,
				app.settings.env );
				
			loaded.resolve();
		});

		// // Test inheritance
		// var model = self.Model['setting'];
		// Hype.log("TEST FUNCTION OF INHERITANCE: " + model.testFunc()); // inheritance!
		return loaded.promise;
	}

	return this;
}

module.exports = new Server();