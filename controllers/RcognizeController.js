var fs = require('fs');
var path = require('path');
// var process = require( "process" ); -- I removed this as i believe it is globally availble object
var db = require('../models/db');
var archiver = require('archiver');
const RcognizeModel = require('../models/RcognizeModel');

// ###### Tues Aug 14 11:36:14 PDT 2018 David
const { fork } = require('child_process');

let serverAddress = process.env.SERVER_ADDRESS;

//////////////////////////////////////////////////////
//handler for showing the rcognition index page  /////
//////////////////////////////////////////////////////

exports.renderIndexHome = function (req, res) {
  sess = req.session;
  // console.log(req);
  sess.photosSuccess = null;
  sess.photosError = null;

  // feb--don't let nameless people view the page, redirect them back to the homepage
  if (typeof sess.username == 'undefined') {
    res.redirect('/');
  } else {
    res.render('RcognizeIndexView');
    // res.render('rcognizeView', { title: 'Command Center 5.0' + name, username: sess.username, content: contents[name] });
  }
};

///////////////////////////////////////////////////////////////////
//** handler for indexing photos into rekognition collection //////
///////////////////////////////////////////////////////////////////

exports.rcognizeIndex = function (req, res) {
  // Tried declaring sess with let/var, but it causes problems where it can't be accessed in view since not in global scope (i think)
  sess = req.session;
  let moveFrom = req.body.directorySource;

  // Loop through all the files in the source directory
  fs.readdir(moveFrom, function (err, files) {
    if (err) {
      console.error("Could not list the directory.", err);
      sess.indexSuccess = null;
      sess.indexError = 'Directory does not exist or not accessible';
      res.render('RcognizeIndexView', { title: 'Command Center 360', username: sess.username, success: sess.indexSuccess, error: sess.indexError });
      //process.exit( 1 );
    } else {

      const fork = require('child_process').fork;
      const program = path.resolve('IndexFaces');
      const parameters = [];
      const options = {
        // stdio: [ 'pipe', 'pipe', 'pipe', 'ipc' ]
      };
      const child = fork(program, parameters, options);

      child.on('message', message => {
        console.log('message from child:', message);
        child.send({ files: files, moveFrom: moveFrom });
      });

      // QUESTION: shouldn't we run the below code only if the child process completes???

      //feb--finished looping through the directory, so process successful response
      sess.indexSuccess = 'Photos indexed successfully';
      sess.indexError = null;
      res.redirect('/rcognize/index');
      // res.render('rcognizeView', { title: 'Command Center 360', username: sess.username, success: sess.indexSuccess });
    }
  });
};

//////////////////////////////////////////////////////
//handler for showing the photo recognition page    //
//////////////////////////////////////////////////////
exports.renderSearchHome = function (req, res) {
  sess = req.session;
  // console.log(req);
  sess.photosSuccess = null;
  sess.photosError = null;

  // feb--don't let nameless people view the page, redirect them back to the homepage
  if (typeof sess.username == 'undefined') {
    res.redirect('/');
  } else {
    res.render('RcognizeSearchView');
    // res.render('rcognizeView', { title: 'Command Center 5.0' + name, username: sess.username, content: contents[name] });
  }
};

//////////////////////////////////////////////////////
//handler for showing the photo recognition page    //
//////////////////////////////////////////////////////
exports.renderSearchHome = function (req, res) {
  sess = req.session;
  // console.log(req);
  sess.photosSuccess = null;
  sess.photosError = null;

  // feb--don't let nameless people view the page, redirect them back to the homepage
  if (typeof sess.username == 'undefined') {
    res.redirect('/');
  } else {
    res.render('RcognizeSearchView');
    // res.render('rcognizeView', { title: 'Command Center 5.0' + name, username: sess.username, content: contents[name] });
  }
};

///////////////////////////////////////////////////////////////////////////
//** handler for searching for matching photos in rekognition collection //
///////////////////////////////////////////////////////////////////////////

