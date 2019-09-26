/* eslint-disable newline-per-chained-call */
import Joi from 'joi';

export default (req, res, next) => {

    return Joi
        .object(
            {
                name                : Joi.string().required(),
                cpf                 : Joi.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/).required(),
                email               : Joi.string().email({ minDomainSegments: 2 }).required(),
                cellphone           : Joi.string().regex(/^\(\d{2}\)9?\d{4}\-\d{4}$/).required(),
                graduationDate      : Joi.date().min(new Date()).required(),
                address             : Joi.object({
                    street          : Joi.string().required(),
                    zip             : Joi.string().regex(/^\d{5}\-\d{3}$/).required(),
                    state           : Joi.string().min(2).max(2).required(),
                    city            : Joi.string().required(),
                    neighborhood    : Joi.string().required(),
                    number          : Joi.number().required(),
                    complement      : Joi.string().required()
                }).required()
            }
        )
        .validate(req.body, err => {
            if (err)
                return res.api.send(err.details, res.api.codes.UNPROCESSABLE_ENTITY);

            return next();
        });
}
