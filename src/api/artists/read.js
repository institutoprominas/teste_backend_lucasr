import {models} from 'mongoose';

const {Artists} = models;

const listArtists = (req, res) => {

    return Artists
        .paginate(req.query.aggregate, req.query.limit, req.query.page)
        .then(result => res.api.send(result.data, res.api.codes.OK, {paginate: result.paginate}))
        .catch(err => res.api.send(err.stack, res.api.codes.INTERNAL_SERVER_ERROR));
};

export default listArtists;
