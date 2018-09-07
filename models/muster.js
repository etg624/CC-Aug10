var datetime = require('fs');
var mysql = require('mysql');
var db = require('./db');


//////////////////////////////////////////////////////////////////////////////
// Get muster records from the attendance data (where EventsType=mustering) //
//////////////////////////////////////////////////////////////////////////////
//###### Wed May 4 18:23:41 PDT 2018  Return the TempID with the callback
module.exports.getMusterRecords = function (id, callback) {
  //get a connection using the common handler in models/db.js
  db.createKnexConnection(function (err, connection) {
    if (err) {
      console.log('Error while performing common connect query: ' + err);
      callback(err, null, null);
    } else {
      //process the i/o after successful connect.  Connection object returned in callback
      //%%%%%%%%%%%%%%%%%%
      //###### Wed May 4 18:23:41 PDT 2018  As well as the regular attendance records, get the muster records sent to the server that were taken for a device-generated muster
      //before that muster was sent up to the server and received another, server generated, ID.  The original EventID of the device-gen
      //muster is stored in a field in the events table, TempID
      //var _sqlQ0 = 'SELECT TempID FROM events WHERE EventID='+id;
      connection('events')
        .where('EventID', id)
        .select('TempID')
        .then(result0 => {
          //###### TODO Send the Temp Device ID to the Screen, then use it later to
          var tempID = '';
          var eventTempID = 'CommandCenter-created muster';
          if (result0[0].TempID == '' || result0[0].TempID == null) {
            // var strSQL = 'SELECT * FROM attendance WHERE EventID=' + id;
            connection('attendance')
              .where('EventID', id)
              .then(result => {
                //feb--send back the results via callback (cant 'return results' from asynch fucntions, have to use calllback)
                connection.destroy();
                callback(null, tempID, result);
              })
              .catch(err => {
                console.log('error with the select mustering query');
                connection.destroy();
                callback(err, tempID);
              });
          } else {
            // var strSQL = 'SELECT * FROM attendance WHERE EventID=' + id + ' or EventID="' + result0[0].TempID + '"';
            eventTempID = 'Device-created muster #' + result0[0].TempID;
            tempID = result0[0].TempID;
            connection('attendance')
              .where('EventID', id)
              .orWhere('EventID', result0[0].TempID)
              .then(result => {
                //feb--send back the results via callback (cant 'return results' from asynch fucntions, have to use calllback)
                connection.destroy();
                callback(null, tempID, result);
              })
              .catch(err => {
                console.log('error with the select mustering query');
                connection.destroy();
                callback(err, tempID);
              });
          }
        })
        .catch(err => {
          console.log('error with the select mustering query');
          connection.destroy();
          callback(err, null);
        });
    } // db if else
  }); // db io end
};


//////////////////////////////////////////////////////////////////////////////
// Get one muster record from the events table (where EventsType=mustering) //
//////////////////////////////////////////////////////////////////////////////
module.exports.getOneMusterRecord = function (id, callback) {
  //get a connection using the common handler in models/db.js
  db.createKnexConnection(function (err, connection) {
    if (err) {
      console.log('Error while performing common connect query: ' + err);
      callback(err, null);
    } else {
      //process the i/o after successful connect.  Connection object returned in callback
      //var strSQL = 'SELECT * FROM events where EventID=' + id;
      connection('events')
        .where('EventID', id)
        .then(result => {
          connection.destroy();
          callback(null, result);
        })
        .catch(err => {
          console.log('error with the select mustering query');
          connection.destroy();
          callback(err, null);
        });
    }
  });
};

//////////////////////////////////////////////////////////////////////////////
// Get muster records from the attendance data (where EventsType=mustering) //
//////////////////////////////////////////////////////////////////////////////
//###### Wed Apr 20 18:27:05 PDT 2018 1. Separate count of unknowns, 2. New attendance field DeviceAuthcode
//###### Wed Apr 20 18:27:05 PDT 2018 Error handle if the query fails
//###### Wed May 4 18:23:41 PDT 2018  Get counts for the TempIDs as well; tempID now sent in parms

