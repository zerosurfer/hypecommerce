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
		theme: "base"									// Default theme
	},
	server: {
		development: {
			url: "http://127.0.0.1/",
			port: 5000,
			db: {
				type: "mock",
				url: "file:./sampleUsers.db",
				connection: {
					host: "localhost",
					username: "root",
					password: "root",
					dbname: "hype_development"
				}
			},
			session: {
				storage: "redis"
			}
		},

		staging: {
			url: "http://staging.hypecommerce.com/",
			port: 80,
			db: {
				type: "mongo",
				connection: {
					host: "127.0.0.1",
					port: 27017,
					dbname: "hype_staging"
				}
			},
			session: {
				storage: "redis"
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
	},
	dbs: {
		sampleUsers: {
			type: "mock",
			url: "file:./sampleUsers.db"
		}
	}
}

module.exports = config;