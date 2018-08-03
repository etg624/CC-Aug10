
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// Function for creating the zip file
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function zipPhotos(callback) {
  console.log ('YEP WORKS')
  
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

