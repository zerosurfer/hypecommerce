/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Cart
 * @version     1.0.0
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
     * @var Number qty
     * @var Date createdAt
     * @var Date updatedAt
     * @var Product parent
     *
     */
    Item: {
        schema: {
            qty: Number,
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
