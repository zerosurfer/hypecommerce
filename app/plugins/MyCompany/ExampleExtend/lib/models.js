module.exports = {
    /**
     * Order - Adds a subscription and NewObject attribute
     *
     * @var Boolean subscription
     */
    Order: {
        schema: {
            subscription: Boolean,
            newSomething: Number,
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