module.exports.getMusterCounts = function (id, tempID, callback) {

  //get a connection using the common handler in models/db.js
  db.createKnexConnection(function (err, connection) {
    if (err) {
      console.log('Error while performing common connect query: ' + err);
      callback(err, null);
    } else {
      //In order to sort the muster records by the device that scanned them, select based on MobSSOperator, which now contains
      //the Device Auth Code (as per 324 app changes)
      //var strSQL = 'SELECT MobSSOperator,COUNT(*) as count FROM attendance WHERE EventID='+id+' GROUP BY MobSSOperator ORDER BY count DESC';

      //###### Wed May 4 18:23:41 PDT 2018  Get counts for the TempIDs as well; tempID now sent in parms
      if (tempID == '') {
        // var strSQL = 'SELECT DeviceAuthCode,COUNT(*) as count FROM attendance WHERE EventID=' + id + ' GROUP BY DeviceAuthCode ORDER BY count DESC';
        connection('attendance')
          .where('EventID', id)
          .select('DeviceAuthCode')
          .count('* as count')
          .groupBy('DeviceAuthCode')
          .orderBy('count', 'desc')
          .then(result => {
            attendanceQuerySuccess(result);
          })
          .catch(err => {
            console.log('Error while performing attendance counts query: ' + err);
            connection.destroy();
            callback(err, null);
          });
      } else {
        // var strSQL = 'SELECT DeviceAuthCode,COUNT(*) as count FROM attendance WHERE EventID=' + id + ' or EventID="' + tempID + '" GROUP BY DeviceAuthCode ORDER BY count DESC';
        connection('attendance')
          .where('EventID', id)
          .orWhere('EventID', tempID)
          .select('DeviceAuthCode')
          .count('* as count')
          .groupBy('DeviceAuthCode')
          .orderBy('count', 'desc')
          .then(result => {
            attendanceQuerySuccess(result);
          })
          .catch(err => {
            console.log('Error while performing attendance counts query: ' + err);
            connection.destroy();
            callback(err, null);
          });
      }
    }

    const attendanceQuerySuccess = (attendanceResult) => {
      //feb--send back the results via callback (cant 'return results' from asynch fucntions, have to use calllback)
      var devAuthCode = '';

      // var strSQL1 = 'SELECT PointID, Lat, Lng, Description, DeviceAuthCode FROM musterPoint';
      connection('musterPoint')
        .select('PointID', 'Lat', 'Lng', 'Description', 'DeviceAuthCode')
        .then(musterPointResult => {
          // Loop through the muster point array and match the count array
          var resultsArray = [];

          console.log('logging attendanceResult');
          console.log(attendanceResult);

          console.log('logging musterPointResult');
          console.log(musterPointResult);

          for (var i = 0; i < attendanceResult.length; i++) {
            //console.log('whats the array value  ' + JSON.stringify(resEvacs[i].iClassNumber)); 
            //console.log('whats the muster array length  ' + JSON.stringify(resz1.length)); 
            for (var j = 0; j < musterPointResult.length; j++) {
              if (musterPointResult[j].DeviceAuthCode == attendanceResult[i].DeviceAuthCode) {
                // if (musterPointResult[j].DeviceAuthCode==attendanceResult[i].MobSSOperator) {
                //###### Wed May 4 18:23:41 PDT 2018 If the Lat Lng of muster point is 0, use the default env Lat Lng

                //atn: logic here to use the muster(event) GPS fields rather than the environmental variables
                if (musterPointResult[j].Lat !== 0.000000 || musterPointResult[j].Lng !== 0.000000) {
                  let record = {
                    PointID: musterPointResult[j].PointID,
                    Description: musterPointResult[j].Description,
                    Lat: musterPointResult[j].Lat,
                    Lng: musterPointResult[j].Lng,
                    count: attendanceResult[i].count,
                    DeviceAuthCode: attendanceResult[i].DeviceAuthCode
                  };
                  resultsArray.push(record);
                } else {
                  //######
                  // then use the default environment variable Lat Lng
                  let record = {
                    PointID: musterPointResult[j].PointID,
                    Description: musterPointResult[j].Description,
                    Lat: process.env.LAT,
                    Lng: process.env.LNG,
                    count: attendanceResult[i].count,
                    DeviceAuthCode: attendanceResult[i].DeviceAuthCode
                  };
                  resultsArray.push(record);
                }
              }
            }
          }
          connection.destroy();
          callback(null, resultsArray);
        })
        .catch(err => {
          console.log('Error while performing muster counts query: ' + err);
          connection.destroy();
          callback(err, null);
          // resultsArray[k].MusterPoint = "Unassigned"
          // resultsArray[k].Description = "N/A"
        });
    };
  });
};


