module.exports = {
    /**
     * Order - Adds a subscription and NewObject attribute
     *
     * @var Boolean subscription
     */
    Order: {
        schema: {
            subscription: Boolean
        },
        deps: {
            hasOne: {
                newObject: 'NewObject'
            }
        }
    },

    NewObject: {
        schema: {
            label: String
        }
    }
};
