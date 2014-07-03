module.exports = {
    Example: {
        schema: {
            name: String,
            //path: 'Url',
            //parent: 'Example',
            //store: 'Store',
            canFilter: Boolean,
            //filters: ['Attribute'],
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
                parent: 'Example',
                store: 'Store'
            }
        }
    }
};
