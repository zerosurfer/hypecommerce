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
                parent: 'Example',
                path: 'Url'
            }
        }
    },

    Attribute: {
        schema: {
            name: String,
        },
        deps: {
            hasOne: {
                something: 'Store'
            }
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
