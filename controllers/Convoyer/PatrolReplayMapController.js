require('dotenv').config();

var PatrolReplayMapModel = require('../../models/Convoyer/PatrolReplayMapModel');

module.exports.getPatrolReplayMap = (function (req, res) {


  PatrolReplayMapModel.getPatrolReplayMap(req.params.id, function (err, getPatrolReplayMapResult) {
    if (err) {
      res.end();
    } else {
      PatrolReplayMapModel.getIncidents(req.params.id, function (err, getIncidentsResult){
        if (err){
          res.end();
        } else {
          res.render('PatrolReplayMapView', { title: 'Patrol Replay Map', getPatrolReplayMapResult: getPatrolReplayMapResult, getIncidentsResult: getIncidentsResult, mapKey: process.env.MAP_KEY});
        }
      })              
            }
          })
        });

