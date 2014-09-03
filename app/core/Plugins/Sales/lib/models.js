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
            baseDiscountAmount: Number,
            baseShippingAmount: Number,
            baseItemTax: Number,
            baseShippingTax: Number,
            baseTaxAmount: Number,
            baseTaxTotal: Number,
            grandTotal: Number,
            subTotal: Number,
            discountAmount: Number,
            shippingAmount: Number,
            itemTax: Number,
            shippingTax: Number,
            taxAmount: Number,
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
                billingAddress: 'Address',
                cart: 'Cart'
            },
            hasMany: {
                items: 'Item',
                invoices: 'Invoice',
                shipments: 'Shipment'
            }
        }
    },

    Shipment: {
        schema: {
            trackingNumber: String,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasOne: {
                address: 'Address'
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
        }
    }
};
