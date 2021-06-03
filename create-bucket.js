// const AWS = require('aws-sdk');
// const { v4: uuidv4 } = require('uuid');

// AWS.config.update({ region: 'us-west-2' });

// const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

// const bucketParams = {
//     Bucket : "user-images-" + uuidv4()
//   }

//   s3.createBucket(bucketParams, (err, data) => {
//     if (err) {
//       console.log("Error", err);
//     } else {
//       console.log("Success");
//     }
//   });