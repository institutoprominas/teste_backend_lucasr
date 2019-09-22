/* eslint-disable newline-per-chained-call */
import Joi from 'joi';

export default (req, res, next) => {

    return Joi
        .object(
            {
                startYear : Joi.number().min(1500).required(),
                endYear   : Joi.number().min(1500).required()
            }
        )
        .validate(req.params, err => {
            if (err)
                return res.api.send(err.details, res.api.codes.UNPROCESSABLE_ENTITY);

            return next();
        });
}
