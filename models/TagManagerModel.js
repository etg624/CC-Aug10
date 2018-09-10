const db = require('./db');
const CreateRandom = require('../CreateRandom');
const datetime = require('../controllers/datetime');

module.exports.addTag = function (Tag, callback) {

    db.createConnection(function (err, addTagResult) {
        if (err) {
            callback(err, null);
        } else {
            var connection = addTagResult;

            
            let { TagName, TagID } = Tag;
            let time = datetime.syncCurrentDateTimeforDB();

            let queryFields = '(TagID, TagName, TimeCreated)';
            let queryValues = `('${TagID}', '${TagName}', '${time}')`;
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

// module.exports.assignTag = function (Tag, callback) {

//     db.createConnection(function (err, addTagResult) {
//         if (err) {
//             callback(err, null);
//         } else {
//             var connection = addTagResult;

//             let { TagID, FaceID } = Tag;

//             let queryFields = '(TagID, FaceID)';
//             let queryValues = `('${TagID}', '${FaceID}')`;
//             let query = 'INSERT INTO tag_assigned ' + queryFields + ' VALUES ' + queryValues + ';'
//             console.log(query);

//             connection.query(query, function (err, rows) {
//                 if (!err) {
//                     connection.end();
//                     callback(null, rows);

//                 } else {
//                     console.log('error with the query');
//                     connection.end();
//                     callback(err, rows);
//                 }
//             });
//         }
//     });
// }

module.exports.assignTag = function (Tag, callback) {

    db.createConnection(function (err, addTagResult) {
        if (err) {
            callback(err, null);
        } else {
            var connection = addTagResult;

            let { TagName, TagID } = Tag;

            let queryFields = '(TagID, TagName)';
            let queryValues = `('${TagID}', '${TagName}')`;
            let query = 'INSERT INTO tag' + queryFields + ' VALUES ' + queryValues + ';'
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

module.exports.getAssignedTags = function (id, callback) {

    db.createConnection(function (err, getAssignedTagsResults) {
        if (err) {
            callback(err, null);
        } else {
            var connection = getAssignedTagsResults;


            let queryField = '(TagName)';
            let queryValue = `'${id}'`;
            let query = `SELECT * FROM tag WHERE ${queryField} =  ${queryValue}`;
            console.log('logging getAssignedTags query');
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

module.exports.getAllTags = function (callback) {

    db.createConnection(function (err, getAllTagsResult) {
        if (err) {
            callback(err, null);
        } else {
            var connection = getAllTagsResult;

            let query = `SELECT * FROM tag`;
            console.log('logging getAssignedTags query');
            console.log(query);

            connection.query(query, function (err, rows) {
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

module.exports.removeTag = function (Body, callback) {

    db.createConnection(function (err, getDeletedTagsResult) {
        if (err) {
            callback(err, null);
        } else {
            var connection = getDeletedTagsResult;

            let query = `DELETE FROM tag WHERE TagID= "${Body.TagID}" AND FaceID= "${Body.TagName}" ;`
            console.log('logging getDeletedTags query');
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

module.exports.getTagsByFace = function (faceid, callback) {
    db.createConnection(function (err, getAllTagsResult) {
        if (err) {
            callback(err, null);
        } else {
            var connection = getAllTagsResult;

            let query = `SELECT * FROM face_tag_tag_assigned WHERE faceid = '${faceid}'`;
            console.log('logging getAssignedTags query');
            console.log(query);

            connection.query(query, function (err, rows) {
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
