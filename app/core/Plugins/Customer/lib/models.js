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

module.exports = {
    /**
     * Customer
     *
     * @var String firstname
     * @var String lastname
     * @var String gender
     * @var String email
     * @var String password
     * @var Attribute attributes
     * @var Date createdAt
     * @var Date updatedAt
     */
    Customer: {
        schema: {
            firstname: String,
            lastname: String,
            gender: String,
            email: String,
            password: String,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasMany: {
                addresses: 'Address',
                attributes: 'Attribute'
            }
        }
    },

    /**
     * Address
     *
     * @var String firstname
     * @var String lastname
     * @var String url
     * @var Date createdAt
     * @var Date updatedAt
     * @var View view
     */
    Address: {
        schema: {
            firstname: String,
            lastname: String,
            address1: String,
            address2: String,
            city: String,
            state: String,
            zip: String, // leading zeros
            defaultShipping: Boolean,
            defaultBilling: Boolean,
            createdAt: Date,
            updatedAt: Date
        }
    },
};
