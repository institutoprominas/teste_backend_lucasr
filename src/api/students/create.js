import {models} from 'mongoose';

const {Students} = models;

const createStudent = (req, res) => {

    return Students
        .create(req.body)
        .then(student => res.api.send(student, res.api.codes.CREATED))
        .catch(err =>  res.api.send(err.stack, res.api.codes.INTERNAL_SERVER_ERROR))
};

export default createStudent;
