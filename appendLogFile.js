 var fs  = require('fs');

 
const logFileName = "./public/reports/photoProcess.log"
const logEntryText = "--TEST--"

var fd = fs.openSync(logFileName, 'a', 666)
    fs.appendFileSync(fd, logEntryText + "\r\n", null, 'utf8')
    fs.closeSync(fd);
    return