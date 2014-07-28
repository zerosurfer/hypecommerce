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
            value: String
        },
        deps: {
            hasOne: {
                store: 'Store'
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
    }
};
