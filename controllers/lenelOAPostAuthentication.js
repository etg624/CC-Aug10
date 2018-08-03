var https = require('https');
var querystring = require('querystring');
 
// THIS VERSION SUCCESSFULLYSEND AN AUTHENTICATION POST BUT
// RECEIVES THE FOLLOWING MESSGE BECAUSE THE LICENCE EXPIRED 12/27/17
//"error":{"code":"openaccess.general.invalidapplicationid","message":"License violation. OPE
//N_ACCESS_NON_PRODUCTION is not licensed for use with OpenAccess."},"version":"1.0"}


exports.getToken = function(callback) {

// Get the PACS endpoint and credential information from the environment variables
var pacsHost = process.env.PACS_HOST
var pacsUser = process.env.PACS_USER
var pacsPass = process.env.PACS_PASSWORD

 
var postData = JSON.stringify({
    // could be:
    // galbraith@mobss.com/LenelintegrationtoCC5
    // admin/admin
    // Sa/mobss
    // user_name: "Sa",
    // password: "mobss",
    user_name: pacsUser,
    password: pacsPass,
    directory_id : "id-1"
});
console.log ("postdata "+postData)

// request option
var options = {
  host: pacsHost,
  port: 8080,
  method: 'POST',
  //json: true,
  path: '/api/access/onguard/openaccess/authentication?version=1.0',
  headers: {
    //'Content-Type': 'application/json',
    //'Content-Length': postData.length,
    'Application-Id': 'OPEN_ACCESS_NON_PRODUCTION'   
  },
  rejectUnauthorized: false
};
 
// request object
var req = https.request(options, function (res) {
  var result = '';
  res.on('data', function (chunk) {
    result += chunk;
  });
  res.on('end', function () {
    console.log("or just end" + result);
    console.log("result code " + res.statusCode);
    var parsedData = JSON.parse(result)
    console.log( "here is the JSON Parsed data : "+JSON.stringify(parsedData) )

    var token = parsedData.session_token
    console.log("result token " + token);
    
    callback (null,token)

  });
  res.on('error', function (err) {
    console.log("is this what im getting" + err);
  })
});
 
// req error
req.on('error', function (err) {
  console.log("or this "+err);
  callback(err,null)
});
 
//send request witht the postData form
req.write(postData);
req.end();

}