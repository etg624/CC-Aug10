var express = require('express');
var router = express.Router();
var RouteModel = require('../../models/Convoyer/RouteModel');

module.exports.getAllRoutes = function (req, res) {
  RouteModel.getAllRoutes(function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.getRouteByID = function (req, res) {
  RouteModel.getRouteByID(req.params.id, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.getCurrentRoutes = function (req, res) {
  RouteModel.getCurrentRoutes(req.params.id, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.addRoute = function (req, res) {
  RouteModel.addRoute(req.body, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
      RouteModel.updateRoute(req.body, function (err, res) {
        if (res) {
           console.log(res);
        } else {
          console.log(err);
        }
      });
    }
  });
};

module.exports.saveRoute = function (req, res) {
  RouteModel.saveRoute(req.body, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.deleteRoute = function (req, res) {
  RouteModel.deleteRoute(req.params.id, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.updateRoute = function (req, res) {
  RouteModel.updateRoute(req.body, function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(result);
    }
  });
};

module.exports.queueRoute = function (req, res) {
  RouteModel.queueRoute(req.body, function (err, result) {
    if (err) {
      res.json(err);
      console.log(err);
    }
    else {
      res.json(result);
      console.log(result);
    }
  });
};

module.exports.disableRoutes = function (req, res) {
  RouteModel.disableRoutes(req.body, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};



