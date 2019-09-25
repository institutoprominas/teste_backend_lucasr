// Joi Validate
import createValidate           from './_validates/create.validate';

// Example Middleware
import create           from './create';
import read             from './read';

export default (route) => {

    // Route to create new artist
    route.post('/courses', [
        createValidate,
        create
    ]);

    // Route to read all artists
    route.get('/courses', read);

};
