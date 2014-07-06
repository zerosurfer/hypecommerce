module.exports = {
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
    }
};
