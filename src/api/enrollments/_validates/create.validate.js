/* eslint-disable newline-per-chained-call */
import Joi from 'joi';

export default (req, res, next) => {

    return Joi
        .object(
            {
                cpf         : Joi.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/).required(),
                _courseId   : Joi.string().regex(/^[a-f\d]{24}$/i).required(),
                status      : Joi.string().valid([
                    "ENROLLED",
                    "CANCELED",
                    "PENDING_PAYMENT"
                ]),
                contract    : Joi.string().uri().required()
            }
        )
        .validate(req.body, err => {
            if (err)
                return res.api.send(err.details, res.api.codes.UNPROCESSABLE_ENTITY);

            return next();
        });
}
