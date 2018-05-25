import { Router, Route, browserHistory } from 'react-router';
import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import {routes, onAuthChange}  from '../lib/routes/routes';

import { ProductImage } from '/imports/dashboard/product/addNewProduct/imageUploadClient/ProductImage.js';
import { ServiceImage } from '/imports/dashboard/reactCMS/UploadToClient/UploadServiceImgsClient.js';
import { BlogImage } from '/imports/dashboard/reactCMS/UploadToClient/UploadBlogImgsClient.js';
import { UserImage } from '/imports/dashboard/userManagement/UserPicUploadClient/UserPicUploadClient.js';
// import { ProofDocuments } from '/imports/website/forms/UploadToClient/ProofUploadClient.js';
import { NewsVideo } from '/imports/dashboard/forms/uploadToClient/uploadNewsVideoClient.js';
import { TicketImages } from '/imports/dashboard/ticketManagement/uploadToClient/uploadImagesToClient.js';
import { TicketVideo } from '/imports/dashboard/ticketManagement/uploadToClient/uploadVideoToClient.js';
import { TicketReport } from '/imports/dashboard/ticketManagement/uploadToClient/uploadReportToClient.js';

import '/imports/dashboard/product/addNewProduct/css/AddNewProduct.css';
import '/imports/dashboard/product/productList/css/productList.css';
import '/imports/dashboard/product/addNewProduct/api/ProductMaster.js';
// import '/imports/website/header/css/secHeader.css';
// import '/imports/website/footer/css/secFooter.css';
// import '/imports/website/contactUs/css/contactus.css';
// import '/imports/website/aboutUs/css/aboutus.css';
// import '/imports/website/howItWorks/css/HowItWorks.css';
// import '/imports/website/howItWorks/css/welcomeToCompany.css';
// import '/imports/dashboard/product/productBulkUpload/css/productBulkUpload.css';
// import '/imports/website/aboutUs/css/aboutus.css';
// import '/imports/website/whyChooseUs/css/chooseUs.css';
// import '/imports/website/feature/css/feature.css';
// import '/imports/website/testimonial/css/testimonial.css';
// import '/imports/website/clients/css/clients.css';
// import '/imports/website/blog/css/blog.css';
// import '/imports/website/carousel/css/carousel.css';
import '/imports/website/forms/css/forms.css';
// import '/imports/website/permissionModals/css/permissionModals.css';
// import '/imports/website/profile/css/profile.css';
// import '/imports/website/news/css/news.css';
// import '/imports/website/ServiceProcess/css/ServiceProcess.css';
// import '/imports/website/views/css/views.css';
import '/public/css/dashboard.css';
import '/public/css/otherRoleDashboardCss.css';
import '/public/css/reportCss.css';
import '/public/css/ticket.css';
import '/imports/dashboard/companySetting/css/companySetting.css';
import '/imports/dashboard/generation/css/orderGeneration.css';
import '/public/css/reportGeneration.css';

import '/public/css/profileView';
// import './component.css';
// import './demo.css';
// import './normalize.css';
import './js-image-slider.css';
import './sliderman.css';


Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});


Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app-root'));
});


addCategoryImgsToS3Function = function(file,self,productId) {
        // console.log(file);
		    uploadInstance = ProductImage.insert({
		      file: file,
		      meta: {
		        locator : self.props.fileLocator,
		        userId  : Meteor.userId() // Optional, used to check on server for file tampering
		      },
		      streams         : 'dynamic',
		      chunkSize       : 'dynamic',
		      allowWebWorkers : true // If you see issues with uploads, change this to false
		    }, false);


	    self.setState({
	      uploading  : uploadInstance, // Keep track of this instance to use below
	      inProgress : true // Show the progress bar now
	    });

	    // These are the event functions, don't need most of them, it shows where we are in the process
	    uploadInstance.on('start', function () {
	      // console.log('Starting');
	    });

	    uploadInstance.on('end', function (error, fileObj) {
	      // console.log('On end File Object: ', fileObj);
	    });

	    uploadInstance.on('uploaded',  (error, fileObj) => {

	      // Reset our state for the next file
        //   console.log("fileObj: ",JSON.stringify(fileObj));
        //   console.log('https://spotyl.s3.amazonaws.com/'+fileObj.path);
          if(fileObj){
            //   Session.set("temporaryImageId",fileObj._id);
            // Meteor.call("temporaryImageId",fileObj._id);
            Meteor.call("addProductImages",fileObj._id, productId);
          }

	      self.setState({
	        uploading  : [],
	        progress   : 0,
	        inProgress : false
	      });
	    });

	    uploadInstance.on('error', function (error, fileObj) {
            console.log('Error during upload: ' + error);
	    //   console.log('Error during upload: ' + error.reason);
	    });

	    uploadInstance.on('progress', function (progress, fileObj) {
	      // console.log('Upload Percentage: ' + progress);
	      // Update our progress bar
	      self.setState({
	        progress : progress
	      })
	    });

	    uploadInstance.start(); // Must manually start the uploaded
}

