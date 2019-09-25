import {models} from 'mongoose';

const {Enrollments} = models;

const createEnrollment = (req, res) => {

    return Enrollments
        .create(req.body)
        .then(enrollment => res.api.send(enrollment, res.api.codes.CREATED))
        .catch(err =>  res.api.send(err.stack, res.api.codes.INTERNAL_SERVER_ERROR))
};

export default createEnrollment;
