var db = require('../db');
var datetime = require('../../controllers/datetime');



module.exports.getAllCoordinates = function (callback) {

    db.createConnection(function (err, reslt) {
        if (err) {

            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = ' Select * from coordinate; ';
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log('error with the query');
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });


}


module.exportsgetCoordinateByID = function (id, callback) {
    db.createConnection(function (err, reslt) {
        if (err) {

            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = " Select * from coordinate where CoordID = '" + id + "';";
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log('error with the query');
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}


module.exports.addCoordinate = function (Coordinate, callback) {

    db.createConnection(function (err, reslt) {
        if (err) {

            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;
            var date = datetime.syncCurrentDateTimeforDB();


            var strSQL = "Insert into coordinate values ('" + Coordinate.CoordID + "', '" + Coordinate.Sequence + "', '" + Coordinate.lat + "', '" + Coordinate.lng + "', '" + Coordinate.PatrolID + "', " + Coordinate.CurrentCoord + ", '" + date + "' );";
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log('error with the add coordinate query');
                    console.log(err);
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}

module.exports.deleteCoordinate = function (id, callback) {

    db.createConnection(function (err, reslt) {
        if (err) {

            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = " delete from coordinate where PatrolID = '" + id + "';";
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    console.log('logging coord delete response');
                    console.log(rows);
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log('error with query');
                    console.log(err);
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}

module.exports.updateCoordinate = function (Coordinate, callback) {

    db.createConnection(function (err, reslt) {
        if (err) {

            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = "Update patrol_guard_coordinate SET CurrentCoord = " + Coordinate.CurrentCoord + " WHERE GuardID = '" + Coordinate.GuardID + "';";
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log('error with the query');
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });

}






