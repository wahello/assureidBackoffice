import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const CompanyOrder = new Mongo.Collection("companyOrder");
export const TempCompanyOrder = new Mongo.Collection("tempCompanyOrder");
export const RequestPool = new Mongo.Collection("requestPool");

if(Meteor.isServer){
  import { UserProfile } from "../../forms/api/userProfile.js";
  import { Order } from "../../ServiceProcess/api/Order.js";
  import { HolidaysList } from '/imports/dashboard/forms/api/HolidaysList.js';
  import { Services } from '../../../dashboard/reactCMS/api/Services.js';
  Meteor.publish('companyOrderData',()=>{
   return CompanyOrder.find({});
  });  
  Meteor.publish('tempCompanyOrderDetails',()=>{
    return TempCompanyOrder.find({});
  });
  Meteor.publish('requestPoolData',()=>{
    return RequestPool.find({});
  });
 
  Meteor.methods({
    "addTempCompanyOrder": function(formValues){
      var userProfile  = UserProfile.findOne({'emailId':formValues.emailId});
      var serviceName = formValues.serviceName;
      var compDate = '';
      if(userProfile){
        // if(serviceName == 'Address Verification'){
        //   if(userProfile.currentAddress){
        //     if(userProfile.currentAddress.length > 0){
        //       for (var i = 0; i < userProfile.currentAddress.length; i++) {
        //         var toDate = userProfile.currentAddress[i].tempresidingTo;
        //         if(toDate == 'Present'){
        //           var currAddrVerifStatus = userProfile.currentAddress[i].verifiedStatus;
        //           break;
        //         }
        //       }else{
                 //    if(toDate >= compDate){
                 //      var max = toDate;
                 //      compDate =  toDate;
                 //    }
                 // }
        //       if(!currAddrVerifStatus){
        //         new Date(Math.max.apply(null, userProfile.currentAddress.map(function(e) {
        //           console.log(new Date(e.tempresidingTo));
        //           return new Date(e.tempresidingTo);
        //         })));
        //         // var currAddrVerifStatus = userProfile.currentAddress[i].verifiedStatus;
        //       }
        //     }
        //   }
        //   var permAddrVerifStatus = '';
        // }else if(serviceName == 'Academics Verification'){
        //   // var currAddrVerifStatus = ;
        //   // var permAddrVerifStatus = ;
        // }else if(serviceName == 'Employment Verification'){

        // }else{

        // }

        var orderData = Order.findOne({'userId':userProfile.userId,'serviceName':serviceName},{sort: {createdAt: -1}});
        if(orderData){
          if(orderData.completedDate){
            var reportUrl = orderData.genratedReport;
            var report = 'Report';
            var selected = false;
            var verifStatus = 'Completed';
            var verifDate = orderData.completedDate;
          }else{
            var reportUrl = '';
            var report = '-';
            var selected = true;
            var verifStatus = 'Initiated'
            var verifDate = orderData.createdAt;
          }
        }else{
          var reportUrl = '';
          var report = '-';
          var selected = true;
          var verifStatus = 'Not Initiated';
          var verifDate = '';
        }

        var assureId = userProfile.assureId;
      }else{
        var assureId = '-';
        var report = '-';
        var selected = true;
        var verifStatus = 'Not Initiated';
        var verifDate = '';
        var reportUrl = '';
      }
      
      TempCompanyOrder.insert({
        "userId"            : formValues.userId,
        "firstName"         : formValues.firstName,
        "lastName"          : formValues.lastName,
        "emailId"           : formValues.emailId,
        "mobile"            : formValues.mobile,
        "aadharNo"          : formValues.aadharNo,
        "assureId"          : assureId,
        "report"            : report,
        "type"              : formValues.type,
        "selected"          : selected,
        "companyAssureId"   : formValues.assureId,
        "serviceName"       : serviceName,
        "serviceId"         : formValues.serviceId,
        "verifStatus"       : verifStatus,
        "verifDate"         : verifDate,
        "reportUrl"         : reportUrl, 
        },(error, result)=>{
      }); 
    },
    "removeTempCompanyOrder": function(id){
      TempCompanyOrder.remove({'_id':id}); 
    },
    "updateTempCompanyOrder": function(formValues,id){
      var userProfile  = UserProfile.findOne({'emailId':formValues.emailId});
      var serviceName = formValues.serviceName;
      var compDate = '';
      if(userProfile){
        // if(serviceName == 'Address Verification'){
        //   if(userProfile.currentAddress){
        //     if(userProfile.currentAddress.length > 0){
        //       for (var i = 0; i < userProfile.currentAddress.length; i++) {
        //         var toDate = userProfile.currentAddress[i].tempresidingTo;
        //         if(toDate == 'Present'){
        //           var currAddrVerifStatus = userProfile.currentAddress[i].verifiedStatus;
        //           break;
        //         }else{
        //           if(toDate >= compDate){
        //             var max = toDate;
        //             compDate =  toDate;
        //             var currAddrVerifStatus = userProfile.currentAddress[i].verifiedStatus;
        //           }
        //         }
        //       }
        //       // console.log(max);
        //       // console.log(currAddrVerifStatus);
        //       // if(!currAddrVerifStatus){
        //       //   new Date(Math.max.apply(null, userProfile.currentAddress.map(function(e) {
        //       //     var currAddrVerifStatus = e.verifiedStatus;
        //       //     TempCompanyOrder.update(
        //       //       {'_id': id },
        //       //       {
        //       //         $set:{
        //       //           "currAddrVerifStatus" : currAddrVerifStatus,
        //       //         } //End of set
        //       //       }
        //       //     );
        //       //   })));
        //       // }
        //     }
        //   }
        //   if(userProfile.permanentAddress){
        //     if(userProfile.permanentAddress.length > 0){
        //       for (var i = 0; i < userProfile.permanentAddress.length; i++) {
        //         var toDate = userProfile.permanentAddress[i].residingTo;
        //         if(toDate == 'Present'){
        //           var permAddrVerifStatus = userProfile.permanentAddress[i].verifiedStatus;
        //           TempCompanyOrder.update(
        //             {'_id': id },
        //             {
        //               $set:{
        //                 "permAddrVerifStatus" : permAddrVerifStatus,
        //               } //End of set
        //             }
        //           );
        //           break;
        //         }
        //       }
        //       if(!permAddrVerifStatus){
        //         new Date(Math.max.apply(null, userProfile.permanentAddress.map(function(e) {
        //           var permAddrVerifStatus = e.verifiedStatus;
        //           TempCompanyOrder.update(
        //             {'_id': id },
        //             {
        //               $set:{
        //                 "permAddrVerifStatus" : permAddrVerifStatus,
        //               } //End of set
        //             }
        //           );
        //         })));
        //       }
        //     }
        //   }
        // }else if(serviceName == 'Academics Verification'){
        // }else if(serviceName == 'Employment Verification'){
        // }else{
        // }
        var orderData = Order.findOne({'userId':userProfile.userId,'serviceName':serviceName},{sort: {createdAt: -1}});
        if(orderData){
          if(orderData.completedDate){
            var reportUrl = orderData.genratedReport;
            var report = 'Report';
            var selected = false;
            var verifStatus = 'Completed';
            var verifDate = orderData.completedDate;
          }else{
            var reportUrl = '';
            var report = '-';
            var selected = true;
            var verifStatus = 'Initiated'
            var verifDate = orderData.createdAt;
          }
        }else{
          var reportUrl = '';
          var report = '-';
          var selected = true;
          var verifStatus = 'Not Initiated';
          var verifDate = '';
        }

        var assureId = userProfile.assureId;
      }else{
        var assureId = '-';
        var report = '-';
        var selected = true;
        var verifStatus = 'Not Initiated';
        var verifDate = '';
        var reportUrl = '';
      }

      TempCompanyOrder.update(
        {'_id': id },
        {
          $set:{
            "userId"            : formValues.userId,
            "firstName"         : formValues.firstName,
            "lastName"          : formValues.lastName,
            "emailId"           : formValues.emailId,
            "mobile"            : formValues.mobile,
            "aadharNo"          : formValues.aadharNo,
            "assureId"          : assureId,
            "report"            : report,
            // "type"              : formValues.type,
            "selected"          : selected,
            "companyAssureId"   : formValues.assureId,
            "serviceName"       : formValues.serviceName,
            "serviceId"         : formValues.serviceId,
            "verifStatus"       : verifStatus,
            "verifDate"         : verifDate,
            "reportUrl"         : reportUrl, 
          } //End of set
        }
      );  
    },
    "updateSelectedEmpTrue": function(id){
      TempCompanyOrder.update(
        {'_id': id },
        {
          $set:{
            "selected"            : true,
          } //End of set
        }
      );
    },
    "updateSelectedEmpFalse": function(id){
      TempCompanyOrder.update(
        {'_id': id },
        {
          $set:{
            "selected"            : false,
          } //End of set
        }
      );
    },
    "insertCompanyOrder": function(finalCheckedList,serviceId,serviceName,assureId){
      var companyOrder = CompanyOrder.findOne({},{sort: {createdAt: -1}});
      if(companyOrder){
        var orderNo = parseInt(companyOrder.orderNo) + 1;
      }else{
        var orderNo = 1;
      }
      CompanyOrder.insert({
          "orderNo"           : orderNo,
          "orderPlacedBy"     : Meteor.userId(),
          "companyAssureId"   : assureId,
          "serviceName"       : serviceName,
          "serviceId"         : serviceId,
          "createdAt"         : new Date(),
        },(error, result)=>{
      });
      for (var i = 0; i < finalCheckedList.length; i++) {
        var formValues = TempCompanyOrder.findOne({"_id":finalCheckedList[i]._id});
        if(formValues){
          if(formValues.assureId == '-'){
            var latestUsersDetails  = Meteor.users.findOne({'profile.loginAs':'user'},{sort: {"createdAt":-1}});
            if(latestUsersDetails){
              if(latestUsersDetails.profile){
                if(latestUsersDetails.profile.assureId){
                  var str = latestUsersDetails.profile.assureId;
                }else{
                  var str = "IN-AAA-000000";
                }
              }
            }else{
              var str = "IN-AAA-000000";
            }

            var type = 'user';
            var splitStr = str.split('-');
            //splitStr[0] - Country Code
            //splitStr[1] - Character Code
            //splitStr[2] - Number
            //Number Logic
            // document.getElementById("demo").innerHTML = str;
            var firstChar = splitStr[1].substr(2,1);
            var middleChar = splitStr[1].substr(1,1);
            var lastChar = splitStr[1].substr(0,1);
            //Charcter Code Calculation
            //if DEG - then G - last E - middle D - first
            //var first2Char = splitStr[1].substr(1,1); /*second digit*/
             
            var number = parseInt(splitStr[2]);
            var last = number + 1;
            var last0 = '0';
            if(last > 0 && last < 11){
              last0 = '00000' + last;
              if(last == 10){last0 = '0000' + last;}
            }else if(last > 10 && last < 101){
              last0 = '0000' + last;
              if(last == 100){last0 = '000' + last;}
            }else if(last > 100 && last < 1001){
              last0 = '000' + last;
              if(last == 1000){last0 = '00' + last;}
            }else if(last > 1000 && last < 10001){
              last0 = '00' + last;
              if(last == 10000){last0 = '0' + last;}
            }else if(last > 10000 && last < 100001){
              last0 = last;
            }else if(last > 999999){
              last0 = '000000';         
              if(firstChar != 'Z'){
                var firstAscii = firstChar.charCodeAt();
                firstAscii = firstAscii + 1;
                firstChar = String.fromCharCode(firstAscii);
              }else{
                firstChar = 'A'; 
                if(middleChar != 'Z'){
                  var middleAscii  = middleChar.charCodeAt();
                  middleAscii  = middleAscii  + 1;
                  middleChar = String.fromCharCode(middleAscii );
                }else{
                  middleChar = 'A'; 
                  if(type == 'user'){
                    var lastAscii = lastChar.charCodeAt();
                    if(lastChar == 'B'){
                      lastAscii = lastAscii + 2;
                    }else{
                      lastAscii = lastAscii + 1;
                    }
                    lastChar = String.fromCharCode(lastAscii );
                  }
                } 
              }
            }
            var newAssureID = splitStr[0] + '-' + lastChar+middleChar+firstChar + '-' + last0;
            var isNewAssureID = true;

            var userValues = {
              'firstname'        : (formValues.firstName).trim(),
              'lastname'         : (formValues.lastName).trim(),
              'signupEmail'      : formValues.emailId,
              'mobNumber'        : formValues.mobile,
              'signupPassword'   : 'companyuser123',
              'aadharCard'       : formValues.aadharNo,
              'assureId'         : newAssureID,
            }  

            Meteor.call('userCreateAccount', userValues ,(error,result) => {
              if(error){
                swal(error.reason);
              }else{      
                var mobile = formValues.mobile;
                var mobileotp = Math.floor(1000 + Math.random() * 9000);
                var emailotp = Math.floor(100000 + Math.random() * 900000);
                // ADD USER ROLE 
                var newID = result;

                var basicformValues = {
                  "userId"          : newID,
                  "firstName"       : formValues.firstName,
                  "lastName"        : formValues.lastName,
                  "fatherFirstName" : '',
                  "fatherLastName"  : '',
                  "motherFirstName" : '',
                  "motherLastName"  : '',
                  "spouseFirstName" : '',
                  "spouseLastName"  : '',
                  "gender"          : 'Female',
                  "dateOfBirth"     : '',
                  "mobileNo"        : formValues.mobile,
                  "altMobileNo"     : '',
                  "emailId"         : formValues.emailId,
                  "altEmailId"      : '',
                  'assureId'        : newAssureID,
                  "proofType"       : '',
                  "proofOfDocument" : '', 
                  "fileExt"         : '',
                  "fileName"        : '',
                  "aadharCard"      : formValues.aadharNo,
                }
                Meteor.call("insertBasicData", basicformValues, function(error,result){
                  if(error){
                    console.log(error.reason);
                  }else{
                    // Meteor.logout();
                  }
                });
                
                Meteor.call('addOTP', newID , mobileotp, emailotp, function(error,result){
                  if(error){
                    console.log(error);
                  }else{

                  }
                });

                var Role  = "user";
                Meteor.call('addRoles', newID , Role, function(error,result){
                  if(error){
                    console.log(error);
                  }else{                    
                  }
                }); // add role

                //Send OTP  
                if(mobile != ""){
                  var mobileotpStr = mobileotp.toString();
                  var smsBody = "Enter "+mobileotpStr+" to verify your account on ASSUREiD.";
                  Meteor.call('SEND_SMS',mobile,smsBody,
                  function(error,result){
                    if(error){
                      console.log(error.reason);
                    }else{
                      // swal('Successfully sent the OTP to your mobile number.');                   
                    }
                  }); 
                }else{
                  swal('Your mobile number is not found. Please enter valid mobile number.');
                }   

                // SEND EMAIL VERIFICATION LINK
                Meteor.call('sendVerificationLinkToUser', newID, function(error,result){
                  if(error){
                    console.log(error);
                  }else{  
                    // swal('Successfully sent the OTP to your email address.');                   
                  } //end else
                }); // send verification mail ends

                var adminData   = Meteor.users.findOne({'roles' : "admin"});
                var userData    = Meteor.users.findOne({"_id" : newID});
                if (adminData) {
                  var adminId  = adminData._id;
                }
                if (userData) {
                  if (userData.profile) {
                    var firstLastNm = userData.profile.firstname+' '+userData.profile.lastname;
                    var mobNumber   = userData.profile.mobNumber;
                  }
                }
                var newDate     = new Date();
                var msgvariable = {                       
                  // '[username]' : firstLastNm,
                  '[date]'     : moment(newDate).format("DD/MM/YYYY"),
                };
                
                // Format for send Email //
                var inputObj = {
                    from         : adminId,
                    to           : newID,
                    templateName : 'Company Non-AssureID Users',
                    variables    : msgvariable,
                }
                sendMailNotification(inputObj);
                
                // Format for sending SMS //
                var smsObj = {
                    to           : newID,
                    templateName : 'Company Non-AssureID Users',
                    number       : mobNumber,
                    variables    : msgvariable,
                }
                // console.log("smsObj",smsObj);
                sendSMS(smsObj);

                // Format for sending notification //
                // var notifictaionObj = {
                //   to           : newID,
                //   templateName : 'New Registration',
                //   variables    : msgvariable,
                // }
                // sendInAppNotification(notifictaionObj);      
              } //end else
            });
          }else{
            var adminData   = Meteor.users.findOne({'roles' : "admin"});
            var userData    = Meteor.users.findOne({"profile.assureId" : formValues.assureId});
            if (adminData) {
              var adminId  = adminData._id;
            }
            if (userData) {
              if (userData.profile) {
                var firstLastNm = userData.profile.firstname+' '+userData.profile.lastname;
                var mobNumber   = userData.profile.mobNumber;
              }
            }
            var newDate     = new Date();
            var msgvariable = {                       
              // '[username]' : firstLastNm,
              '[date]'     : moment(newDate).format("DD/MM/YYYY"),
            };
            
            // Format for send Email //
            var inputObj = {
                from         : adminId,
                to           : userData._id,
                templateName : 'Company AssureID Users',
                variables    : msgvariable,
            }
            sendMailNotification(inputObj);
            
            // Format for sending SMS //
            var smsObj = {
                to           : userData._id,
                templateName : 'Company AssureID Users',
                number       : mobNumber,
                variables    : msgvariable,
            }
            // console.log("smsObj",smsObj);
            sendSMS(smsObj);

            // Format for sending notification //
            // var notifictaionObj = {
            //   to           : newID,
            //   templateName : 'New Registration',
            //   variables    : msgvariable,
            // }
            // sendInAppNotification(notifictaionObj);

            var newAssureID = formValues.assureId;
            var isNewAssureID = false;
          }
          var userProfileData  = UserProfile.findOne({'emailId':formValues.emailId});
          // console.log(userProfileData);
          if(isNewAssureID){
            if(userProfileData){
              var orderData = Order.findOne({'userId':userProfileData.userId,'serviceName':serviceName},{sort: {createdAt: -1}});
            }else{
              var orderData = '';
            }
            if(orderData){
              if(orderData.completedDate){
                var reportUrl = orderData.genratedReport;
                var report = 'Report';
                var verifStatus = 'Completed';
                var verifDate = orderData.completedDate;
              }else{
                var reportUrl = '';
                var report = '-';
                var verifStatus = 'Initiated'
                var verifDate = orderData.createdAt;
              }
            }else{
              var reportUrl = '';
              var report = '-';
              var verifStatus = 'Not Initiated';
              var verifDate = '';
            }
          }else{
            var report = '-';
            var verifStatus = 'Not Initiated';
            var verifDate = '';
            var reportUrl = '';
          }
          var companyId = CompanyOrder.findOne({},{sort: {createdAt: -1}});
          CompanyOrder.update({"_id" : companyId._id},
            {$push : {
              "orderDetails" : {
                "firstName"         : formValues.firstName,
                "lastName"          : formValues.lastName,
                "emailId"           : formValues.emailId,
                "mobile"            : formValues.mobile,
                "aadharNo"          : formValues.aadharNo,
                "assureId"          : newAssureID,
                "report"            : report,
                "isNewAssureID"     : isNewAssureID,
                "verifStatus"       : verifStatus,    
                "verifDate"         : verifDate, 
                "reportUrl"         : reportUrl, 
              },
            }
           }
          );
        }
      }
      
      var HolidaysDB = HolidaysList.find({}).fetch();
      if(HolidaysDB.length){
        var holidaysList = [];
        for(l = 0 ;l < HolidaysDB.length; l++){
          holidaysList.push(HolidaysDB[l].holidayDate);
        }
        // console.log('holidaysList ',holidaysList);
      }
      var services = Services.findOne({"_id":serviceId}) || {};
      // console.log(services);
      if(services && holidaysList){
        if(services.serviceRate && holidaysList.length > 0){
          var serviceDayNumbers = services.serviceRate;
          var tatDate1 = moment().addWorkdays(parseInt(serviceDayNumbers),holidaysList);
        }else{
          var tatDate1 = '';
        }
      }else{
        var tatDate1 = '';
      }
      var companyProfile = CompanyProfile.findOne({'companyAssureID':assureId});
      // console.log(companyProfile);
      if(companyProfile){
        if(companyProfile.paymentBy){
          var paymentBy = companyProfile.paymentBy;
        }else{
          var paymentBy = '';
        }
      }

      RequestPool.insert({
          "orderId"           : companyId._id,
          "orderNo"           : orderNo,
          "companyAssureId"   : assureId,
          "serviceName"       : serviceName,
          "serviceId"         : serviceId,
          "orderDate"         : companyId.createdAt,
          "createdAt"         : new Date(),
          "tatDate"           : tatDate1,
          "createdBy"         : Meteor.userId(),
          "status"            : paymentBy,
        },(error, result)=>{
      });
      TempCompanyOrder.remove({'companyAssureId':assureId,'serviceId':serviceId});
    },
    'BulkCompanyCSVUpload': function(csvObject,serviceId,serviceName,companyassureId){
      check( csvObject, Array);
      var uploadSyncArr = [];
      if(csvObject){
        UserSession.set("allProgressbarSession", csvObject.length-2, Meteor.userId());
        for(i=0;i<csvObject.length;i++){
          if(csvObject[i].FirstName && csvObject[i].LastName && csvObject[i].EmailID && csvObject[i].MobileNo && csvObject[i].AadharNumber){
            var userProfile  = UserProfile.findOne({'emailId':csvObject[i].EmailID});
            if(userProfile){
              var orderData = Order.findOne({'userId':userProfile.userId,'serviceName':serviceName},{sort: {createdAt: -1}});
              if(orderData){
                if(orderData.completedDate){
                  var reportUrl = orderData.genratedReport;
                  var report = 'Report';
                  var selected = false;
                  var verifStatus = 'Completed';
                  var verifDate = orderData.completedDate;
                }else{
                  var reportUrl = '';
                  var report = '-';
                  var selected = true;
                  var verifStatus = 'Initiated'
                  var verifDate = orderData.createdAt;
                }
              }else{
                var reportUrl = '';
                var report = '-';
                var selected = true;
                var verifStatus = 'Not Initiated';
                var verifDate = '';
              }

              var assureId = userProfile.assureId;
            }else{
              var assureId = '-';
              var report = '-';
              var selected = true;
              var verifStatus = 'Not Initiated';
              var verifDate = '';
              var reportUrl = '';
            }

            uploadSyncArr[i] = TempCompanyOrder.insert({
              'userId'                        : Meteor.userId(),
              'firstName'                     : csvObject[i].FirstName,
              'lastName'                      : csvObject[i].LastName,
              'emailId'                       : csvObject[i].EmailID,
              'mobile'                        : csvObject[i].MobileNo,
              'aadharNo'                      : csvObject[i].AadharNumber,
              'assureId'                      : assureId,
              'report'                        : report,
              'type'                          : 'bulk',
              'selected'                      : selected,
              "companyAssureId"               : companyassureId,
              "serviceName"                   : serviceName,
              "serviceId"                     : serviceId,
              "verifStatus"                   : verifStatus,    
              "verifDate"                     : verifDate,    
              "reportUrl"                     : reportUrl, 
            }); 
            if(uploadSyncArr[i]){
              UserSession.set("progressbarSession", i, Meteor.userId());
            }
          }
        }
      }
    },
    'updateCompanyOrder':function(companyorderId,assureId,orderId){
      CompanyOrder.update({"_id":companyorderId, "orderDetails.assureId" : assureId},{
        $set:{
          ["orderDetails.$.verifStatus"] : "Initiated",
          ["orderDetails.$.verifDate"]   : new Date(),
          ["orderDetails.$.orderId"] : orderId,
        }
      })
    },
    'updateStatusInCompanyOrder':function(orderId,companyReference){
      if (companyReference) {
        for (var i = 0; i < companyReference.length; i++) {
          var companymatchedOrder = CompanyOrder.findOne({"_id" : companyReference[i].companyOrderId});
        }
      }

      CompanyOrder.update({"_id" : companymatchedOrder._id, "orderDetails.orderId" : orderId},{
        $set: {
          ["orderDetails.$.verifStatus"] : "Completed",
        }
      });

      if (companymatchedOrder) {
        var companyorderPlacedBy = companymatchedOrder.orderPlacedBy;
        var statusCount = 0;
        if (companymatchedOrder.orderDetails) {
          for (var i = 0; i < companymatchedOrder.orderDetails.length; i++) {
            if (companymatchedOrder.orderDetails.verifStatus == "Completed") {
              statusCount++;
            }
          }
        }
        if (companymatchedOrder.orderDetails.length == statusCount) {
          var adminData   = Meteor.users.findOne({'roles' : "admin"});
            var userData    = Meteor.users.findOne({"_id" : companyorderPlacedBy});
          
            if (adminData) {
              var adminId  = adminData._id;
            }
            
            if (userData) {
              var newID = userData._id;
              if (userData.profile) {
                var firstLastNm = userData.profile.firstname+' '+userData.profile.lastname;
                var mobNumber   = userData.profile.mobNumber;
              }
            }
            
            var newDate     = new Date();

            var msgvariable = {                       
                              '[username]': firstLastNm,
                              '[date]'    : moment(newDate).format("DD/MM/YYYY"),
                            };
            // Format for send Email //
            var inputObj = {
                from         : adminId,
                to           : newID,
                templateName : 'CompanyOrderCompleted',
                variables    : msgvariable,
            }
            sendMailNotification(inputObj);
            
            // Format for sending SMS //
            var smsObj = {
                to           : newID,
                templateName : 'CompanyOrderCompleted',
                number       : mobNumber,
                variables    : msgvariable,
            }
            sendSMS(smsObj);

            // Format for sending notification //
            var notifictaionObj = {
              to           : newID,
              templateName : 'CompanyOrderCompleted',
              variables    : msgvariable,
            }
            sendInAppNotification(notifictaionObj);
        }
      }

    }
  });
}