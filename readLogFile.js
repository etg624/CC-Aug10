 var fs  = require('fs');

 
const photoProcessLogFile = "./public/reports/photoProcess.log"

                                            
var logData = fs.readFileSync(photoProcessLogFile,'utf8')

var logDataLatestLine = logData.split(/\n/); // split into lines
//console.log('lines in the file:'+logDataLatestLineLength)

var logDataLatestLineLength = logDataLatestLine.length
var lastLineIndex = logDataLatestLineLength - 1
var logDataLatestLine = logData.split(/\n/)[lastLineIndex];
console.log('last line:'+logDataLatestLine)

//Last line is sometimes blank due to carriage return after the log entry write append
if (logDataLatestLine == ""){
    lastLineIndex = lastLineIndex -1
    logDataLatestLine = logData.split(/\n/)[lastLineIndex];
    console.log('Second last line:'+logDataLatestLine)

}

var latestStatusInLogFile = logDataLatestLine.substring(0, 8); 
if (latestStatusInLogFile == "Complete"){
    console.log('Status return is complete')
}else{
    console.log('Status return is processing')
}


console.log('Status word: '+latestStatusInLogFile)



