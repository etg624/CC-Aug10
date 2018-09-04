var fs = require('fs');
var path = require('path');
// var process = require( "process" ); -- I removed this as i believe it is globally availble object
var db = require('../models/db');
var archiver = require('archiver');
const TagManagerModel = require('../models/TagManagerModel');
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

    TagManagerModel.addTag(json, function (err, addTagResult) {
        if (err) {
            res.json(err);
            console.log(err);
        } else {

            TagManagerModel.assignTag(json, function (err, assignTagResult) {
                if (err) {
                    res.json(err);
                    console.log(err);
                } else {
                    res.json(addTagResult);
                    console.log(addTagResult);
                }
            })
        }
    })
}

exports.assignTag = function (req, res) {
    TagManagerModel.assignTag(req.body, function (err, assignTagResult) {
        if (err) {
            res.json(err);
            console.log(err);
        } else {
            res.json(assignTagResult);
            console.log(assignTagResult);
        }
    })
}

exports.deleteAssignedTag = function (req, res) {
    console.log('deleteAssignedTag called from controller');
    TagManagerModel.deleteTag(req.body, function (err, deleteTagResult) {
        if (err) {
            res.json(err);
            console.log(err);
        } else {
            res.json(deleteTagResult)
            console.log(deleteTagResult);
        }
    })
}

exports.getTagsByFace = function (req, res) {
    TagManagerModel.getTagsByFace(req.params.faceid, function (err, getTagsByFaceResult) {
        if (err) {
            res.json(err);
            console.log(err);
        } else {
            res.json(getTagsByFaceResult);
            console.log(getTagsByFaceResult);
        }
    })
}