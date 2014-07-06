module.exports = {
    /**
     * Customer
     *
     * @var String name
     * @var String url
     * @var Date createdAt
     * @var Date updatedAt
     * @var View view
     */
    Customer: {
        schema: {
            firstname: String,
            lastname: String,
            gender: String,
            email: String,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasMany: {
                attributes: 'Attribute'
            }
        }
    },
};
