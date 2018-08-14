require('dotenv').config();

var IncidentDetailMapModel = require('../../models/Convoyer/IncidentDetailMapModel');

module.exports.getIncidentDetailMap = (function (req, res) {


    IncidentDetailMapModel.getIncidentDetailMap(req.params.id, function (err, getIncidentDetailMapResult) {
        if (err) {
            res.end();
        } else {
            res.render('IncidentDetailMapView', { title: 'Incident Detail Map', getIncidentDetailMapResult: getIncidentDetailMapResult, mapKey: process.env.MAP_KEY});

        }
    })


});

