var db = require('../db');



module.exports.getPatrolReplayMap = function (id, callback) {


    db.createConnection(function (err, reslt) {
        if (err) {

            callback(err, null);
        } else {
            var connection = reslt;

            var strSQL = 'SELECT  * FROM patrol_guard_coordinate WHERE PatrolID = "' + id + '" ORDER BY Sequence ;';
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log('error with the incident query');
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}


module.exports.getIncidents = function (id, callback) {


    //get a connection using the common handler in models/db.js
    db.createConnection(function (err, reslt) {
        if (err) {

            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = 'SELECT  * FROM incident WHERE PatrolID = "' + id + '" ORDER BY Time ;';
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log('error with the incident query');
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}




