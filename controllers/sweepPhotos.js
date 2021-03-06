/** Common handler that auto-sweeps photos on a timed schedule.  Called from Sweep and SweepInsert, 
The two main sweeper modules.
 */

var fs = require('fs');
var path = require ('path')
var db = require('../models/db');
var mysql = require('mysql');
var fs  = require('fs');
var emailController = require('./emailController');
var sharp = require('sharp');
//###### May 25 2018 Create the zip file upon completion of the ingest
var archiver = require('archiver');
// ###### Fri Aug 3 07:31:31 PDT 2018
const { fork } = require('child_process');
//###### Fri Aug 3 07:31:41 PDT 2018
var logFile = require('./logFile');



module.exports.photoSweep = function(callback){

	var moveFrom = process.env.PICTURE_DIR;

	var moveTo = "./public/photosforreader";
	var photoImportLogFile = './public/reports/photoProcess.log'
	var dateProcessingInitiated = new Date()


	// Loop through all the files in the source directory
	fs.readdir( moveFrom, function( err, files ) {
	        if( err ) {
	            console.error( "Could not list the picture directory.", err );            
	            //process.exit( 1 );
	        }else{ 

			/////////////////////////////////////////////////////////////
			// Use new child processing
			//###### Fri Aug 3 07:32:29 PDT 2018
			/////////////////////////////////////////////////////////////

			logFile.createLogEntry('--', photoImportLogFile)
			var logEntryText = 'Sweep Processing: '+dateProcessingInitiated+ ' began photo import.';
			logFile.createLogEntry(logEntryText , photoImportLogFile)


			const fork = require('child_process').fork;
			const program = path.resolve('ProcessImages.js');
			const parameters = [];
			const options = {
				// stdio: [ 'pipe', 'pipe', 'pipe', 'ipc' ]
			};
			const child = fork(program, parameters, options);

			child.on('message', message => {
				console.log('message from child:', message);
				child.send({files: files, moveFrom: moveFrom});
			});

						//###### Fri Aug 3 07:32:39 PDT 2018  PRE-CHILD PROCESSING
						// //###### May 25 2018 Create the zip file upon completion of the ingest
						// fileTotal = files.length  
						// var counter = 0
						
						// files.forEach( function( file, index ) {
						// 		var fromPath = path.join( moveFrom, file );
						// 		var toPath = path.join( moveTo, file );

						// 		fs.stat( fromPath, function( error, stat ) {
						// 			if( error ) {
						// 				console.error( "Error stating picture file.", error );
						// 				return;
						// 			}

						// 			if( stat.isFile() )
						// 				console.log( "'%s' is a file.", fromPath );
						// 			else if( stat.isDirectory() )
						// 				console.log( "'%s' is a directory.", fromPath );

						// 			sharp(fromPath).resize(100, 150).toFile(toPath, function(err) {
										
						// 				//###### May 25 2018 Create the zip file upon completion of the ingest
						// 				counter++

						// 				if (err) {
						// 					console.log("One of the files is not in expected format (.jpg) "+err);
						// 					return;
						// 				}
				
						// 				if (counter == fileTotal){
						// 				zipPhotos(function(err,reslt){ 
						// 				}) 
						// 				}
						// 			});

						// 		} );
						// } );
						//###### Fri Aug 3 07:33:12 PDT 2018 END PRE-CHILD PROCESSING

	        
	      }
	});


        
}; //End module



//###### Fri Aug 3 07:33:38 PDT 2018 TODO can delete this
//###### Jun 06 2018 -- Zip the photos during sweep
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// Function for creating the zip file
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function zipPhotos(callback) {
	
	// Using archiver
  var rootPath = path.normalize(__dirname+'/..');
  var filePath = path.normalize(rootPath+'/public/photosforreader/');
  
  var output = fs.createWriteStream('./public/photosForDownload.zip');
  var archive = archiver('zip', {
	  gzip: true,
	  zlib: { level: 9 } // Sets the compression level.
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
  




