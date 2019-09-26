/* eslint-disable no-console */
export default {
    collection: 'Students',
    fields    : {
        name        : {
            type     : String,
            required : true
        },
        cpf      : {
            type     : String,
            required : true,
            index    : true,
            unique   : true
        },
        email  : {
            type    : String,
            required: true,
            index: true,
            unique: true
        },
        cellphone  : {
            type    : String,
            required: true
        },
        graduationDate  : {
            type    : Date,
            required: true
        },
        address: {
            street: {
                type : String,
                required: true
            },
            zip: {
                type : String,
                required: Number
            },
            state: {
                type : String,
                required: true
            },
            city: {
                type : String,
                required: true
            },
            neighborhood: {
                type : String,
                required: true
            },
            number: {
                type : Number,
                required: true
            },
            complement: {
                type : String,
                required: true
            }
        }
    },
    options   : { // Opcional
        timestamps: true
    }
};
