module.exports = {
    /**
     * Admin User
     *
     * @var Customer customer
     * @var Store store
     * @var Item items
     * @var Date createdAt
     * @var Date updatedAt
     */
    AdminUser: {
        schema: {
            username: String,
            password: String,
            firstname: String,
            lastname: String,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasMany: {
                attributes: 'Attribute'
            }
        }
    },
    AdminGroup: {
        schema: {
            label: String
        },
        deps: {
            hasMany: {
                permissions: 'Permission'
            }
        }
    }
};