exports.rcognizeSearch = function (req, res) {
  console.log('wooahhheeh lets search man');
  sess = req.session;
  let moveFrom = req.body.directorySource;

  // Loop through all the files in the source directory
  fs.readdir(moveFrom, function (err, files) {
    if (err) {
      console.error("Could not list the directory.", err);
      sess.searchFacesSuccess = null;
      sess.searchFacesError = 'Directory does not exist or not accessible';
      res.render('RcognizeSearchView', { title: 'Command Center 360', username: sess.username, success: sess.searchFacesSuccess, error: sess.searchFacesError });
      //process.exit( 1 );
    } else {

      const fork = require('child_process').fork;
      const program = path.resolve('controllers/SearchFacesByImageController');
      const parameters = [];
      const options = {
        // stdio: [ 'pipe', 'pipe', 'pipe', 'ipc' ]
      };
      const child = fork(program, parameters, options);

      child.on('message', message => {
        console.log('message from child:', message);
        child.send({ files: files, moveFrom: moveFrom });
      });



      //feb--finished looping through the directory, so process successful response
      sess.searchFacesSuccess = 'Photos searched successfully';
      sess.searchFacesError = null;
      res.redirect('/rcognize/search');
      // res.render('rcognizeView', { title: 'Command Center 360', username: sess.username, success: sess.searchFacesSuccess });
    }
  });
};

exports.getFaceList = function (req, res) {
  RcognizeModel.getFaceList(function (err, results) {
    if (err) {
      res.json(err);
      console.log(err);
    }
    else {
      res.render('RcognizeGalleryListView', { results, serverAddress });
      console.log(results);
    }
  });
};

exports.renderFaceDetails = function (req, res) {
  RcognizeModel.getFaceDetail(req.params.id, function (err, results) {
    if (err) {
      res.json(err);
      console.log(err);
    }
    else {
      res.render('RcognizeGalleryDetailView', { results, serverAddress });
      console.log(results);
    }
  });
};



/**
 ================================================================================================
                                        Common functions
  ================================================================================================ 
  */

function createLogEntry(param) {
  fs.open('./public/reports/eventEndMonitor.log', 'a', 666, function (e, id) {
    fs.appendFileSync(id, param + "\r\n", null, 'utf8');
    fs.close(id, function () { });
    return;
  });
};

function setUpSessionVarables(req) {
  sess = req.session;
  sess.photoCheckError = null;
  sess.photoCheckError1 = null;
  sess.empSearch = req.body.empIDSearch;
  return;
};

function setUpErrorsForDisplay() {
  sess.photosSuccess = null;
  sess.photosError = 'Directory does not exist or not accessible';
  return;
};

function setUpSuccessMessageForDisplay() {
  sess.photosSuccess = 'Photos processed successfully';
  sess.photosError = null;
  return;
};

function getTheFMaxPhotosForDisplay(callback) {
  console.log("getting into getMax");

  var photoArrayForDisplay = [];
  var nameAndPathOfThePhotoFile = "";
  var photosReadAndAddedToDisplayArray = 0;
  var numberOfPhotosInSourceDirectory = 0;
  var numberOfPhotosToReturnInDisplayArray = 0;


  const photoSourceDirectory = "./public/photosforreader";
  const theMaxNumberOfPhotosToDisplay = 100;

  fs.readdir(photoSourceDirectory, function (err, photoFiles) {

    if (err) { callback(err, null); }

    numberOfPhotosInSourceDirectory = photoFiles.length;

    if (numberOfPhotosInSourceDirectory > theMaxNumberOfPhotosToDisplay) { numberOfPhotosToReturnInDisplayArray = theMaxNumberOfPhotosToDisplay; }
    else { numberOfPhotosToReturnInDisplayArray = numberOfPhotosInSourceDirectory; }

    console.log("photofiles length" + photoFiles.length);

    for (var i = 0; i < numberOfPhotosToReturnInDisplayArray; i++) {

      nameAndPathOfThePhotoFile = '/photosforreader/' + photoFiles[i];
      photoArrayForDisplay.push(nameAndPathOfThePhotoFile);

    }

    callback(null, photoArrayForDisplay);





    // photoFiles.forEach( function( file, index ) {

    //   photosReadAndAddedToDisplayArray++
    //   nameAndPathOfThePhotoFile = '/photosforreader/'+file;
    //   photoArrayForDisplay.push(nameAndPathOfThePhotoFile)

    //   if (photosReadAndAddedToDisplayArray == theMaxNumberOfPhotosToDisplay || photosReadAndAddedToDisplayArray == numberOfPhotosInSourceDirectory){
    //     console.log ("getting into finish")
    //     console.log (photoArrayForDisplay)



    //     callback (null, photoArrayForDisplay) }

    // } );

  });
}