// add service image function
addServicesImgsToS3Function = function(file,self) {
    uploadInstance = ServiceImage.insert({
                                        file: file,
                                        meta: {
                                                        locator : self.props.fileLocator,
                                                        userId  : Meteor.userId() // Optional, used to check on server for file tampering
                                        },
                                        streams         : 'dynamic',
                                        chunkSize       : 'dynamic',
                                        allowWebWorkers : true // If you see issues with uploads, change this to false
    }, false);

    self.setState({
        uploading  : uploadInstance, // Keep track of this instance to use below
        inProgress : true // Show the progress bar now
    });

    // These are the event functions, don't need most of them, it shows where we are in the process
    uploadInstance.on('start', function () {
    });
 
    uploadInstance.on('end', function (error, fileObj) {
    });

    uploadInstance.on('uploaded',  (error, fileObj) => {
        if(fileObj){
            // console.log("fileObj._id: ",fileObj._id);
            Meteor.call("addNewTemporaryServiceImage",fileObj._id,(error, result)=>{
                // swal({
                //     position: 'top-right',
                //     type: 'success',
                //     title: 'Uploaded Successfully',
                //     showConfirmButton: false,
                //     timer: 1500
                // });
            });
        }

        self.setState({
            uploading  : [],
            progress   : 0,
            inProgress : false
        });
    });

    uploadInstance.on('error', function (error, fileObj) {
    });

    uploadInstance.on('progress', function (progress, fileObj) {
        Session.set("uploadServiceImgProgressPercent",progress);
        
        self.setState({
            progress : progress
        })
    });

    uploadInstance.start(); // Must manually start the uploaded
}
// add user image function
addUserToS3Function = function(userId,file,self) {
    console.log("file",file);
    // console.log("self",self);
    uploadInstance = UserImage.insert({
                                        file: file,
                                        meta: {
                                                        locator : self.props.fileLocator,
                                                        userId  : Meteor.userId() // Optional, used to check on server for file tampering
                                        },
                                        streams         : 'dynamic',
                                        chunkSize       : 'dynamic',
                                        allowWebWorkers : true // If you see issues with uploads, change this to false
    }, false);

    self.setState({
        uploading  : uploadInstance, // Keep track of this instance to use below
        inProgress : true // Show the progress bar now
    });

    // These are the event functions, don't need most of them, it shows where we are in the process
    uploadInstance.on('start', function () { 
    });
 
    uploadInstance.on('end', function (error, fileObj) {
    });

    uploadInstance.on('uploaded',  (error, fileObj) => {
        if(fileObj){ 
            // console.log("fileObj._id: ",fileObj._id);
            Meteor.call("addUserImage",fileObj._id,userId,(error, result)=>{
                swal({
                    position: 'top-right',
                    type: 'success',
                    title: 'Uploaded Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
        }

        self.setState({
            uploading  : [],
            progress   : 0,
            inProgress : false
        });
    });

    uploadInstance.on('error', function (error, fileObj) {
    });

    uploadInstance.on('progress', function (progress, fileObj) {
        Session.set("uploadServiceImgProgressPercent",progress);
        
        self.setState({
            progress : progress
        })
    });

    uploadInstance.start(); // Must manually start the uploaded
}
// add video of news feed function
addNewsVideoS3Function = function(file,self,uploadType) {
    // console.log("self",self);
    uploadInstance = NewsVideo.insert({
                                        file: file,
                                        meta: {
                                                        locator : self.props.fileLocator,
                                                        userId  : Meteor.userId() // Optional, used to check on server for file tampering
                                        },
                                        streams         : 'dynamic',
                                        chunkSize       : 'dynamic',
                                        allowWebWorkers : true // If you see issues with uploads, change this to false
    }, false);

    self.setState({
        uploading  : uploadInstance, // Keep track of this instance to use below
        inProgress : true // Show the progress bar now
    });

    // These are the event functions, don't need most of them, it shows where we are in the process
    uploadInstance.on('start', function () {
    });
 
    uploadInstance.on('end', function (error, fileObj) {
    });

    uploadInstance.on('uploaded',  (error, fileObj) => {
        if(fileObj){
            // console.log("fileObj._id: ",fileObj._id);
            if (uploadType == "video") {
                Meteor.call("TempAddVideoToS3function",fileObj._id,(error, result)=>{
                swal({
                    position: 'top-right',
                    type: 'success',
                    title: 'Uploaded Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
              }); 
            }else if (uploadType == "image") {
                 Meteor.call("TempAddImagetoNewsFeed",fileObj._id,(error, result)=>{
                swal({
                    position: 'top-right',
                    type: 'success',
                    title: 'Uploaded Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
              }); 
                
            }
        }

        self.setState({
            uploading  : [],
            progress   : 0,
            inProgress : false
        });
    });

    uploadInstance.on('error', function (error, fileObj) {
    });

    uploadInstance.on('progress', function (progress, fileObj) {
        Session.set("uploadServiceImgProgressPercent",progress);
        
        self.setState({
            progress : progress
        })
    });

    uploadInstance.start(); // Must manually start the uploaded
}
// add Blog image function
addBlogImagesToS3Function = function(file,self,mediaType) {
    uploadInstance = BlogImage.insert({
                                        file: file,
                                        meta: {
                                                        locator : self.props.fileLocator,
                                                        userId  : Meteor.userId() // Optional, used to check on server for file tampering
                                        },
                                        streams         : 'dynamic',
                                        chunkSize       : 'dynamic',
                                        allowWebWorkers : true // If you see issues with uploads, change this to false
    }, false);

    self.setState({
        uploading  : uploadInstance, // Keep track of this instance to use below
        inProgress : true // Show the progress bar now
    });

    // These are the event functions, don't need most of them, it shows where we are in the process
    uploadInstance.on('start', function () {
    });
 
    uploadInstance.on('end', function (error, fileObj) {
    });

    uploadInstance.on('uploaded',  (error, fileObj) => {
        if(fileObj){
            // console.log("fileObj._id: ",fileObj._id);
            if (mediaType == "image") {
               Meteor.call("addNewTemporaryBlogImage",fileObj._id,(error, result)=>{
                swal({
                    position: 'top-right',
                    type: 'success',
                    title: 'Uploaded Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
              }); 
            }else if (mediaType == "video") {
             Meteor.call("addNewTemporaryBlogVideo",fileObj._id,(error, result)=>{
                swal({
                    position: 'top-right',
                    type: 'success',
                    title: 'Uploaded Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
              }); 
            }
        } 

        self.setState({
            uploading  : [],
            progress   : 0,
            inProgress : false
        });
    });

    uploadInstance.on('error', function (error, fileObj) {
    });

    uploadInstance.on('progress', function (progress, fileObj) {
        Session.set("uploadBlogImageProgressPercent",progress);
        
        self.setState({
            progress : progress
        })
    });

    uploadInstance.start(); // Must manually start the uploaded
}
// add Proof image function
addProofToS3Function = function(userId,file,prooftype,proofSubtype,self) {
    // console.log("file",file);
    // console.log("prooftype",prooftype);
    // console.log("self",self);
    uploadInstance = ProofDocuments.insert({
                                        file: file,
                                        meta: {
                                                        locator : self.props.fileLocator,
                                                        userId  : Meteor.userId() // Optional, used to check on server for file tampering
                                        },
                                        streams         : 'dynamic',
                                        chunkSize       : 'dynamic',
                                        allowWebWorkers : true // If you see issues with uploads, change this to false
    }, false);

    self.setState({
        uploading  : uploadInstance, // Keep track of this instance to use below
        inProgress : true // Show the progress bar now
    });

    // These are the event functions, don't need most of them, it shows where we are in the process
    uploadInstance.on('start', function () {
    });
 
    uploadInstance.on('end', function (error, fileObj) {
    });

    uploadInstance.on('uploaded',  (error, fileObj) => {
        if(fileObj){ 
            // console.log("fileObj._id: ",fileObj._id);
            Meteor.call("addNewTempProofDocs",fileObj._id,userId,prooftype,proofSubtype,(error, result)=>{
                swal({
                    position: 'top-right',
                    type: 'success',
                    title: 'Uploaded Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
        }

        self.setState({
            uploading  : [],
            progress   : 0,
            inProgress : false
        });
    });

    uploadInstance.on('error', function (error, fileObj) {
    });

    uploadInstance.on('progress', function (progress, fileObj) {
        console.log("session set progress :"+progress);
        Session.set("uploadProofDocProgressPercent",progress);
        
        self.setState({
            progress : progress
        })
    });

    uploadInstance.start(); // Must manually start the uploaded
}
// add ticket image function
addImgsToS3Function = function(file,self) {
    uploadInstance = TicketImages.insert({
                                        file: file,
                                        meta: {
                                        locator : self.props.fileLocator,
                                        userId  : Meteor.userId() // Optional, used to check on server for file tampering
                                        },
                                        streams         : 'dynamic',
                                        chunkSize       : 'dynamic',
                                        allowWebWorkers : true // If you see issues with uploads, change this to false
    }, false);

    self.setState({
        uploading  : uploadInstance, // Keep track of this instance to use below
        inProgress : true // Show the progress bar now
    }); 

    // These are the event functions, don't need most of them, it shows where we are in the process
    uploadInstance.on('start', function () {
    });
 
    uploadInstance.on('end', function (error, fileObj) {
    });

    uploadInstance.on('uploaded',  (error, fileObj) => {
        if(fileObj){
            // console.log("fileObj._id: ",fileObj._id);
            Meteor.call("addNewTemporaryTicketImages",fileObj._id,(error, result)=>{
                // swal({
                //     position: 'top-right',
                //     type: 'success',
                //     title: 'Uploaded Successfully',
                //     showConfirmButton: false,
                //     timer: 1500
                // });
                

            });
        }

        self.setState({
            uploading  : [],
            progress   : 0,
            inProgress : false
        });
    });

    uploadInstance.on('error', function (error, fileObj) {
    });

    uploadInstance.on('progress', function (progress, fileObj) {
        Session.set("uploadDocumentProgressbar",progress);
        
        self.setState({
            progress : progress
        })
    });

    uploadInstance.start(); // Must manually start the uploaded
}
// add video of ticket function
addTicketVideoS3Function = function(file,self) {
    // console.log("self",self);
    uploadInstance = TicketVideo.insert({
                                        file: file,
                                        meta: {
                                        locator : self.props.fileLocator,
                                        userId  : Meteor.userId() // Optional, used to check on server for file tampering
                                        },
                                        streams         : 'dynamic',
                                        chunkSize       : 'dynamic',
                                        allowWebWorkers : true // If you see issues with uploads, change this to false
    }, false);

    self.setState({
        uploading  : uploadInstance, // Keep track of this instance to use below
        inProgress : true // Show the progress bar now
    });

    // These are the event functions, don't need most of them, it shows where we are in the process
    uploadInstance.on('start', function () {
    });
 
    uploadInstance.on('end', function (error, fileObj) {
    });

    uploadInstance.on('uploaded',  (error, fileObj) => {
        if(fileObj){
            // console.log("fileObj._id: ",fileObj._id);
            Meteor.call("TempTicketVideoToS3function",fileObj._id,(error, result)=>{
            // swal({
            //     position: 'top-right',
            //     type: 'success',
            //     title: 'Uploaded Successfully',
            //     showConfirmButton: false,
            //     timer: 1500
            // });
            
          }); 
        }

        self.setState({
            uploading  : [],
            progress   : 0,
            inProgress : false
        });
    });

    uploadInstance.on('error', function (error, fileObj) {
    });

    uploadInstance.on('progress', function (progress, fileObj) {
        Session.set("uploadVideoProgressbar",progress);
        
        self.setState({
            progress : progress
        })
    });

    uploadInstance.start(); // Must manually start the uploaded
},

addReportFunction = function(file,self,fileextension) {
    uploadInstance = TicketReport.insert({
                                        file: file,
                                        meta: {
                                        locator : self.props.fileLocator,
                                        userId  : Meteor.userId() // Optional, used to check on server for file tampering
                                        },
                                        streams         : 'dynamic',
                                        chunkSize       : 'dynamic',
                                        allowWebWorkers : true // If you see issues with uploads, change this to false
    }, false);

    self.setState({
        uploading  : uploadInstance, // Keep track of this instance to use below
        inProgress : true // Show the progress bar now
    });

    // These are the event functions, don't need most of them, it shows where we are in the process
    uploadInstance.on('start', function () {
    });
 
    uploadInstance.on('end', function (error, fileObj) {
    });

    uploadInstance.on('uploaded',  (error, fileObj) => {
        if(fileObj){
            // console.log("fileObj._id: ",fileObj._id);
            Meteor.call("TempReportToS3function",fileObj._id,fileextension,(error, result)=>{
            // swal({
            //     position: 'top-right',
            //     type: 'success',
            //     title: 'Uploaded Successfully',
            //     showConfirmButton: false,
            //     timer: 1500
            // });
        // Session.set("uploadReportProgressPercent","");
            
          }); 
        }

        self.setState({
            uploading  : [],
            progress   : 0,
            inProgress : false
        });
    });

    uploadInstance.on('error', function (error, fileObj) {
    });

    uploadInstance.on('progress', function (progress, fileObj) {
        Session.set("uploadReportProgressPercent",progress);
        
        self.setState({
            progress : progress
        })
    });

    uploadInstance.start(); // Must manually start the uploaded
}