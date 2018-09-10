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


const nameDoesNotAlreadyExist = function (existingTags, newTagName) {

    for (let i = 0; i < existingTags.length; i++) {
        console.log(existingTags[i].TagName)

        if (newTagName == existingTags[i].TagName) {
            console.log('An existing tag with that name exists.')
            return false;
        }
    }

    return true;

}


exports.renderTagManager = function (req, res) {
  
    TagManagerModel.getAllTags(function (err, getAllTagsResults) {
      if (err) {
        res.end();
        console.log(err);
      } else {
        res.render('TagManagerView', { getAllTagsResults, serverAddress });
      }
    })
  }

exports.addTag = function (req, res) {


    let TagID = CreateRandom.create();
    let { TagName, FaceID } = req.body;
    let json = {
        TagName: TagName,
        FaceID: FaceID,
        TagID: TagID
    }

    TagManagerModel.getAllTags(function (err, getAllTagsResult) {
        if (err) {
            res.json(err);
            console.log(err);

        } else {

            if (nameDoesNotAlreadyExist(getAllTagsResult, TagName)) {
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
                                res.end();
                                console.log(assignTagResult);
                            }
                        })
                    }
                })
            } else {
                res.send('An existing tag with that name already exists');
            }
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

exports.removeAssignedTag = function (req, res) {
    console.log('removeAssignedTag called from controller');
    TagManagerModel.removeTag(req.body, function (err, removeTagResult) {
        if (err) {
            res.json(err);
            console.log(err);
        } else {
            res.json(removeTagResult)
            console.log(removeTagResult);
        }
    })
}


exports.getAllTags = function (req, res){
    TagManagerModel.getAllTags(function (err, getAllTagsResult){
        if (err){
            console.log(err);
            res.json(err);
        } else {
            res.json(getAllTagsResult);
        }

    });
}