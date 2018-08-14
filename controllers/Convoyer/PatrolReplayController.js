var PatrolReplayModel = require('../../models/Convoyer/PatrolReplayModel');

module.exports.getPatrolReplay = (function (req, res) {


  PatrolReplayModel.getPatrolReplay(req.params.id, function (err, getPatrolReplayResult) {
    if (err) {
      res.end();
    } else {

      PatrolReplayModel.getIncidents(req.params.id, function (err, getIncidentsResult) {
        if (err) {

        } else {
          res.render('PatrolReplayView', { title: 'Patrol Replay', getPatrolReplayResult: getPatrolReplayResult, getIncidentsResult: getIncidentsResult });
        }
      })
    }
  })
});

