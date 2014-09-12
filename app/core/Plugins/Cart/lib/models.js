/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Cart
 * @version     0.0.1
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

module.exports = {
    /**
     * Cart
     *
     * @var Date createdAt
     * @var Date updatedAt
     * @var Customer customer
     * @var Store store
     * @var Item items
     */
    Cart: {
        schema: {
            session: String,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasOne: {
                customer: 'Customer',
                store: 'Store'
            },
            hasMany: {
                items: 'Item'
            }
        }
    },

    /**
     * Cart item
     *
     * @var Number quantity
     * @var Date createdAt
     * @var Date updatedAt
     * @var Product parent
     *
     */
    Item: {
        schema: {
            name: String,
            quantity: Number,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasOne: {
                parent: 'Product'
            }
        }
    }
};
