var express = require('express');
var router = express.Router();
var PatrolModel = require('../../models/Convoyer/PatrolModel');

module.exports.getAllPatrols = function (req, res) {
  PatrolModel.getAllPatrols(function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.getPatrolByID = function (req, res) {
  PatrolModel.getPatrolByID(req.params.id, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.addPatrol = function (req, res) {
  PatrolModel.addPatrol(req.body, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.updatePatrol = function (req, res) {
  PatrolModel.updatePatrol(req.body, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.deletePatrol = function (req, res) {
  PatrolModel.deletePatrol(req.params.id, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.patrolList = function (req, res) {
  PatrolModel.patrolList(function (err, results) {
    if (err) {
      res.json(err);
    }
    else {
      res.render('PatrolListView', { title: 'Patrol History', results: results });
    }
  });
};


