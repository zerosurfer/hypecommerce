/**
 * Hype Commerce
 *
 * @package		Hype
 * @version		0.0.1
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

var path = require('path'),
	fs = require('fs'),
    crypto = require('crypto'),
    logger = require('morgan'),
	express = require('express'),
	session = require('express-session'),
	RedisStore = require('connect-redis')(session),
	favicon = require('serve-favicon'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser')
	errorHandler = require('errorhandler'),
	app = express(),
	Express = undefined;

module.exports = function(Hype) {
	"use strict";

	/**
	 * Core Express class
	 *
	 * @title Handles the servers calls for the application
	 *
	 * @constructor
	 * @return {Express}
	 */
	Express = function() {
		var self = this;

		/**
		 * The API prefix to use when making server calls
		 * @var String
		 */
		this.apiPrefix = '',

		this.init = function(Config, Auth, Admin, install) {
			var faviconPath = path.resolve('./app/themes/' + Config.express.theme + '/favicon.ico');
			// Set the API prefix (if setup)
			this.apiPrefix = (Config.api) ? Config.api : '';

			// Setup express
			app.use(cookieParser());
			if (fs.existsSync(faviconPath)) {
				app.use(favicon(faviconPath));
			}
			app.use(logger("dev"));
			app.engine('html', require('ejs').renderFile);
			app.use(bodyParser.json());
			app.use(bodyParser.urlencoded({ extended: true }));

			if (!install) {
				this._init(Config, Auth, Admin);
			} else {
				this._initInstall(Config, Auth, Admin, install);
			}

			Hype.notify('hype.server.complete');
		},

		this._init = function(Config, Auth, Admin) {
			app.use(session({
				resave: true,
				saveUninitialized: true,
				store: new RedisStore({
					host: Config.session[Config.session.storage].host,
					port: Config.session[Config.session.storage].port,
					db: 1,
					pass: Config.session[Config.session.storage].pass
				}),
				secret: Config.session[Config.session.storage].secret
			}));

			app.set('views', path.resolve('./app/themes/' + Config.express.theme));
			app.use(Config.admin + '/static/', express.static(path.resolve(__dirname + '/../../../admin/static')));
			app.use(Config.admin + '/scripts/', express.static(path.resolve(__dirname + '/../../../admin/scripts')));
			// @kurt - these should be something like Auth.init() and it will call both of them
			//app.use(passport.initialize());

			// Render the theme path
			app.get('/', function (req, res) {
				if (req.session.id) {
					Hype.debug('Serving session ' + req.session.id);
				}
				res.render('index.html');
			});
			app.use('/', express.static(path.resolve('./app/themes/' + Config.express.theme)));

			// Setup to use the admin
			app.get(Config.admin, function (req, res) {
				res.render(path.resolve(__dirname  + '../../../../admin/index.html'));
			});
			
			// Test API call
			app.get(Config.admin + '/api/menu', function(req, res) {
				res.status(200);
				res.send(Admin.getMenu(true));
			});

			// Setup a custom 404 page fallback
			app.use(function(req, res, next){
				res.status(404);
				// respond with html page
				if (req.accepts('html')) {
					res.render(path.resolve('./app/themes/' + Config.express.theme + '/404.html'), { url: req.url });
					return;
				}
				// respond with json
				if (req.accepts('json')) {
					res.send({ error: 'Not found' });
					return;
				}
			});
			app.use(errorHandler({ dumpExceptions: true, showStack: true }));
			Hype.debug("Starting server");
			
			Hype.listen('hype.admin.menuLoaded', function(supermenu) {
				Admin.addMenu(supermenu.menu);
			});
		},

		this._initInstall = function(Config, Auth, Admin, install) {
			app.set('views', 'app/setup');
			app.use('/setup/', express.static(path.resolve(__dirname + '/../../../setup')));
			app.get('/setup', function (req, res) {
				res.render('index.html');
			});

			// Add the server api call, we're going to make a POST request with the data that will generate the config.js file
			app.post('/setup/install', function (req, res) {
				// Create the secret key
				var md5Hash = crypto.createHash('md5');

				// Create the JSON config file
				var config = {
					version: "0.0.1",
					install: new Date(),
					secret: md5Hash.update(Math.random() + ":" + install).digest('hex'),
					environment: "hype",
					debug: true,
					log: true,
					hype: {
						db: {
							type: "mongo",
							mongo: {
								host: "127.0.0.1",
								port: 27017,
								username: "",
								password: "",
								dbname: "hype_development"
							}
						},
						server: {
							type: 'express',
							admin: "/admin", // url for the admin
							express: {
								url: "http://localhost",
								port: 4973, // "HYPE" on a phone keypad =)
								nodes: 2, // for clustering
								theme: "ractive" // theme is specific, since we're frontend agnostic, who says we even need one
								// express options should go here
							},
							https: {
								admin: 'admin.{url}',
								port: 4443
							},
							session: {
								storage: "redis",
								redis: {
									host: "localhost",
									port: 6379,
									db: "hype_development",
									pass: "u2T2BvKcXXGk9pKXjfXw",
									secret: "XMGnKPtQEuZbWYWLp5CZ",
									cookie: { path: "/", maxAge: 3600000 }
								}
							}
						}
					}
				};

				fs.writeFileSync('app/config.js', "module.exports=" + JSON.stringify(config));
				res.status(200);
				res.send({ success: 'Config file created, redirecting you to your store' });
			});
		},

		this.addRoute = function(route, type, action) {
			route = (!this.apiPrefix && !route) ? '/' : route; // make sure we can't add a blank route

            Hype.debug('Adding ' + type.toUpperCase() + ' route: ' + this.apiPrefix + route);
			app[type.toLowerCase()](this.apiPrefix + route, action);
		}

		this.connect = function(Config) {
			var port = process.env.PORT || Config.express.port;
			app.listen(port, function() {
				Hype.log('Your store is up and running!', 'success');
				Hype.log('Access your store by navigating to ' + Config.express.url + ':' + port + '/', 'info');
			});
		}

		return this;
	}

	return new Express();
}