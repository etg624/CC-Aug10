var fs = require('fs');
var path = require('path');
// var process = require( "process" ); -- I removed this as i believe it is globally availble object
var db = require('../models/db');
var archiver = require('archiver');
const TagModel = require('../models/TagModel');
var CreateRandom = require('../CreateRandom');

// ###### Tues Aug 14 11:36:14 PDT 2018 David
const { fork } = require('child_process');

let serverAddress = process.env.SERVER_ADDRESS;


///////////////////////////////////////////////////////////////////
//** handler for indexing photos into rekognition collection //////
///////////////////////////////////////////////////////////////////

exports.addTag = function (req, res) {


    let TagID = CreateRandom.create();
    let { TagName, FaceID } = req.body;
    let json = {
        TagName: TagName,
        FaceID: FaceID,
        TagID: TagID
    }

    TagModel.addTag(json, function (err, addTagResult) {
        if (err) {
            res.json(err);
            console.log(err);
        } else {

            TagModel.assignTag(json, function (err, assignTagResult) {
                if (err) {
                    res.json(err);
                    console.log(err);
                } else {
                    res.json(addTagResult);
                    console.log(assignTagResult);
                }
            })
        }
    })
}

exports.assignTag = function (req, res) {
    TagModel.assignTag(req.body, function (err, assignTagResult) {
        if (err) {
            res.json(err);
            console.log(err);
        } else {
            res.json(assignTagResult);
            console.log(assignTagResult);
        }
    })
}

exports.removeAssignedTag = function (req, res) {
    console.log('removeAssignedTag called from controller');
    TagModel.removeTag(req.body, function (err, removeTagResult) {
        if (err) {
            res.json(err);
            console.log(err);
        } else {
            res.json(removeTagResult)
            console.log(removeTagResult);
        }
    })
}

exports.getTagsByFace = function (req, res) {
    TagModel.getTagsByFace(req.params.faceid, function (err, getTagsByFaceResult) {
        if (err) {
            res.json(err);
            console.log(err);
        } else {
            res.json(getTagsByFaceResult);
            console.log(getTagsByFaceResult);
        }
    })
}