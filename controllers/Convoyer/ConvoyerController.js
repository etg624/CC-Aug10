var ConvoyerModel = require('../../models/Convoyer/ConvoyerModel');

module.exports.getConvoyer = (function (req, res) {

  var serverAddress = process.env.SERVER_ADDRESS;

  ConvoyerModel.getAllGuards(function (err, getAllGuardsResult) {

    if (err) {
      res.json(err);
    }
    else {

      ConvoyerModel.getCurrentCoords(function (err, getCurrentCoordsResult) {
        if (err) {
          res.json(err);
        }
        else {
          ConvoyerModel.getAllIncidents(function (err, getAllIncidentsResult) {
            if (err) {
              res.json(err);
            }
            else {
              ConvoyerModel.getCurrentLocations(function (err, getCurrentLocationsResult) {
                if (err) {
                  res.json(err);
                }
                else {
                  ConvoyerModel.getCurrentPatrols(function (err, getCurrentPatrolsResult) {
                    if (err) {
                      res.json(err);
                    }
                    else {
                      ConvoyerModel.getCurrentRoutes(function (err, getCurrentRoutesResult) {
                        if (err) {
                          res.json(err);
                        } else {
                          ConvoyerModel.getCurrentCheckpoints(function (err, getCurrentCheckpointsResult) {
                            if (err) {
                              res.json(err);
                            } else {
                              console.log('logging getallguards from guardpatrols');
                              console.log(getAllGuardsResult);
                              res.render('ConvoyerView', { title: 'Convoyer Live View', getAllGuardsResult, getCurrentCoordsResult, getAllIncidentsResult, getCurrentLocationsResult: getCurrentLocationsResult, getCurrentPatrolsResult: getCurrentPatrolsResult, getCurrentRoutesResult: getCurrentRoutesResult, getCurrentCheckpointsResult: getCurrentCheckpointsResult, serverAddress});
                      
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});

module.exports.getActiveGuards = (function (req, res) {

  ConvoyerModel.getAllGuards(function (err, getAllGuardsResult) {

    if (err) {
      res.json(err);
    }
    else {
      res.json(getAllGuardsResult);
    }

  });

});

module.exports.getGuardsForNotifications = (function (req, res) {

  ConvoyerModel.getGuardsForNotifications(function (err, getGuardsResult) {

    if (err) {
      res.json(err);
    }
    else {
      res.json(getGuardsResult);
    }

  });

});









//=========================== VERIFIED SQL STATEMENTS √ =====================================

    // *************    SHOW GUARD NAMES ON MAP

    // CREATE VIEW allguards
    // AS SELECT g.FirstName, g.LastName, g.DeviceToken, g.GuardID, p.PatrolID,  p.CurrentPatrol
    // FROM guard g
    // INNER JOIN patrol p ON g.GuardID = p.GuardID;

    //  SELECT FirstName, LastName, CurrentPatrol FROM allguards WHERE CurrentPatrol = 1;

    // *************    SHOW CURRENT COORDS ON MAP

    // CREATE VIEW coordinate_patrol
    // AS SELECT c.Sequence, c.lat, c.lng, p.CurrentPatrol, p.PatrolID, p.GuardID
    // FROM coordinate c
    // INNER JOIN patrol p ON c.PatrolID = p.PatrolID;

    // SELECT Sequence, lat, lng, CurrentPatrol FROM coordinate_patrol WHERE CurrentPatrol = 1;


    // *************    SHOW ALL INCIDENTS ON MAP
/**
 
 
    CREATE VIEW coordinate_patrol
    AS SELECT i.IncidentID, i.Description, i.Type, i.lat, i.lng, p.CurrentPatrol, i.Media, i.Time, p.PatrolID, p.GuardID
    FROM incident i
    INNER JOIN patrol p ON i.PatrolID = p.PatrolID;

    // *************    SHOW ALL INCIDENTS AND GUARD
*/
    /**
     
    CREATE VIEW patrol_incident_guard
    AS SELECT i.IncidentID, i.Description, i.Type, i.lat, i.lng, i.CurrentPatrol, i.Media, i.Time, i.PatrolID,
    g.GuardID, g.UserName, g.FirstName, g.LastName, g.EmpID, g.Status, g.UserEmail, g.DeviceToken, g.LoggedIn

    FROM coordinate_patrol i
    INNER JOIN guard g ON i.GuardID = g.GuardID
      
     
     */

/**
 * 
 *   SHOW ALL ROUTES ON MAP 
    CREATE VIEW checkpoint_route
    AS SELECT c.Sequence, c.lat, c.lng, r.QueuePosition, r.RouteID
    FROM checkpoint c
    INNER JOIN route r ON c.RouteID = r.RouteID;

    // SELECT Sequence, lat, lng, QueuePosition FROM checkpoint_route WHERE QueuePosition = 1;


    *************    patrol_guard VIEW



    /*

CREATE VIEW patrol_guard
AS SELECT p.CurrentPatrol, p.Start, p.End, g.FirstName, g.LastName, g.DeviceToken, g.GuardID, p.PatrolID, g.LoggedIn
FROM patrol p
INNER JOIN guard g ON p.GuardID = g.GuardID 

    */


    // *************    patrol_guard_coordinate VIEW

    /*

CREATE VIEW patrol_guard_coordinate
AS SELECT  c.Sequence, l.Start, l.End, l.LoggedIn, l.FirstName,  l.LastName, c.CurrentCoord, l.CurrentPatrol, l.GuardID, l.PatrolID, l.DeviceToken, c.lat, c.lng
FROM patrol_guard l
INNER JOIN coordinate c ON l.PatrolID = c.PatrolID 

    **/    


    //=========================== VERIFIED SQL STATEMENTS √ =====================================




