import {models} from 'mongoose';

const {Artists} = models;

const listArtistsByOriginYear = (req, res) => {

    return Artists
        .paginate([
          {
            $match: {
              originYear: {
                $gte: parseInt(req.params.startYear, 10),
                $lte: parseInt(req.params.endYear, 10)
              }
            }
          }
        ], req.query.limit, req.query.page)
        .then(result => res.api.send(result.data, res.api.codes.OK, {paginate: result.paginate}))
        .catch(err => res.api.send(err.stack, res.api.codes.INTERNAL_SERVER_ERROR));
};

export default listArtistsByOriginYear;
