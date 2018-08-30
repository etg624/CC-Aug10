var db = require('./db');
var CreateRandom = require('../CreateRandom');

module.exports.addTag = function (Tag, callback) {

    db.createConnection(function (err, addTagResult) {
        if (err) {
            callback(err, null);
        } else {
            var connection = addTagResult;

            let {TagName, TagID} = Tag;

            let queryFields = '(TagID, TagName)';
            let queryValues = `('${TagID}', '${TagName}')`;
            let query = 'INSERT INTO tag ' + queryFields + ' VALUES ' + queryValues + ';'
            console.log('logging addTag query');
            console.log(query);

            connection.query(query, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log('error with the query');
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}

module.exports.assignTag = function (Tag, callback) {

    db.createConnection(function (err, addTagResult) {
        if (err) {
            callback(err, null);
        } else {
            var connection = addTagResult;

            let {FaceID, TagID} = Tag;

            let queryFields = '(TagID, FaceID)';
            let queryValues = `('${TagID}', '${FaceID}')`;
            let query = 'INSERT INTO tag_assigned' + queryFields + ' VALUES ' + queryValues + ';'
            console.log('logging assignTag query');
            console.log(query);

            connection.query(query, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log('error with the query');
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}

module.exports.getTags = function(id, callback){

    db.createConnection(function (err, getTagsResult) {
        if (err) {
            callback(err, null);
        } else {
            var connection = getTagsResult;


            let queryField = '(FaceID)';
            let queryValue = `'${id}'`;
            let query = `SELECT * FROM tag_tag_assigned WHERE ${queryField} =  ${queryValue}`;
            console.log('logging getTags query');
            console.log(query);

            connection.query(query, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log('error with the query');
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}
