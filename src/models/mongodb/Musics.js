/* eslint-disable no-console */
export default {
  collection: 'Musics',
  fields    : {
      name        : {
          type     : String,
          required : true,
          index    : true
      },
      duration    : {
          type      : Number,
          required  : true,
          min       : 15
      }
  },
  options   : { // Opcional
      timestamps: true
  }
};
