import {models} from 'mongoose';

const {Artists} = models;

const createArtist = (req, res) => {

    return Artists
        .create(req.body)
        .then(artist => res.api.send(artist, res.api.codes.CREATED))
        .catch(err =>  res.api.send(err.stack, res.api.codes.INTERNAL_SERVER_ERROR))
};

export default createArtist;
