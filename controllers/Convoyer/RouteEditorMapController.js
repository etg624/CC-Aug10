require('dotenv').config();

var RouteEditorMapModel = require('../../models/Convoyer/RouteEditorMapModel');

module.exports.getRouteEditorMap = (function (req, res) {


  RouteEditorMapModel.getAllRoutes(function (err, getAllRoutesResult) {
    if (err) {
      res.end();
    } else {
      RouteEditorMapModel.getAllGuards(function (err, getAllGuardsResult) {
        if (err) {
          res.end();
        } else {

          RouteEditorMapModel.getAllPatrolAreas(function (err, getAllPatrolAreasResult) {
            if (err) {

            } else {
              res.render('RouteEditorMapView', { title: 'Route Editor Map', getAllGuardsResult: getAllGuardsResult, getAllRoutesResult: getAllRoutesResult, getAllPatrolAreasResult: getAllPatrolAreasResult, mapKey: process.env.MAP_KEY });
            }
          })


        }
      });
    }
  });

});



