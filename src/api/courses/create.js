import {models} from 'mongoose';

const {Courses} = models;

const createCourse = (req, res) => {

    return Courses
        .create(req.body)
        .then(course => res.api.send(course, res.api.codes.CREATED))
        .catch(err =>  res.api.send(err.stack, res.api.codes.INTERNAL_SERVER_ERROR))
};

export default createCourse;
