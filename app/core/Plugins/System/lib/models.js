/**
 * Hype Commerce
 *
 * @package     Hype
 * @module      System
 * @version     0.0.1
 * @author      Hype Commerce Team <team@hypejs.com>
 * @copyright   Copyright (c) 2014, Hype Commerce, Inc. (http://www.hypejs.com/)
 * @license     http://www.hypejs.com/license
 */

module.exports = {

    /**
     * Attribute
     *
     * @var String label
     * @var String code
     * @var String value
     * @var Store store
     */
    Attribute: {
        schema: {
            label: String,
            code: String,
            type: { type: String, enum: ['dropdown', 'text', 'textarea', 'date', 'boolean', 'select', 'multiselect', 'price', 'media', 'tax'] },
            defaultValue: String,
            unique: Boolean,
            required: Boolean,
            filterable: Boolean,
            advanceSearch: Boolean,
            validation: { type: String, enum: ['decimal', 'integer', 'email', 'url', 'string', 'az09string'] },
            sort: Number,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasOne: {
                store: 'Store',
                view: 'View'
            },
            hasMany: {

            }
        }
    },

    AttributeValue: {
        schema: {
            value: String,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasOne: {
                attribute: 'Attribute',
                store: 'Store',
                view: 'View'
            }
        }
    },

    AttributeSet: {
        schema: {
            label: String,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasMany: {
                attributes: 'Attribute'
            }
        }
    },

    /**
     * Config
     *
     * @var String path
     * @var String value
     * @var Date createdAt
     * @var Date updatedAt
     * @var Store store
     */
    Config: {
        schema: {
            path: String,
            value: String,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasOne: {
                store: 'Store'
            }
        }
    },

    /**
     * Install
     *
     * @var String module
     * @var String version
     * @var Date createdAt
     * @var Date updatedAt
     */
    Install: {
        schema: {
            module: String,
            version: String,
            createdAt: Date,
            updatedAt: Date
        }
    },

    /**
     * Language
     *
     * @var String code
     * @var String label
     * @var Date createdAt
     */
    Language: {
        schema: {
            code: String,
            label: String,
            createdAt: Date
        }
    },

    /**
     * Currency
     *
     * @var String code
     * @var String label
     * @var String symbol
     * @var Date createdAt
     */
    Currency: {
        schema: {
            code: String,
            label: String,
            decimals: Number,
            symbol: String,
            createdAt: Date
        }
    },

    /**
     * Permission
     *
     * @var String labek
     * @var String read
     * @var String write
     * @var String execute
     * @var String path
     * @var Date createdAt
     */
    Permission: {
        schema: {
            label: String,
            read: Boolean,
            write: Boolean,
            execute: Boolean,
            path: String,
            createdAt: Date
        }
    },

    // looks for cron.js
    CronTask: {
        schema: {
            name: String,
            description: String,
            expr: String, // * * * * *
            plugin: String,
            task: String,
            createdAt: Date,
            updatedAt: Date
        }
    }
};
