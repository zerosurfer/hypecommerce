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
