var express = require('express');
var router = express.Router();
var IncidentModel = require('../../models/Convoyer/IncidentModel');

module.exports.getAllIncidents = function (req, res) {
  IncidentModel.getAllIncidents(function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.getIncidentByID = function (req, res) {
  IncidentModel.getIncidentByID(req.params.id, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.addIncident = function (req, res) {
  IncidentModel.addIncident(req.body, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.deleteIncident = function (req, res) {
  IncidentModel.deleteIncident(req.params.id, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.updateIncident = function (req, res) {
  IncidentModel.updateIncident(req.params.id,req.body, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.incidentList = function (req, res) {
  IncidentModel.getAllIncidentsByGuard(function (err, results) {
    if (err) {
      res.json(err);
    }
    else {
      res.render('IncidentListView', { title: 'Incident History', results: results });
    }
  });
};
