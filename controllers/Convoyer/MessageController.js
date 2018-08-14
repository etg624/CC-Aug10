var express = require('express');
var router = express.Router();
var MessageModel = require('../../models/Convoyer/MessageModel');

module.exports.getAllMessages = function (req, res) {
    MessageModel.getAllMessages(function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
};

module.exports.addMessage = function (req, res) {
    MessageModel.addMessage(req.body, function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
};


