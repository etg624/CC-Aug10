const { fork } = require('child_process');
//var fs = require('fs');
var fs  = require('graceful-fs'); // using this to avoid EMFILE Too many files error

var path = require('path');
var sharp = require('sharp');
//###### May 25 2018 Create the zip file upon completion of the ingest
var archiver = require('archiver');
//###### Thu Jul 19 10:35:50 PDT 2018
var logFile = require('./controllers/logFile');

//###### Tue Jul 31 10:20:17 PDT 2018
var fsExtra  = require('node-fs-extra'); // using this to avoid EMFILE Too many files error

var moveTo = "./public/photosforreader";



/**
================================================================================================
                                     Objective of this module
                                     
        For large numbers of images (>25,000), zips the images in chunks of 25,000.
        Reads the photosforreader directory and calculates the number of chunks required. 
        For each chunk, creates a staging directory and zip file for App download.
        Does all processing in a separate child process and records status to processPhotos.log
        Dashboard monitors log file and displays status. Also creates a phototsfordownload.zip
        file for the first chunk, so that older versions of the app still work.

================================================================================================ 
*/
/**
================================================================================================
                                        Function Order  
zipPhotoFilesInChunks
  howManyChunksRequired
  createDirectoriesForChunks
  loadChunkDirectoryAndZip
    zipPhotos

================================================================================================ 
*/

/**
================================================================================================
                                        Function Execution
================================================================================================ 
*/
if (process.send) {
  process.send('child started');
}

process.on('message', message => {
  // console.log('message from parent:', message);

  var itemsProcessed = 0;

  message.files.forEach(function (file, index) {
    var fromPath = path.join(message.moveFrom, file);
    var toPath = path.join(moveTo, file);

    fs.stat(fromPath, function (error, stat) {
      if (error) {
        console.error("Error stating file.", error);
        return;
      }

      if (stat.isFile()) {
        // console.log( "'%s' is a file.", fromPath );
      }

      else if (stat.isDirectory()) {
        // console.log( "'%s' is a directory.", fromPath );
      }

      // was 200, 300.  changed to smaller size 7/7/17  
      sharp(fromPath).resize(100, 150).toFile(toPath, function (err) {
        if (err) {
          console.log("One of the files is not in expected format (.jpg) " + err);
          return;
        } else {
          itemsProcessed++;
          if(itemsProcessed === message.files.length) {
            //###### Wed Jul 18 21:18:46 PDT 2018 Added the zip call 
            ZipPhotoFilesInChunks(function(err,reslt){ 
           // zipPhotos(function(err,reslt){ 
              //callback();

            }) 
          }
        }
      });

    });
  });


/**
================================================================================================
                                        Functions
================================================================================================ 
*/ 

  function callback () { 
    //createLogEntry('done'); 

  }


  function zipPhotos(callback) {
    // Using archiver

    var dateProgramInitiated = new Date()
    var photoImportLogFile = './public/reports/photoProcess.log'
    var rootPath = path.normalize(__dirname);
    var filePath = path.normalize(rootPath+'/public/photosforreader/');
    var output = fs.createWriteStream('./public/photosForDownload.zip');
  
    var archive = archiver('zip', {
        gzip: true,
        zlib: { level: 9 } // Sets the compression level.
    });

    var logEntryText = 'Processing: '+dateProgramInitiated + ' zip processing started.'
    logFile.createLogEntry(logEntryText, photoImportLogFile)


    //###### Wed Jul 18 21:27:05 PDT 2018 TODO
    output.on('close', function() {
      console.log(archive.pointer() + ' total bytes');
      console.log('Archiver (zip) has been finalized and the output file descriptor has closed.');

      logEntryText = 'Complete: photos zipped into file of '+archive.pointer() + ' total bytes.'
      logFile.createLogEntry(logEntryText, photoImportLogFile); 
    });
  
  

    archive.on('error', function(err) {
      throw err;
    });

    // pipe archive data to the output file
    archive.pipe(output);

    // append files
    //archive.file(filePath+'/46000.jpg', {name: '46000.jpg'});
    //archive.file(filePath+'/46001.jpg', {name: '46001.jpg'});
    console.log ('here is the filePath '+filePath)

    archive.directory(filePath, false);
    //
    archive.finalize();
    // End archiver
  }

});


function createDirectoriesForChunks (directoryToBeCreated, photoImportLogFile) {

    if (!fs.existsSync(directoryToBeCreated)){
        fs.mkdirSync(directoryToBeCreated);

        //var logEntryText = 'Directory created: ' + directoryToBeCreated
        //logFile.createLogEntry(logEntryText, photoImportLogFile)
    }
}


