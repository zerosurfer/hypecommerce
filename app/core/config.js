/**
 * Hype Commerce
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Hype Commerce Creative Commons License that is bundled with
 * this package in the file LICENSE.txt. It is also available through the world-wide-web at this
 * URL {@link http://www.hypecommerce.com/license}. If you did not receive a copy of the license
 * and are unable to obtain it through the world-wide-web, please send an email to
 * {@link mailto:license@hypecommerce.com} so we can send you a copy immediately.
 *
 */

var config;

config = {
	hype: {
		version: "1.0.0.0",								// Hype Version
		install: "Fri, 06 Jun 2014 12:30:23 +0000",		// May delete this line
		secret: "8e7be24bb81205f20befd8e65e21a596",		// Encryption string
		environment: "development",						// Runtime environment
		theme: "ractive"								// Default theme
	},
	server: {
		development: {
			url: "http://127.0.0.1/",
			port: 5000,
			admin: "admin",
			db: {
				type: "mongo",
				connection: {
					host: "127.0.0.1",
					port: 27017,
					username: "",
					password: "",
					dbname: "hype_development"
				}
			},
			https: {
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
		},

		staging: {
			url: "http://staging.hypecommerce.com/",
			port: 5000,
			admin: "admin",
			db: {
				type: "mongo",
				connection: {
					host: "127.0.0.1",
					port: 27017,
					username: "",
					password: "",
					dbname: "hype_development"
				}
			},
			https: {
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
		},

		production: {
			url: "http://www.hypecommerce.com/",
			port: 80,
			db: {
				type: "mongo",
				connection: {
					host: "127.0.0.1",
					port: 27017,
					dbname: "hype_production"
				}
			},
			session: {
				storage: "redis"
			}
		}
	}
}

module.exports = config;