//////////////////////////////////////////////////////////////////////////////
// Get counts of unknown checkins from the muster                           //
//////////////////////////////////////////////////////////////////////////////
//###### Wed May 4 18:23:41 PDT 2018  Get counts for the TempIDs as well; tempID now sent in parms

module.exports.getUnknownCount = function (id, tempID, callback) {
  //get a connection using the common handler in models/db.js
  db.createKnexConnection(function (err, connection) {
    if (err) {
      console.log('Error while performing common connect query: ' + err);
      callback(err, null, null);
    } else {
      //process the i/o after successful connect.  Connection object returned in callback

      //###### Wed May 4 18:23:41 PDT 2018  Get counts for the TempIDs as well; tempID now sent in parms
      //var strSQL1 =  'SELECT * FROM attendance where iClassNumber=999999999 AND EventID='+id;
      if (tempID == '') {
        // var strSQL1 = 'SELECT * FROM attendance where iClassNumber=999999999 AND EventID=' + id;
        connection('attendance')
          .where({
            iClassNumber: 999999999,
            EventID: id
          })
          .then(result1 => {
            attendanceQuerySuccess(result1);
          })
          .catch(err => {
            console.log('Error while performing attendance counts query: ' + err);
            connection.destroy();
            callback(err, null);
          });
      } else {
        // var strSQL1 = 'SELECT * FROM attendance where (iClassNumber=999999999) AND (EventID=' + id + ' or EventID="' + tempID + '")';
        connection('attendance')
          .where('iClassNumber', 999999999)
          .andWhere(function () {
            this.where('EventID', id)
              .orWhere('EventID', tempID);
          })
          .then(result1 => {
            attendanceQuerySuccess(result1);
          })
          .catch(err => {
            console.log('Error while performing attendance counts query: ' + err);
            connection.destroy();
            callback(err, null);
          });
      }

      const attendanceQuerySuccess = result1 => {
        //###### Wed May 4 18:23:41 PDT 2018  Get counts for the TempIDs as well; tempID now sent in parms
        //var strSQL2 =  'SELECT * FROM attendance where EmpID="invalid" AND EventID='+id;
        if (tempID == '') {
          // var strSQL2 = 'SELECT * FROM attendance where EmpID="invalid" AND EventID=' + id;
          connection('attendance')
            .where({
              EmpID: 'invalid',
              EventID: id
            })
            .then(result2 => {
              connection.destroy();
              callback(null, result1, result2);
            })
            .catch(err => {
              console.log('Error while performing second attendance counts query: ' + err);
              connection.destroy();
              callback(err, result1, null);
            });
        } else {
          // var strSQL2 = 'SELECT * FROM attendance where (EmpID="invalid") AND (EventID=' + id + ' or EventID="' + tempID + '")';
          connection('attendance')
            .where('EmpID', 'invalid')
            .andWhere(function () {
              this.where('EventID', id)
                .orWhere('EventID', tempID);
            })
            .then(result2 => {
              connection.destroy();
              callback(null, result1, result2);
            })
            .catch(err => {
              console.log('Error while performing second attendance counts query: ' + err);
              connection.destroy();
              callback(err, result1, null);
            });
        }
      };
    }
  });
};


////////////////////////////////////////////////////////////////
// FUTURE implementation using the dedicated mustering tables //
////////////////////////////////////////////////////////////////
module.exports.getMusterRecords_FUTURE = function (id, zone, callback) {
  //get a connection using the common handler in models/db.js
  db.createKnexConnection(function (err, connection) {
    if (err) {
      console.log('Error while pErforming common connect query: ' + err);
      callback(err, null);
    } else {
      //process the i/o after successful connect.  Connection object returned in callback
      console.log('here is the connnection ' + connection.threadId);

      // var strSQL = 'SELECT * FROM muster where musterID=' + id + ' and zone=' + zone;
      connection('muster')
        .where({
          musterID: id,
          zone
        })
        .then(result => {
          //feb--send back the results via callback (cant 'return results' from asynch fucntions, have to use calllback)
          //var array=[];
          //rows.forEach(function(item) {
          // array.push(item.clientSWID);
          // });
          console.log('results of join' + JSON.stringify(result));
          connection.destroy();
          callback(null, result);
        })
        .catch(err => {
          console.log('error with the max query');
          connection.destroy();
          callback(err, null);
        });
    }
  });
};


