require('dotenv').config();

var ConvoyerMapModel = require('../../models/Convoyer/ConvoyerMapModel');

module.exports.getAllGuardPatrols = (function (req, res) {

  var serverAddress = process.env.SERVER_ADDRESS

  ConvoyerMapModel.getAllGuards(function (err, getAllGuardsResult) {

    if (err) {
      res.json(err);
    }
    else {

      ConvoyerMapModel.getCurrentCoords(function (err, getCurrentCoordsResult) {
        if (err) {
          res.json(err);
        }
        else {
          ConvoyerMapModel.getAllIncidents(function (err, getAllIncidentsResult) {
            if (err) {
              res.json(err);
            }
            else {
              ConvoyerMapModel.getCurrentLocations(function (err, getCurrentLocationsResult) {
                if (err) {
                  res.json(err);
                }
                else {
                  ConvoyerMapModel.getCurrentPatrols(function (err, getCurrentPatrolsResult) {
                    if (err) {
                      res.json(err);
                    }
                    else {
                      ConvoyerMapModel.getCurrentRoutes(function (err, getCurrentRoutesResult) {
                        if (err) {
                          res.json(err);
                        } else {
                          ConvoyerMapModel.getCurrentCheckpoints(function (err, getCurrentCheckpointsResult) {
                            if (err) {
                              res.json(err);
                            } else {

                              ConvoyerMapModel.getCurrentArea(function (err, getCurrentAreaResult)
                            {
                              if (err){
                                res.json(err)
                              } else {
                                res.render('ConvoyerMapView', { title: 'Guard Map', getAllGuardsResult: getAllGuardsResult, getCurrentCoordsResult: getCurrentCoordsResult, getAllIncidentsResult: getAllIncidentsResult, getCurrentLocationsResult: getCurrentLocationsResult, getCurrentPatrolsResult: getCurrentPatrolsResult, getCurrentRoutesResult: getCurrentRoutesResult, getCurrentCheckpointsResult: getCurrentCheckpointsResult, getCurrentAreaResult: getCurrentAreaResult, mapKey: process.env.MAP_KEY, serverAddress});
                              }
                            })

                              
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









//=========================== VERIFIED SQL STATEMENTS √ =====================================

    // *************    SHOW GUARD NAMES ON MAP

    // CREATE VIEW allguards
    // AS SELECT g.FirstName, g.LastName, p.CurrentPatrol
    // FROM guard g
    // INNER JOIN patrol p ON g.GuardID = p.GuardID;

    //  SELECT FirstName, LastName, CurrentPatrol FROM allguards WHERE CurrentPatrol = 1;

    // *************    SHOW CURRENT COORDS ON MAP

    // CREATE VIEW coordinate_patrol
    // AS SELECT c.Sequence, c.lat, c.lng, p.CurrentPatrol, p.PatrolID
    // FROM coordinate c
    // INNER JOIN patrol p ON c.PatrolID = p.PatrolID;

    // SELECT Sequence, lat, lng, CurrentPatrol FROM coordinate_patrol WHERE CurrentPatrol = 1;


    // *************    SHOW ALL INCIDENTS ON MAP

    // CREATE VIEW coordinate_patrol
    // AS SELECT i.IncidentID, i.Description, i.Type, i.lat, i.lng, p.CurrentPatrol
    // FROM incident i
    // INNER JOIN patrol p ON i.PatrolID = p.PatrolID;

    // SELECT IncidentID, Description, Type, lat,  lng, CurrentPatrol FROM coordinate_patrol WHERE CurrentPatrol = 1;

    // *************    SHOW ALL ROUTES ON MAP 


    // CREATE VIEW checkpoint_route
    // AS SELECT c.Sequence, c.lat, c.lng, r.QueuePosition, r.RouteID
    // FROM checkpoint c
    // INNER JOIN route r ON c.RouteID = r.RouteID;

    // SELECT Sequence, lat, lng, QueuePosition FROM checkpoint_route WHERE QueuePosition = 1;

/**
 

    CREATE VIEW lastcardswipes
    AS SELECT iClassNumber, MAX(AttendDate) AS LastSwipeDate FROM mobss.attendance
    GROUP BY iClassNumber

    CREATE VIEW people_lastcardswipes
    AS SELECT l.iClassNumber AS BadgeID, p.LastName, p.FirstName, l.LastSwipeDate
    FROM people p
    INNER JOIN lastcardswipes l ON p.iClassNumber = l.iClassNumber


 */



    //=========================== VERIFIED SQL STATEMENTS √ =====================================




