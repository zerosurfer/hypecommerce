module.exports = {
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
            hasMany: {
                views: 'View'
            }
        }
    },

    /**
     * View
     *
     * @var String name
     * @var String description
     * @var String code
     * @var Date createdAt
     * @var Date updatedAt
     * @var View view
     */
    View: {
        schema: {
            name: String,
            description: String,
            code: String,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasOne: {
                language: 'Language',
                currency: 'Currency'
            }
        }
    }
};
