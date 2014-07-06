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
     * Store
     *
     * @var String name
     * @var String url
     * @var Date createdAt
     * @var Date updatedAt
     * @var View view
     */
    Store: {
        schema: {
            name: String,
            url: String,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasOne: {
                view: 'View'
            }
        }
    },

    /**
     * View
     *
     * @var String name
     * @var String description
     * @var String shortDescription
     * @var String metaDescription
     * @var String metaTags
     * @var String theme
     * @var Date createdAt
     * @var Date updatedAt
     * @var View view
     */
    View: {
        schema: {
            name: String,
            description: String,
            shortDescription: String,
            metaDescription: String,
            metaTags: String,
            theme: String,
            createdAt: Date,
            updatedAt: Date
        }
    }
};
