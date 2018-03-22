import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {WebApp} from 'meteor/webapp';
import {PlivoDetails} from '../imports/dashboard/reactCMS/api/plivoDetails.js';
import { HTTP } from 'meteor/http';

import './slingshot.js';
import '../imports/dashboard/reactCMS/api/users.js';
import '../imports/dashboard/reactCMS/api/aboutus.js';
import '../imports/dashboard/reactCMS/api/BasicPages.js';
import '../imports/dashboard/reactCMS/api/Blocks.js';
import '../imports/dashboard/reactCMS/api/BlogPages.js';
import '../imports/dashboard/reactCMS/api/CareerPages.js';
import '../imports/dashboard/reactCMS/api/Events.js';
import '../imports/dashboard/reactCMS/api/FAQS.js';
import '../imports/dashboard/reactCMS/api/JobApps.js';
import '../imports/dashboard/reactCMS/api/ManageContacts.js';
import '../imports/dashboard/reactCMS/api/PhotoGallery.js';
import '../imports/dashboard/reactCMS/api/Portfolios.js';
import '../imports/dashboard/reactCMS/api/Products.js';
import '../imports/dashboard/reactCMS/api/Services.js';
import '../imports/dashboard/reactCMS/api/plivoDetails.js';
import '../imports/dashboard/forms/api/NewsFeed.js';


import '/imports/dashboard/notification/api/NotificationTemplate.js';
import '/imports/dashboard/notification/api/Notification.js';
import '/imports/dashboard/product/addNewProduct/api/ProductMaster.js';
import '/imports/dashboard/product/addNewProduct/api/CategoryMaster.js';
import '/imports/dashboard/product/addNewProduct/api/projectSettings.js';

import '/imports/dashboard/userManagement/api/userAccounts.js';
// import '../imports/website/forms/api/userProfile.js';

import '../imports/dashboard/forms/api/QualificationLevel.js';
import '../imports/dashboard/forms/api/University.js';
import '../imports/dashboard/forms/api/College.js';
import '../imports/dashboard/forms/api/PoliceStation.js';
import '../imports/dashboard/forms/api/ManageLocation.js';
import '../imports/dashboard/ticketManagement/api/TempUpload.js';


import '../imports/website/ServiceProcess/api/TicketMaster.js';
// import { CategoryImage } from '../imports/dashboard/product/addNewProduct/api/CategoryImage.js';
// Meteor.publish('categoryImagePublish', function() {
//     return CategoryImage.find().cursor;
// });

var plivoData =  PlivoDetails.findOne({});

Meteor.startup(() => {
  // code to run on server at startup
  WebApp.rawConnectHandlers.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return next();
  });

});

if(plivoData){
  // console.log("plivoData: ",plivoData);
  Meteor.methods({
  SEND_SMS: function (toNumber, smsBody) {
    this.unblock();
    return Meteor.http.call("GET", "http://beta.mahasurvey.net/WebService/MahaSurveyWbSrvce.asmx/SEND_SMS?MOBNO="+toNumber+"&TEXT_MSG="+smsBody);
  },

  'sendSMS': function(toNumber, smsBody) {

    var api = Plivo.RestAPI({authId: plivoData.key, authToken: plivoData.secret});

    var params = {
      'src': plivoData.sender, // Sender's phone number with country code
      'dst': '91' + toNumber.toString(), // Receiver's phone Number with country code
      'text': smsBody, // Your SMS Text Message - English
      'type': "sms"
    };

    var connectHandler = WebApp.connectHandlers; // get meteor-core's connect-implementation

    // attach connect-style middleware for response header injection
    Meteor.startup(function() {
      connectHandler.use(function(req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        return next();
      })
    })

    api.send_message(params, function(status, response) {
      console.log('Status: ', status);
      console.log('API Response:\n', response);
    });

  },

  'sendOtp':function(mobile,otp){

    var api = Plivo.RestAPI({
      authId: plivoData.key,
      authToken: plivoData.secret
    });

    var params = {
      'src'  : plivoData.sender, // Sender's phone number with country code
      'dst'  : "91".concat(mobile.toString()), // Receiver's phone Number with country code
      'text' : "Enter "+otp.toString()+" to verify your account on ASSUREiD.", // Your SMS Text Message - English
      'type' : "sms",
    };

    var connectHandler = WebApp.connectHandlers; // get meteor-core's connect-implementation

    // attach connect-style middleware for response header injection
    Meteor.startup(function () {
      connectHandler.use(function (req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "*");
        return next();
      })
    })

    // Prints the complete response
    api.send_message(params, function (status, response) {
      console.log('Status: ', status);
      console.log('API Response:\n', response);
    });
  },
});  
}


