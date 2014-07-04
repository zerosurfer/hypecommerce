module.exports = {
    Example: {
        schema: {
            name: String,
            canFilter: Boolean,
            metaDescription: String,
            metaTags: String,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasMany: {
                filters: 'Attribute'
            },
            hasOne: {
                path: 'Url',
                //parent: 'Example',
                store: 'Store'
            }
        }
    },

    Attribute: {
        schema: {
            name: String,
        }
    },

    Url: {
        schema: {
            name: String,
        }
    },

    Store: {
        schema: {
            name: String,
        }
    }
};
