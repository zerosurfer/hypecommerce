/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Customer
 * @version     0.0.1.0
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

module.exports = function(Hype) {
	return {

		'/customer': {
			/**
			 * Gets the current customer information
			 *
			 * @route /customer
			 * @method GET
			 * @param {Object} req
			 * @param {Object} res
			 */
			get: function (req, res) {

			}
		},

		'/customer/edit': {
			/**
			 * Edit information for the current customer
			 *
			 * @route /customer/edit
			 * @method POST
			 * @param {Object} req
			 * @param {Object} res
			 */
			post: function (req, res) {

			}
		},

		'/customer/register': {
			/**
			 * Register a customer
			 *
			 * @route /customer/register
			 * @method POST
			 * @param {Object} req
			 * @param {Object} res
			 */
			post: function (req, res) {

			}
		},

		'/customer/login': {
			/**
			 * Login a customer
			 *
			 * @route /customer/login
			 * @method POST
			 * @param {Object} req
			 * @param {Object} res
			 */
			post: function (req, res) {

			}
		},

		'/customer/logout': {
			/**
			 * Logout a customer
			 *
			 * @route /customer/logout
			 * @method GET
			 * @param {Object} req
			 * @param {Object} res
			 */
			get: function (req, res) {
				var Customer = Hype.require('Customer');

				if (Customer.isLoggedIn(req.session.id)) {

				}
			}
		},

		'/customer/address': {
			/**
			 * Get the addresses for the current customer
			 *
			 * @route /customer/address
			 * @method GET
			 * @param {Object} req
			 * @param {Object} res
			 */
			get: function(req, res) {

			},
			/**
			 * Create a new address for the current customer
			 *
			 * @route /customer/address
			 * @method POST
			 * @param {Object} req
			 * @param {Object} res
			 */
			post: function (req, res) {

			}
		},

		'/customer/address/*': {
			/**
			 * Get a specific address for the current customer
			 *
			 * @route /customer/address/*
			 * @method GET
			 * @param {Object} req
			 * @param {Object} res
			 */
			get: function(req, res) {

			}
		},
	}
};