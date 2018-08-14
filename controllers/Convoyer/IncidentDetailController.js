var IncidentDetailModel = require('../../models/Convoyer/IncidentDetailModel');

module.exports.getIncidentDetails = (function (req, res) {

  IncidentDetailModel.getIncidentByID(req.params.id, function (err, getIncidentResult) {

    if (err) {
      res.json(err);
    }
    else {
      res.render('IncidentDetailView', { title: 'Incident Details', getIncidentResult: getIncidentResult });

    }
  });
});


module.exports.getIncidentPreview = (function (req, res) {

  IncidentDetailModel.getIncidentByID(req.params.id, function (err, getIncidentResult) {

    if (err) {
      res.json(err);
    }
    else {
      res.render('IncidentPreviewView', { title: 'Incident Preview', getIncidentResult: getIncidentResult });

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


    //=========================== VERIFIED SQL STATEMENTS √ =====================================




