/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Customer
 * @version     0.0.1
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
            prefix: String,
            firstname: String,
            middlename: String,
            lastname: String,
            suffix: String,
            dob: Date,
            gender: String,
            email: String,
            password: String,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasOne: {
                group: 'Group'
            },
            hasMany: {
                addresses: 'Address',
                attributes: 'Attribute'
            }
        }
    },

    /**
     * Group
     */
    Group: {
        schema: {
            name: String,
            description: String,
            createdAt: Date,
            updatedAt: Date
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
            prefix: String,
            firstname: String,
            middlename: String,
            lastname: String,
            suffix: String,
            address1: String,
            address2: String,
            address3: String,
            city: String,
            state: String,
            zip: String, // for leading zeros
            country: String,
            phoneNumber: String,
            faxNumber: String,
            defaultShipping: Boolean,
            defaultBilling: Boolean,
            createdAt: Date,
            updatedAt: Date
        }
    },
};
