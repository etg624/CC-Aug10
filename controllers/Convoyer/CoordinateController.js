var express = require('express');
var router = express.Router();
var CoordinateModel = require('../../models/Convoyer/CoordinateModel');

module.exports.getAllCoordinates = function (req, res) {
  CoordinateModel.getAllCoordinates(function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.getCoordinateByID = function (req, res) {
  CoordinateModel.getCoordinateByID(req.params.id, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.addCoordinate = function (req, res) {
  CoordinateModel.addCoordinate(req.body, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.deleteCoordinate = function (req, res) {
  CoordinateModel.deleteCoordinate(req.params.id, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.updateCoordinate = function (req, res) {
  CoordinateModel.updateCoordinate(req.body, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};