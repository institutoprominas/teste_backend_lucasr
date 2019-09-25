/* eslint-disable newline-per-chained-call */
import Joi from 'joi';

export default (req, res, next) => {

    return Joi
        .object(
            {
                cpf : Joi.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/).required(),
            }
        )
        .validate(req.params, err => {
            if (err)
                return res.api.send(err.details, res.api.codes.UNPROCESSABLE_ENTITY);

            return next();
        });
}
