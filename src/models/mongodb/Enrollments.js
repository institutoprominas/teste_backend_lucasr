import { Schema } from "mongoose";

/* eslint-disable no-console */
export default {
    collection: 'Enrollments',
    fields    : {
        cpf        : {
            type     : String,
            required : true
        },
        _courseId: {
            type: Schema.Types.ObjectId,
            ref: 'Courses',
            required: true
        },
        status      : {
            type     : String,
            default  : "PENDING_PAYMENT",
            enum: [
                "ENROLLED",
                "CANCELED",
                "PENDING_PAYMENT"
            ]
        },
        contract  : {
            type    : String,
            required: true
        }
    },
    options   : { // Opcional
        timestamps: true
    }
};
