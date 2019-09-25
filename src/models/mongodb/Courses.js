/* eslint-disable no-console */
export default {
    collection: 'Courses',
    fields    : {
        name        : {
            type        : String,
            required    : true
        },
        description        : {
            type        : String,
            required    : true
        },
        type        : {
            type        : String,
            required    : true
        },
        area        : {
            type        : String,
            required    : true
        },
        optionalTcc: {
            type        : Boolean,
            required    : true
        },
        disciplines    : [{
            name: {
                type      : String,
                required  : true
            },
            workload: {
                type      : Number,
                required  : true,
                min       : 1
            }
        }]
    },
    options   : { // Opcional
        timestamps: true
    }
};
