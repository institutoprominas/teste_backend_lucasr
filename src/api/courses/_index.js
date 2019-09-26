// Joi Validate
import createValidate                   from './_validates/create.validate';
import readByTypeAndAreaValidate        from './_validates/readByTypeAndArea.validate';

// Example Middleware
import create                   from './create';
import read                     from './read';
import readByTypeArea                     from './readByTypeArea';

export default (route) => {

    // Route to create new course
    route.post('/courses', [
        createValidate,
        create
    ]);

    // Route to read all courses
    route.get('/courses', read);

    // Route to read all courses by type and area
    route.get('/courses/type/:type/area/:area', [
        readByTypeAndAreaValidate,
        readByTypeArea
    ]);

};
