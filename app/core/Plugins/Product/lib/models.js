module.exports = {
    /**
     * Product
     *
     * @var String name
     * @var String description
     * @var String shortDescription
     * @var Number qty
     * @var String metaDescription
     * @var String metaTags
     * @var Date createdAt
     * @var Date updatedAt
     * @var Store store
     * @var Media images
     */
    Product: {
        schema: {
            name: String,
            description: String,
            shortDescription: String,
            qty: Number,
            metaDescription: String,
            metaTags: String,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasOne: {
                store: 'Store'
            },
            hasMany: {
                images: 'Media'
            }
        }
    }
};
