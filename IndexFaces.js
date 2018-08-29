let fs = require('fs');
let path = require('path');
let AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' }); // TODO:can also use a global config onject in same way as credentials
let rekognition = new AWS.Rekognition();
const RcognizeModel = require('./models/RcognizeModel');


if (process.send) {
  process.send('child started');
}

process.on('message', message => {
  let imagesIndexed = 0;
  let numberOfImages = 0;

  message.files.forEach(function (file, index) {

    let fromPath = path.join(message.moveFrom, file);

    // check if file is .png or .jpg
    if (fromPath.slice(-3) === 'png' || fromPath.slice(-3) === 'jpg') {
      numberOfImages++;

      fs.readFile(fromPath, (err, data) => {
        // Uploads image onto bucket first
        let s3 = new AWS.S3();

        s3.putObject({
          Bucket: 'rekog-image-bucket',
          Key: file,
          //Body: base64data
          Body: data,
          // Tagging: 'test1=1&test2=hello',
          // Metadata: {
          //   'metadata1': 'test value 1',
          //   'metadata2': 'Ara & Evan'
          // }
        }, function (err, data) {
          if (err) console.log(err, err.stack);
          else {
            // Indexes faces into rekognition collection
            let params = {
              CollectionId: 'myTestImages',
              DetectionAttributes: [
              ],
              ExternalImageId: file,
              Image: {
                S3Object: {
                  Bucket: 'rekog-image-bucket',
                  Name: file
                }
              }
            };

            rekognition.indexFaces(params, function (err, data) {
              if (err) console.log(err, err.stack); // an error occurred
              else {
                imagesIndexed++;
                if (data.FaceRecords.length > 0) {
                  // successful response
                  const faceData = data.FaceRecords[0].Face;
                  const faceName = faceData.ExternalImageId.slice(0,-4);
                  const bucketName = 'rekog-image-bucket';
                  const link = `https://s3-us-west-2.amazonaws.com/${bucketName}/${faceName}.jpg`;
                  const body = {
                    Link: link,
                    Tag: '',
                    FaceID: faceData.FaceId,
                    Name: faceData.ExternalImageId.slice(0,-4)
                  };
                  RcognizeModel.postIndexedPhoto(body, function (err, postIndexPhotoResult){
                    if (!err){
                      console.log('postIndexPhoto success');
                    } else {
                      console.log('postIndexPhoto err');
                    }

                  });
                }
                console.log(JSON.stringify(data));
                if (imagesIndexed === numberOfImages) {
                  callback();
                }
              }
            });
          }
        });
      });
    }
  });


  function callback() {
    console.log('done');
    // createLogEntry('done'); 
  }

  // function createLogEntry(param) {
  //   fs.open('./public/reports/photoProcess.log', 'a', 666, function (e, fd) {
  //     fs.appendFileSync(fd, param + "\r\n", null, 'utf8')
  //     fs.close(fd, function () { });
  //     return;
  //   });
  // }
});
