var db = require('../db');


module.exports.getIncidentByID = function (id, callback) {
    db.createConnection(function (err, reslt) {
        if (err) {
            
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = " Select * from patrol_incident where IncidentID = '" + id + "';";
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log('error with the convoyer query');
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}