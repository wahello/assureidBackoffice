// import { Meteor } from 'meteor/meteor';
// import { ProjectSettings } from '/imports/dashboard/product/addNewProduct/api/projectSettings.js';


// Meteor.startup(() => {

//   Meteor.methods({
//     'removeS3Data'(image){
//           console.log('delete method called ' + image);
//           let bucket = "assureid.com";
//           let imageUrl = image.replace('https://' + bucket + '.s3-ap-south-1.amazonaws.com/', '');
//          AWS.config.update({
//               accessKeyId: "AKIAJHP7QAQIWG5NP6SQ",
//               secretAccessKey: "Om0Yi5E/Ec0ZnEU0BcM46hQvcBsef7B7WfJ1xAZ3",
//               region: "ap-south-1",
//           });
//           console.log('delete method called url ' + imageUrl);

//     var s3 = new AWS.S3();
//     var params = {
//       Bucket: bucket, // 'mybucket'
//       Key: imageUrl // 'images/myimage.jpg'
//     };
//     var paramList = {
//       Bucket: bucket
//     };
//     var listObjects = Meteor.wrapAsync(
//       s3.listObjects(paramList,function(error,data){
//         if (error) {
//           console.log("error list " +error);
//         }
//         else {
//           console.log(data);
//         }
//       })
//     );
//     var deleteObject = Meteor.wrapAsync(
//       s3.deleteObject(params, function (error, data) {
//         if (error) {
//           console.log("error " +error);
//         }
//         else {
//           console.log(data);
//         }
//       })
//     );

//     // Meteor.users.update(Meteor.userId(), {$set: {"profile.image": ""}});
//   }
//   });

 

//   var slingvar = ProjectSettings.findOne({"_id":"1"});
//   // console.log("slingvar",slingvar);

//   if(slingvar){
//     Slingshot.fileRestrictions("myFileUploads", {
//       allowedFileTypes: ["image/png", "image/jpeg", "image/gif", "image/jpg"],
//       maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited).
//     });

//      Slingshot.createDirective("myFileUploads", Slingshot.S3Storage, {
//       bucket: slingvar.bucket,
//       acl: "public-read",
//       AWSAccessKeyId: slingvar.key,
//       AWSSecretAccessKey: slingvar.secret,
//       region: slingvar.region,
//       authorize: function () {
//         //Deny uploads if user is not logged in.
//         if (!this.userId) {
//           var message = "Please login before posting files";
//           throw new Meteor.Error("Login Required", message);
//         }
//         return true;
//       },
//       key: function (file,metaContext) {
//         //Store file into a directory by the user's username.
//         let user = Meteor.users.findOne(this.userId);
//         let fileType = file.name.split(".");
//         return "patelconstruction/" + file.name;
//       }
//     });
//   }
 
// });
