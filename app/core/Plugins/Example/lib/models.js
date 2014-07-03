module.exports = (function() {
    var models = {
        Example: {
            schema: {
                name: String,
                path: 'Url',
                parent: 'Example',
                store: 'Store',
                canFilter: Boolean,
                filters: ['Attribute'],
                metaDescription: String,
                metaTags: String,
                createdAt: Date,
                updatedAt: Date
            }
        }
    };

    return models;
})();