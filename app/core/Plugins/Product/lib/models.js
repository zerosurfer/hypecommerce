/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      Product
 * @version     0.0.1
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

module.exports = {
    /**
     * Product
     */
    Product: {
        schema: {
            name: String,
            type: { type: String, enum: ['configurable', 'grouped', 'simple', 'virtual', 'subscription'] },
            description: String,
            shortDescription: String,
            metaDescription: String,
            metaTitle: String,
            metaTags: [String],
            sku: String,
            weight: Number,
            weightUnit:  { type: String, enum: ['g', 'oz', 'lbs', 'k'] },
            enabled: Boolean,
            visible: Boolean,
            search: Boolean,
            urlKey: String,
            quantity: Number,
            maxShoppingCart: Number,
            minShoppingCart: Number,
            inStock: Boolean,
            manageInventory: Boolean,
            price: Number,
            salePrice: Number,
            salePriceFrom: Date,
            salePriceTo: Date,
            subscription: Boolean,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasOne: {
                store: 'Store',
                parent: 'Product'
            },
            hasMany: {
                relatedProducts: 'Product',
                upSells: 'Product',             // shown on the product page
                crossSells: 'Product',          // shown on the shopping cart page
                attributes: 'AttributeValue',
                categories: 'Category',
                groupPrices: 'GroupPrice',
                tierPrices: 'TierPrice',
                tags: 'Tag',
                swatches: 'Swatch',
                media: 'Media'
            }
        }
    },

    Swatch: {
        schema: {
            label: String,
            color: String,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasOne: {
                product: 'Product', // reference back to the simple product (swatches will be used on configurable products)
                image: 'Media' // Optional
            }      
        }
    },

    /**
     * Group Pricing
     * ex: General Group = $100, Members Group = $50
     */
    GroupPrice: {
        schema: {
            label: String,
            price: Number
        },
        deps: {
            hasOne: {
                group: 'Group'
            }
        }
    },

    /**
     * Tier Pricing
     * ex: General Group, buy 5 or more @ $5 each || Members Group, buy 100 or more @ $1 each
     */
    TierPrice: {
        schema: {
            label: String,
            quantity: Number,
            price: Number
        },
        deps: {
            hasOne: {
                group: 'Group'
            }
        }
    },

    /**
     * Tag
     */
    Tag: {
        schema: {
            label: String,
            createdAt: Date
        }
    },

    /**
     * Inventory connectors
     */
     Inventory: {
        schema: {
            label: String,
            src: String,    // e.g. http://www.quietlogicistcs.com/data/124179195/INV_954_45923523.json
            quantity: Number,
            backorder: Boolean,
            backorderQuantity: Number,
            createdAt: Date,
            updatedAt: Date
        }
     }
};