function zipPhotos(directoryToBeZipped, whichChunk, photoImportLogFile, numberOfChunksRequired) {
    //  Using archiver
    //var rootPath = path.normalize(__dirname);
    var filePath = path.normalize(__dirname+directoryToBeZipped);
    //createLogEntry ('Status of File Zip: the file to be zipped is '+filePath)
    var logEntryText = 'Status of File Zip: the directory being zipped is '+filePath
    logFile.createLogEntry(logEntryText, photoImportLogFile)

    
    var output = fs.createWriteStream('./public/photosForDownload'+whichChunk+'.zip');
    var archive = archiver('zip', {
        gzip: true,
        zlib: { level: 9 } // Sets the compression level.
    });
    // var dateFunctionInitiated = new Date()
    // var logEntryText = 'Processing: '+dateFunctionInitiated + ' zip processing started.'
    // logFile.createLogEntry(logEntryText, photoImportLogFile)


    //###### Wed Jul 18 21:27:05 PDT 2018 TODO
    output.on('close', function() {
      console.log(archive.pointer() + ' total bytes');
      console.log('Archiver (zip) has been finalized and the output file descriptor has closed.');
      logEntryText = 'Completed File Zip: chunk '+whichChunk+' is zipped. '+archive.pointer() + ' total bytes.'
      //logEntryText = 'Status of File Zip: the '+whichChunk+' chunk is zipped.'

      logFile.createLogEntry(logEntryText, photoImportLogFile);

      //###### Mon Jul 30 08:47:52 PDT 2018 Make a copy of the first chunk for the old app versions to use
      if (whichChunk == 0) {
        fs.createReadStream('./public/photosForDownload'+whichChunk+'.zip').pipe(fs.createWriteStream('./public/photosForDownload.zip'));
      }

    });
  
    
    archive.on('error', function(err) {
      throw err;
    });
    
    // pipe archive data to the output file
    archive.pipe(output);
    
    // To append files....
    //archive.file(filePath+'/46000.jpg', {name: '46000.jpg'});
    //archive.file(filePath+'/46001.jpg', {name: '46001.jpg'});
    
    archive.directory(filePath, false);
    //
    archive.finalize();
    // End archiver

    // console.log ('Status of File Zip: the '+whichChunk+' chunk is zipped.')
    // var logEntryText = 'Status of File Zip: the '+whichChunk+' chunk is zipped.'
    // logFile.createLogEntry(logEntryText, photoImportLogFile)

    return
    }
    

function howManyChunksRequired ( arrayOfFileNames, maxFilesPerChunk ) {  
    var numberOfChunksRequired = arrayOfFileNames.length/maxFilesPerChunk
    numberOfChunksRequired =Math.ceil(numberOfChunksRequired)
    return numberOfChunksRequired
}


function loadChunkDirectoryAndZip ( arrayOfFileNames, whichChunk, maxFilesPerChunk, photoImportLogFile, numberOfChunksRequired ) {  

    var arrayStartFileIndex = (whichChunk*maxFilesPerChunk)
    var arrayEndFileIndex = arrayStartFileIndex + maxFilesPerChunk
    var directoryToStageFilesForZipping = '/public/photoZipChunks'+whichChunk+'/'

    var filesWrittenCounter = 0
    if (arrayOfFileNames.length > (arrayEndFileIndex )){
        var numberOfFilesToWrite = maxFilesPerChunk
    } else{
        var numberOfFilesToWrite = (arrayOfFileNames.length - arrayStartFileIndex )
        arrayEndFileIndex = arrayOfFileNames.length
    }


    for (var i=arrayStartFileIndex ; i <arrayEndFileIndex; i++){ 

        var readStreamObject = fs.createReadStream('./public/photosforreader/'+arrayOfFileNames[i])
        //var writeStreamObject = fs.createWriteStream('./photoZipChunks1/'+arrayOfFileNames[i])
        var writeStreamObject = fs.createWriteStream('.'+directoryToStageFilesForZipping+arrayOfFileNames[i])


        //fs.createReadStream('./photoChunk/'+files[i]).pipe(fs.createWriteStream('./photoZipChunks1/'+files[i]).on('finish', function() {counter++; console.log('finito'+counter); if (counter==2){zipPhotos('/photoZipChunks1/')}}));
        readStreamObject.pipe(writeStreamObject.on('finish', function() {
            filesWrittenCounter++;
            if (filesWrittenCounter==numberOfFilesToWrite){
               // zipPhotos('/photoZipChunks1/')}
                console.log('Status of File Zip: the '+whichChunk+' chunk has been staged. '+filesWrittenCounter+' of '+numberOfFilesToWrite+' written.')

                zipPhotos(directoryToStageFilesForZipping, whichChunk, photoImportLogFile, numberOfChunksRequired)
                return
            }

        }));

    };
    //return
}


function ZipPhotoFilesInChunks ( callback ) {  


  var images = [];
  var photoDir = "./public/photosforreader"
  var directoryToStageChunks = "./public/photoZipChunks";
  var photoImportLogFile = './public/reports/photoProcess.log'
  var maxFilesPerChunk = 25000
  //
  var dateProgramInitiated = new Date()
  var logEntryText = 'Processing: '+dateProgramInitiated + ' zip processing started.'
  logFile.createLogEntry(logEntryText, photoImportLogFile)
  //

  // Loop through all the files in the source directory
  fs.readdir( photoDir, function( err, arrayOfFileNames ) {

    if( err ) {
      console.log(err)
    }else{ 

      
      // How many zip files does the image directory need to be chunked into to avoid App memory problems
      var numberOfChunksRequired = howManyChunksRequired( arrayOfFileNames,maxFilesPerChunk )

      console.log('Status of File Zip: '+arrayOfFileNames.length+ ' files to be zipped.')
      logEntryText = 'Status of File Zip: '+arrayOfFileNames.length+ ' files to be zipped.'
      logFile.createLogEntry(logEntryText, photoImportLogFile)
      
      console.log('Status of File Zip: '+numberOfChunksRequired+ ' chunk(s) required.')
      logEntryText = 'Status of File Zip: '+numberOfChunksRequired+ ' chunk(s) required.'
      logFile.createLogEntry(logEntryText, photoImportLogFile)



      for (i=0 ; i<numberOfChunksRequired; i++){

          createDirectoriesForChunks (directoryToStageChunks+i,photoImportLogFile)
          
          loadChunkDirectoryAndZip (arrayOfFileNames, i, maxFilesPerChunk, photoImportLogFile, numberOfChunksRequired)
      }

    }
  })

}

/**
================================================================================================ 
*/ 