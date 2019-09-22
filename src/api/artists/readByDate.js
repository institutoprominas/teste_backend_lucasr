import {models} from 'mongoose';
import moment from 'moment';

const {Artists} = models;

const listArtistsByDate = (req, res) => {

  console.log(moment(req.params.startDate).startOf('day').toDate());

    return Artists
        .paginate([
          {
            $match: {
              createdAt: {
                $gte: moment(req.params.startDate).startOf('day').toDate(),
                $lte: moment(req.params.endDate).endOf('day').toDate()
              }
            }
          }
        ], req.query.limit, req.query.page)
        .then(result => res.api.send(result.data, res.api.codes.OK, {paginate: result.paginate}))
        .catch(err => res.api.send(err.stack, res.api.codes.INTERNAL_SERVER_ERROR));
};

export default listArtistsByDate;
