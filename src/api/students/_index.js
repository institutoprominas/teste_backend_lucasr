// Joi Validate
import createValidate           from './_validates/create.validate';

// Example Middleware
import create               from './create';
import read                 from './read';

export default (route) => {

    // Route to create new student
    route.post('/students', [
        createValidate,
        create
    ]);

    // Route to read all students
    route.get('/students', read);

};
