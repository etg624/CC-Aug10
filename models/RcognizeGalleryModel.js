let db = require('./db');

module.exports.postIndexedPhoto = function (body, callback) {
  db.createConnection(function (err, connection) {
    if (err) {
      console.log('Error while performing common connect query: ' + err);
      callback(err, null);
    } else {
      //process the i/o after successful connect.  Connection object returned in callback

      connection('face')
        .insert({ body })
        .then(result => {
          console.log(result);
          connection.destroy();
          callback(null, result);
        })
        .catch(err => {
          console.log(err);
          connection.destroy();
          callback(err, null);
        });


      // let { Link, Tag, FaceID, Name } = body;
      // let queryFields = '(Link, Tag, FaceID, Name)';
      // let queryValues = `('${Link}', '${Tag}', '${FaceID}', '${Name}')`;
      // let query = 'INSERT INTO face ' + queryFields + ' VALUES ' + queryValues;
      // connection.query(query, function (err, rows, fields) {
      //   if (!err) {
      //     connection.end();
      //     // callback(null, rows);

      //   } else {
      //     console.log('error with the postIndexedPhoto query');
      //     console.log(err);
      //     connection.end();
      //     // callback(err, rows);
      //   }
      // });
    }
  });
};

module.exports.getIndexedPhotos = function (callback) {
  db.createConnection(function (err, connection) {
    if (err) {
      console.log('Error while performing common connect query: ' + err);
      callback(err, null);
    } else {
      //process the i/o after successful connect.  Connection object returned in callback

      connection('face')
        .select()
        .then(result => {
          connection.destroy();
          callback(null, result);
        })
        .catch(err => {
          console.log('error with the getIndexedPhotos query');
          connection.destroy();
          callback(err, null);
        });
    }
  });
};
