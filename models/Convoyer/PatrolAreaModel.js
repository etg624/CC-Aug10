var db = require('../db');



module.exports.getAllPatrolAreas = function (callback) {

    db.createConnection(function (err, reslt) {
        if (err) {

            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = ' Select * from patrolarea; ';
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


module.exports.getPatrolAreaByID = function (id, callback) {
    db.createConnection(function (err, reslt) {
        if (err) {

            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = ' Select * from patrolarea where PatrolAreaID = "' + id + '";';
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


module.exports.addPatrolArea = function (PatrolArea, callback) {

    db.createConnection(function (err, reslt) {
        if (err) {

            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = "Insert into patrolarea values ('" + PatrolArea.AreaID + "', '" + PatrolArea.AreaName + "', '" + PatrolArea.lat + "', '" + PatrolArea.lng + "', " + PatrolArea.CurrentArea + ");";
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

module.exports.deletePatrolArea = function (id, callback) {

    db.createConnection(function (err, reslt) {
        if (err) {

            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = ' delete from patrolarea where AreaID = "' + id + '";';
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

module.exports.updatePatrolArea = function (PatrolArea, callback) {

    db.createConnection(function (err, reslt) {
        if (err) {

            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;


            var strSQL = "Update patrolarea SET CurrentArea = " + PatrolArea.NotCurrentArea + " WHERE NOT AreaID = '" + PatrolArea.AreaID + "';";
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    // connection.end();
                    // callback(null, rows);
                    // here we will set our selected route to 1
                    var strSQL2 = "Update patrolarea SET CurrentArea = " + PatrolArea.CurrentArea + " WHERE AreaID = '" + PatrolArea.AreaID + "';";
                    connection.query(strSQL2, function (err, rows, fields) {
                        if (!err) {
                            connection.end();
                            callback(null, rows);
                        } else {
                            console.log('error with the query');
                            connection.end();
                            callback(err, rows);
                        }

                    });


                } else {
                    console.log('error with the query');
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });

}




