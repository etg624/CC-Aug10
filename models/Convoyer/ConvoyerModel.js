var db = require('../db');


// GETS ALL THE GUARDS WITH A CURRENT SHIFT
module.exports.getAllGuards = function (callback) {
    //get a connection using the common handler in models/db.js
    db.createConnection(function (err, reslt) {
        if (err) {

            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = ' SELECT FirstName, LastName, DeviceToken, GuardID, CurrentPatrol, CurrentCoord FROM patrol_guard_coordinate WHERE CurrentCoord = 1 AND CurrentPatrol = 1 GROUP BY GuardID; ';
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    console.log(rows);
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

// GETS ALL THE GUARDS WITH A CURRENT SHIFT (FOR SENDING NOTIFICATIONS -- does not ask for currentCoord = 1 to avoid async issues between foxwatch and greyfox)
module.exports.getGuardsForNotifications = function (callback) {
    //get a connection using the common handler in models/db.js
    db.createConnection(function (err, reslt) {
        if (err) {

            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = ' SELECT FirstName, LastName, DeviceToken, GuardID, CurrentPatrol FROM patrol_guard WHERE CurrentPatrol = 1 GROUP BY GuardID; ';
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    console.log(rows);
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

// GETS ALL THE INCIDENTS IN THE CURRENT SHIFT
module.exports.getAllIncidents = function (callback) {


    //get a connection using the common handler in models/db.js
    db.createConnection(function (err, reslt) {
        if (err) {

            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = 'SELECT IncidentID, Description, Type, lat,  lng, CurrentPatrol, IncidentID FROM incident_patrol WHERE CurrentPatrol = 1';
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

// GETS ALL THE LOCATIONS IN THE CURRENT SHIFT
module.exports.getCurrentLocations = function (callback) {


    //get a connection using the common handler in models/db.js
    db.createConnection(function (err, reslt) {
        if (err) {

            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = 'SELECT lat, lng, GuardID, FirstName, LastName, DeviceToken, PatrolID FROM patrol_guard_coordinate WHERE CurrentCoord = 1 AND CurrentPatrol = 1';
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

// GETS ALL THE PATROLS IN THE CURRENT SHIFT
module.exports.getCurrentPatrols = function (callback) {

    //get a connection using the common handler in models/db.js
    db.createConnection(function (err, reslt) {
        if (err) {

            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = 'SELECT PatrolID FROM patrol WHERE CurrentPatrol = 1;';
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log('error with the patrol query');
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}

// GETS ALL THE COORDS IN THE CURRENT SHIFT
module.exports.getCurrentCoords = function (callback) {

    //get a connection using the common handler in models/db.js
    db.createConnection(function (err, reslt) {
        if (err) {

            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = 'SELECT Sequence, lat, lng, PatrolID FROM coordinate_patrol WHERE CurrentPatrol = 1 ORDER BY Sequence ASC;';
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log('error with the coord query');
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}

// GETS ALL THE PATROLS IN THE CURRENT SHIFT
module.exports.getCurrentRoutes = function (callback) {


    //get a connection using the common handler in models/db.js
    db.createConnection(function (err, reslt) {
        if (err) {

            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = 'SELECT RouteID FROM route WHERE QueuePosition = 1;';
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log('error with the route query');
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}

// GETS ALL THE COORDS IN THE CURRENT SHIFT
module.exports.getCurrentCheckpoints = function (callback) {

    //get a connection using the common handler in models/db.js
    db.createConnection(function (err, reslt) {
        if (err) {

            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = 'SELECT Sequence, lat, lng, RouteID FROM checkpoint_route WHERE QueuePosition = 1 ORDER BY Sequence ASC;';
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log('error with the checkpoint query');
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}






