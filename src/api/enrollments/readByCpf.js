import {models} from 'mongoose';

const {Enrollments} = models;

const listArtistsByDate = (req, res) => {

    return Enrollments
      .paginate([
        {
          $match: {
            cpf: req.params.cpf
          }
        },
        {
          $lookup: {
            from: "Courses",
            localField: "_courseId",
            foreignField: "_id",
            as: "course"
          }
        },
        {
          $unwind: {
            path: "$course"
          }
        }
      ], req.query.limit, req.query.page)
      .then(result => res.api.send(result.data, res.api.codes.OK, {paginate: result.paginate}))
      .catch(err => res.api.send(err.stack, res.api.codes.INTERNAL_SERVER_ERROR));
};

export default listArtistsByDate;
