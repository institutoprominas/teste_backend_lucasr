// Joi Validate
import createValidade           from './_validates/create.validate';

// Example Middleware
import read             from './read';
import create           from './create';

export default (route) => {

    // Route to read musics
    route.get('/musics', [
        read
    ]);

    // Route to create new artist
    route.post('/musics', [
        createValidade,
        create
    ]);

};
