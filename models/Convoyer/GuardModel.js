var db = require('../db');
var crypto = require('crypto')


///////////////////////////////////////////////
// Common functions for the cryto processing //
///////////////////////////////////////////////

/**
 * generates randon string of charcters i.e 'salt'
 */

var genRandomString = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function (password, salt) {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};


module.exports.getAllGuards = function (callback) {

    db.createConnection(function (err, reslt) {
        if (err) {
            
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = ' Select * from guard; ';
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log('error with the convoyer query');
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });


}


module.exports.getGuardByID = function (id, callback) {
    db.createConnection(function (err, reslt) {
        if (err) {
            
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = " Select * from guard where GuardID = '" + id + "';";
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log('error with the convoyer query');
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}

module.exports.addGuard = function (Guard, callback) {

    db.createConnection(function (err, reslt) {
        if (err) {
            
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = "Insert into guard values ('" + Guard.GuardID + "', '" + Guard.FirstName + "', '" + Guard.LastName + "', '" + Guard.DeviceToken + "');";
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log('error with the convoyer query');
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}

module.exports.deleteGuard = function (id, callback) {

    db.createConnection(function (err, reslt) {
        if (err) {
            
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = " delete from guard where GuardID = '" + id + "';";
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log('error with the convoyer query');
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}

module.exports.updateGuard = function (Guard, callback) {

    db.createConnection(function (err, reslt) {
        if (err) {
            
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = "Update guard set DeviceToken = '" + Guard.DeviceToken + "' WHERE GuardID =  '" + Guard.GuardID + "';";
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log('error with the convoyer query');
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}

module.exports.updateGuardLogin = function (Guard, callback) {

    db.createConnection(function (err, reslt) {
        if (err) {
            
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = "Update guard SET LoggedIn = " + Guard.LoggedIn + " WHERE GuardID =  '" + Guard.GuardID + "';";
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);
                } else {
                    console.log('error with the patrolpatrol query');
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });

}

module.exports.addDeviceToken = function (Guard, callback) {

    db.createConnection(function (err, reslt) {
        if (err) {
            
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = "Update guard set DeviceToken = '" + Guard.DeviceToken + "' WHERE GuardID =  '" + Guard.GuardID + "';";
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log('error with the convoyer query');
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });

}

module.exports.saltHashPassword = function (userpassword) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
    console.log('UserPassword = ' + userpassword);
    console.log('Passwordhash = ' + passwordData.passwordHash);
    console.log('nSalt = ' + passwordData.salt);
    return {
        hash: passwordData.passwordHash,
        salt: salt
    }


};

module.exports.authenticateUser = function (Guard, callback) {

    /**
     * Check the user table for the name and retrieve salt
     */
    db.createConnection(function (err, reslt) {
        if (err) {
            
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;
            var strSQL = 'select * from guard where UserName="' + Guard.Username + '"';
            console.log('USER ADD strSQL= ' + strSQL);
            var query = connection.query(strSQL, function (err, result) {

                if (err || result.length == 0) {
                    console.log(err)
                    connection.end();
                    callback('Authentication_fail_creds', null);
                } else {

                    connection.end();
                    /**
                     * Use the salt and the entered password to compare with the stored password hash
                     */


                    var salt = result[0].RGen /** Gives us stored salt */
                    var passwordData = sha512(Guard.Password, salt);
                    console.log('UserPassword = ' + Guard.Password);
                    console.log('Passwordhash = ' + passwordData.passwordHash);
                    console.log('nSalt = ' + passwordData.salt);
                    if (result[0].Password == passwordData.passwordHash) {

                        /**
                         * Check user is 'Active'
                         */
                        if (result[0].Status == '1') {

                            callback(null, 'Authentication_success');
                        } else {
                            callback('Authentication_fail_status', null);
                        }
                    } else {
                        callback('Authentication_fail_creds', null);
                    }



                }
            });//end of connection.query

        }
    });
}

module.exports.getGuardByUsername = function (username, callback) {
    db.createConnection(function (err, reslt) {
        if (err) {
            console.log('Error while performing common connect query: ' + err);
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var strSQL = " Select * from guard where UserName = '" + username + "';";
            connection.query(strSQL, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log('error with the select guardpatrol query');
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}

