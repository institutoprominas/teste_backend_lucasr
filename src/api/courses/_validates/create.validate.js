/* eslint-disable newline-per-chained-call */
import Joi from 'joi';

export default (req, res, next) => {

    return Joi
        .object(
            {
                name        : Joi.string().max(50).required(),
                description : Joi.string().max(500).required(),
                type        : Joi.string().max(50).required(),
                area        : Joi.string().max(50).required(),
                optionalTcc : Joi.boolean().required(),
                disciplines : Joi.array().items(Joi.object().keys({
                    name            : Joi.string().max(50).required(),
                    workload        : Joi.number().min(1).max(200).required()
                })).min(1).required()
            }
        )
        .validate(req.body, err => {
            if (err)
                return res.api.send(err.details, res.api.codes.UNPROCESSABLE_ENTITY);

            return next();
        });
}
