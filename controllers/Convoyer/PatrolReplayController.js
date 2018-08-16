var PatrolReplayModel = require('../../models/Convoyer/PatrolReplayModel');
var serverAddress = process.env.SERVER_ADDRESS;

module.exports.getPatrolReplay = (function (req, res) {




  PatrolReplayModel.getPatrolReplay(req.params.id, function (err, getPatrolReplayResult) {
    if (err) {
      res.end();
    } else {

      PatrolReplayModel.getIncidents(req.params.id, function (err, getIncidentsResult) {
        if (err) {

        } else {
          res.render('PatrolReplayView', { title: 'Patrol Replay', getPatrolReplayResult: getPatrolReplayResult, getIncidentsResult: getIncidentsResult, serverAddress });
        }
      })
    }
  })
});

