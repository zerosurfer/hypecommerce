module.exports = {
    /**
     * Order
     *
     * @var Number baseGrandTotal
     * @var Number baseSubTotal
     * @var Number baseItemTax
     * @var Number baseShippingTax
     * @var Number baseTaxTotal
     * @var Number grandTotal
     * @var Number subTotal
     * @var Number itemTax
     * @var Number shippingTax
     * @var Number taxTotal
     * @var String status
     * @var Store store
     * @var Customer customer
     * @var Address shippingAddress
     * @var Address billingAddress
     * @var Date createdAt
     * @var Date updatedAt
     */
    Order: {
        schema: {
            baseGrandTotal: Number,
            baseSubTotal: Number,
            baseItemTax: Number,
            baseShippingTax: Number,
            baseTaxTotal: Number,
            grandTotal: Number,
            subTotal: Number,
            itemTax: Number,
            shippingTax: Number,
            taxTotal: Number,
            status: String,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasOne: {
                store: 'Store',
                customer: 'Customer',
                shippingAddress: 'Address',
                billingAddress: 'Address'
            },
            hasMany: {
                items: 'Item'
            }
        }
    },

    /**
     * Invoice
     *
     * @var Number baseTotalPiad
     * @var Number totalPaid
     * @var Date createdAt
     * @var Date updatedAt
     *
     */
    Invoice: {
        schema: {
            baseTotalPaid: Number,
            totalPaid: Number,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasOne: {
                order: 'Order'
            }
        }
    }
};
