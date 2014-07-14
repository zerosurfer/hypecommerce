module.exports = {
    /**
     * Admin User
     *
     * @var String username
     * @var String password
     * @var String firstname
     * @var String lastname
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
            hasOne: {
                group: 'AdminGroup'
            },
            hasMany: {
                attributes: 'Attribute'
            }
        }
    },

    /**
     * Admin Group
     *
     * @var String label
     * @var Permission permissions
     * @var Date createdAt
     * @var Date updatedAt
     */
    AdminGroup: {
        schema: {
            label: String,
            createdAt: Date,
            updatedAt: Date
        },
        deps: {
            hasMany: {
                permissions: 'Permission'
            }
        }
    }
};
