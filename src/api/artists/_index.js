// Joi Validate
import createValidade           from './_validates/create.validate';
import updateValidade           from './_validates/update.validate';
import readByOriginYearValidate from './_validates/readByOriginYear.validate';
import readByDateValidate       from './_validates/readByDate.validate';

// Example Middleware
import create           from './create';
import read             from './read';
import readByOriginYear from './readByOriginYear';
import readByDate       from './readByDate';
import readOne          from './readOne';
import update           from './update';

export default (route) => {

    // Route to create new artist
    route.post('/artists', [
        createValidade,
        create
    ]);

    // Route to update existent artist
    route.put('/artists/:_id', [
        updateValidade,
        update
    ]);

    // Route to read artists by date
    route.get('/artists/date/:startDate/:endDate', [
      readByDateValidate,
      readByDate
    ]);

    // Route to read artists by originYear
    route.get('/artists/origin_year/:startYear/:endYear', [
      readByOriginYearValidate,
      readByOriginYear
    ]);

    // Route to read all artists
    route.get('/artists', read);

    // Route to read specific artist
    route.get('/artists/:_id', readOne);
};
