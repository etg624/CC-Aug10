var db = require("../db");



module.exports.getAllRoutes = function (callback) {

    db.createConnection(function (err, reslt) {
        if (err) {
            console.log("Error while performing common connect query: " + err);
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = " Select * from route; ";
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log("error with the query");
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });


}

module.exports.getCurrentRoutes = function (id, callback) {
    db.createConnection(function (err, reslt) {
        if (err) {
            console.log("Error while performing common connect query: " + err);
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = "Select * from route where QueuePosition >  0 AND GuardID = '" + id + "' ORDER BY QueuePosition ASC ;";
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log("error with the query");
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}

module.exports.getRouteByID = function (id, callback) {
    db.createConnection(function (err, reslt) {
        if (err) {
            console.log("Error while performing common connect query: " + err);
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = " Select * from route where RouteID = " + id + ";";
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log("error with the query");
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}

module.exports.addRoute = function (Route, callback) {

    db.createConnection(function (err, reslt) {
        if (err) {
            console.log("Error while performing common connect query: " + err);
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = "Insert into route values ('" + Route.RouteID + "', '" + Route.RouteName + "', " + Route.QueuePosition + ", '" + Route.GuardID + "');";
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log("error with the query");
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}

module.exports.saveRoute = function (Route, callback) {

    db.createConnection(function (err, reslt) {
        if (err) {
            console.log("Error while performing common connect query: " + err);
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = "Insert into route values ('" + Route.RouteID + "', '" + Route.RouteName + "', " + Route.QueuePosition + ", '" + "');";
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log("error with the query");
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}

module.exports.deleteRoute = function (id, callback) {
    db.createConnection(function (err, reslt) {
        if (err) {
            console.log("Error while performing common connect query: " + err);
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = " DELETE FROM route WHERE RouteID = '" + id + "';";
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}

module.exports.updateRoute = function (Route, callback) {

    db.createConnection(function (err, reslt) {
        if (err) {

            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;


            console.log('logging Route from updateRoute ' + JSON.stringify(Route));

            // here we set all other routes to 0
            var strSQL = "Update route SET QueuePosition = 0  WHERE GuardID = '" + Route.GuardID + "';";
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    // connection.end();
                    callback(null, rows);
                    // here we will set our selected route to 1
                    var strSQL2 = "Update route SET QueuePosition = " + Route.QueuePosition + ", GuardID = '" + Route.GuardID + "' WHERE RouteID = '" + Route.RouteID + "';";
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


module.exports.queueRoute = function (Route, callback) {
    db.createConnection(function (err, reslt) {
        if (err) {
            console.log("Error while performing common connect query: " + err);
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = "Update route SET QueuePosition = " + Route.QueuePosition + ", GuardID = '" + Route.GuardID + "'  WHERE RouteID = '" + Route.RouteID + "';";
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}



module.exports.disableRoutes = function (Route, callback) {

    db.createConnection(function (err, reslt) {
        if (err) {

            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;


            // here we set all other routes to 0
            var strSQL = "Update route SET QueuePosition = 0 WHERE GuardID = '" + Route.GuardID + "';";
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    // connection.end();
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




// for now, clicking save will set whatever route is on VIXEN's screen 
// as the current route
// FOXWATCH will see this route and load it on the guard's view

//need several things to get this to work:

// make sure updateRoute is doing everything properly               √
// make sure addRoute is doing everything properly                  √
// make sure getCurrentRoute is doing everything properly           √
// need to set up GuardPatrols view to do all this stuff            
// need to prep FOXWATCH for all this