/**
 ================================================================================================ 
*/

exports.photoCheck = function (req, res) {

  const callerOfThisRouteIsNotRecognized = 'undefined';

  setUpSessionVarables(req);

  console.log("back from session variable");
  console.log("session variable" + sess.username);



  // don't let nameless people view the page, redirect them back to the homepage
  if (typeof sess.username == callerOfThisRouteIsNotRecognized) {
    res.redirect('/');
  } else {

    getTheFMaxPhotosForDisplay(function (err, photoArrayForDisplay) {
      console.log("getting back from getMax");


      if (err) {

        setUpErrorsForDisplay();
        res.render('photos', { title: 'Command Center 360', username: sess.username, success: sess.photosSuccess, error: sess.photosError });

      } else {

        var imageLast = "";  //TODO  what is this?
        setUpSuccessMessageForDisplay();
        res.render('photoCheck', { title: 'Command Center', images: photoArrayForDisplay, imageLast: imageLast });
      }

    });
  }
};


exports.photoCheckOLD = function (req, res) {
  sess = req.session;
  sess.photoCheckError = null;
  sess.photoCheckError1 = null;


  // don't let nameless people view the page, redirect them back to the homepage
  if (typeof sess.username == 'undefined') {
    res.redirect('/');
  } else {

    sess.empSearch = req.body.empIDSearch;

    if (typeof sess.empSearch == 'undefined') {

      if (sess.empSearch == undefined)

        /**
         * Get ALL the photos from public/photosforreader/ and put them into an array
         */
        var imageLast = "";
      var imageFile = "";

      var images = [];
      var photoDir = "./public/photosforreader";

      // Loop through all the files in the source directory
      fs.readdir(photoDir, function (err, files) {
        if (err) {
          sess.photosSuccess = null;
          sess.photosError = 'Directory does not exist or not accessible';
          res.render('photos', { title: 'Command Center 360', username: sess.username, success: sess.photosSuccess, error: sess.photosError });
        } else {

          files.forEach(function (file, index) {
            imageFile = '/photosforreader/' + file;

            images.push(imageFile);

          });

          //feb--finished looping through the directory, so process successful response
          sess.photosSuccess = 'Photos processed successfully';
          sess.photosError = null;
          res.render('photoCheck', { title: 'Command Center', images: images, imageLast: imageLast });
        }
      }); //End of the directory address read

    }; //feb--end of if/else test for nameless
  };
};


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// Function for creating the zip file
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function zipPhotos(callback) {
  console.log('YEP WORKS');

  // Using archiver
  var rootPath = path.normalize(__dirname + '/..');
  var filePath = path.normalize(rootPath + '/public/photosforreader/');

  var output = fs.createWriteStream('./public/photosForDownload.zip');
  var archive = archiver('zip', {
    gzip: true,
    zlib: { level: 9 } // Sets the compression level.
  });

  archive.on('error', function (err) {
    throw err;
  });

  // pipe archive data to the output file
  archive.pipe(output);

  // append files
  //archive.file(filePath+'/46000.jpg', {name: '46000.jpg'});
  //archive.file(filePath+'/46001.jpg', {name: '46001.jpg'});
  console.log('here is the filePath ' + filePath);

  archive.directory(filePath, false);
  //
  archive.finalize();
  // End archiver
}




