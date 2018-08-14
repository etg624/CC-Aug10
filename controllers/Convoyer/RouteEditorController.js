var RouteEditorModel = require('../../models/Convoyer/RouteEditorModel');

module.exports.getRouteEditor = (function (req, res) {


  RouteEditorModel.getAllRoutes(function (err, getAllRoutesResult) {
    if (err) {
      res.end();
    } else {
      RouteEditorModel.getAllGuards(function (err, getAllGuardsResult) {
        if (err) {
          res.end();
        } else {
          RouteEditorModel.getAllPatrolAreas(function (err, getAllPatrolAreasResult){
            if (err) {
              res.end();
            } else {
              res.render('RouteEditorView', { title: 'Route Editor', getAllGuardsResult, getAllRoutesResult, getAllPatrolAreasResult });
            }
          })
          
        }
      });
    }
  });

});









