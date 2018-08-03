var fs  = require('graceful-fs'); // using this instead of fs to avoid EMFILE Too many files error


/**
================================================================================================ 
*/ 
module.exports.createLogEntryAsync = function (logEntryText, logFileName) {

        fs.open(logFileName, 'a', 666, function( e, id ) {
        fs.appendFileSync(id, logEntryText + "\r\n", null, 'utf8')
        fs.close(id, function(){});
        return
      });
      
  };  

  
/**
================================================================================================ 
*/ 
module.exports.createLogEntry = function (logEntryText, logFileName) {

    var fd = fs.openSync(logFileName, 'a', 666)
    fs.appendFileSync(fd, logEntryText + "\r\n", null, 'utf8')
    fs.closeSync(fd);
    return
  
  
};  




/** Get the latest Log file status so that dashboard can be updated
================================================================================================ 
*/ 

/**
================================================================================================
                                        Functions
================================================================================================ 
*/

function howManyChunksRequired ( arrayOfFileNames, maxFilesPerChunk ) {  
    var numberOfChunksRequired = arrayOfFileNames.length/maxFilesPerChunk
    numberOfChunksRequired =Math.ceil(numberOfChunksRequired)
    return numberOfChunksRequired
}


function getListOfAllPhotoNames () {  
    var photoDir = "./public/photosforreader"
    var arrayOfAllPhotoNames = fs.readdirSync( photoDir )
    return arrayOfAllPhotoNames
}


function checkWhetherZippingIsComplete (howManyChunksRequired, logData) {  
    
    var numberOfChunksLoggedAsComplete = 0
    var logDataLines = logData.split(/\n/)
    var numberOfLinesInLogData = logDataLines.length
    var lineIndexToRead =  numberOfLinesInLogData - 1
    var logDataLine = logData.split(/\n/)[lineIndexToRead];
    var lineIndexToReadCompletedMessages =  0

    
    if (logDataLine == ""){
        console.log('the last line is blank '+lineIndexToRead)
        lineIndexToRead = lineIndexToRead -1
        // logDataLatestLine = logData.split(/\n/)[lastLineIndex];
        // console.log('Second last line:'+logDataLatestLine)
    }

    console.log('line index to read before the loop ' +lineIndexToRead)

    for (var i=0 ; i < howManyChunksRequired ; i++){

        lineIndexToReadCompletedMessages = lineIndexToRead - i
        console.log('line index to read inside the loop ' +lineIndexToReadCompletedMessages)

        logDataLine = logData.split(/\n/)[lineIndexToReadCompletedMessages];
        var latestStatusInLogFile = logDataLine.substring(0, 18); 
        console.log ('the latest status in the log file '+latestStatusInLogFile)
        if (latestStatusInLogFile == "Completed File Zip"){
            numberOfChunksLoggedAsComplete++
        }
    }

    if (numberOfChunksLoggedAsComplete == howManyChunksRequired){
        return true
    } else{
        return false
    }
   
}


/**
================================================================================================
                                        Execution
================================================================================================ 
*/
module.exports.getLatestLogFileStatus = function ( logFilePathAndName ) {  

    var listOfAllPhotos  = getListOfAllPhotoNames()
    const maxFilesPerChunk = 25000

    var howManyChunks = howManyChunksRequired(listOfAllPhotos, maxFilesPerChunk)
    var logData = fs.readFileSync(logFilePathAndName,'utf8')

    var logDataLines = logData.split(/\n/); // split into lines
   

    // //###### Mon Jul 30 08:47:52 PDT 2018 Here need to check that all the zips are done
    var zippingCompleteFlag = checkWhetherZippingIsComplete(howManyChunks, logData)
    
    if (zippingCompleteFlag == true){
        console.log('Status return is complete')
        return "Import complete"
    }else{
        console.log('Status return is processing')
        return "Still processing.."

    }
  
} 