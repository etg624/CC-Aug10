var express = require('express');
var router = express.Router();
var PatrolAreaModel = require('../../models/Convoyer/PatrolAreaModel');

module.exports.getAllPatrolAreas = function (req, res) {
  PatrolAreaModel.getAllPatrolAreas(function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.getPatrolAreaByID = function (req, res) {
  PatrolAreaModel.getPatrolAreaByID(req.params.id, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.addPatrolArea = function (req, res) {
  PatrolAreaModel.addPatrolArea(req.body, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.deletePatrolArea = function (req, res) {
  PatrolAreaModel.deletePatrolArea(req.params.id, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.updatePatrolArea = function (req, res) {
  PatrolAreaModel.updatePatrolArea(req.body, function (err, result) {
    if (err) {
      res.end();
    }
    else {
      res.end();
    }
  });
};