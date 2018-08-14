var express = require('express');
var router = express.Router();
var CheckpointModel = require('../../models/Convoyer/CheckpointModel');

module.exports.getAllCheckpoints = function (req, res) {
  CheckpointModel.getAllCheckpoints(function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.getCheckpointByID = function (req, res) {
  CheckpointModel.getCheckpointByID(req.params.id, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.addCheckpoint = function (req, res) {
  CheckpointModel.addCheckpoint(req.body, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.deleteCheckpoint = function (req, res) {
  CheckpointModel.deleteCheckpoint(req.params.id, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.updateCheckpoint = function (req, res) {
  CheckpointModel.updateCheckpoint(req.params.id, req.body, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};