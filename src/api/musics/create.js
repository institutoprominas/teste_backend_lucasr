import {models} from 'mongoose';

const {Musics} = models;

const createMusic = (req, res) => {

    return Musics
        .create(req.body)
        .then(music => res.api.send(music, res.api.codes.CREATED))
        .catch(err =>  res.api.send(err.stack, res.api.codes.INTERNAL_SERVER_ERROR))
};

export default createMusic;
