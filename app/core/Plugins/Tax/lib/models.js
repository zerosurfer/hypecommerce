/**
 * Hype Commerce
 *
 * @package		Hype
 * @module		Tax
 * @version		0.0.1
 * @author		Hype Commerce Team <team@hypejs.com>
 * @copyright	Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license		http://www.hypejs.com/license
 */

module.exports = {

    Tax: {
        schema: {
            name: String,
            description: String,
            rate: Number, // in percentage (e.g. 0.0875 fo NY)
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasMany: {
                rules: 'TaxRule'
            },
            hasOne: {
                store: 'Store'
            }
        }
    },

    TaxRule: {
        schema: {
            name: String,
            description: String,
            condition: String,
            createdAt: Date,
            updatedAt: Date
        }
    }
};
