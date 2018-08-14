var db = require('../db');
var datetime = require('../../controllers/datetime');


module.exports.getAllPatrols = function (callback) {

    db.createConnection(function (err, reslt) {
        if (err) {
            
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = ' Select * from Patrol; ';
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


module.exports.getPatrolByID = function (id, callback) {
    db.createConnection(function (err, reslt) {
        if (err) {
            
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = " Select * from patrol where PatrolID = '" + id + "';";
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


module.exports.addPatrol = function (Patrol, callback) {

    db.createConnection(function (err, reslt) {
        if (err) {
            
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            let date = datetime.syncCurrentDateTimeforDB();

            var strSQL = "Insert into patrol values ('" + Patrol.PatrolID + "', '" + Patrol.GuardID + "', " + Patrol.CurrentPatrol + ", '" + date + "', ''  );";
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log('error with the addPatrol query');
                    console.log(err);
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}

module.exports.deletePatrol = function (id, callback) {

    db.createConnection(function (err, reslt) {
        if (err) {
            
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = " delete from patrol where PatrolID = '" + id + "';";
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

module.exports.updatePatrol = function (Patrol, callback) {

    db.createConnection(function (err, reslt) {
        if (err) {
            
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            // here we set all other Patrols to 0
            var strSQL = "Update Patrol SET CurrentPatrol = " + Patrol.CurrentPatrol + " WHERE GuardID = '" + Patrol.GuardID + "';";
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    // connection.end();
                    // callback(null, rows);
                    
                    let date = datetime.syncCurrentDateTimeforDB();

                    var strSQL2 = "Update Patrol SET End = '" + date + "' WHERE PatrolID = '" + Patrol.PatrolID + "';";
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

module.exports.patrolList = function (callback){

    db.createConnection(function (err, reslt) {
        if (err) {
            
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = 'SELECT * FROM patrol_incident_guard_coord_bypatrol;';
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
