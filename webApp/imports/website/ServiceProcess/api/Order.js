import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import { UserProfile } from '/imports/website/forms/api/userProfile.js';
import { TicketMaster } from '/imports/website/ServiceProcess/api/TicketMaster.js';
import { browserHistory } from 'react-router';
export const Order = new Mongo.Collection("order");
export const TempOrder = new Mongo.Collection("tempOrder");

if(Meteor.isServer){
     Meteor.publish('allOrders',()=>{
        return Order.find({});
    });
	  Meteor.publish('singleOrder',(_id)=>{
        return Order.find({"_id" : _id});
    });
    Meteor.publish('singleTempOrder',(_id)=>{
        return TempOrder.find({"_id" : _id});
    });
    

	  Meteor.methods({
   	 'insertTempPayment':function(invoiceDate,invoiceNo,serviceId,serviceName,serviceRate,serviceDuration,userId,userName,totalAmount) {
   	      var id  = TempOrder.insert({
   	      	  "invoiceDate"      :   invoiceDate,
   	      	  "invoiceNo"        :   invoiceNo,
              "serviceId"        :   serviceId,
              "serviceName"      :   serviceName,
              "serviceRate"      :   serviceRate,
              "serviceDuration"  :   serviceDuration,
              "userId"           :   userId,
              "userName"         :   userName,
              "totalAmount"      :   totalAmount,
              "remark"           :   '',
              "createdAt"        :   new Date(),
   	      },(error, result)=>{
             if (error) {
                return error;
             }else{
             	 return result;
             }
          });

      return id;
   	 },
   	 'insertOrder':function(invoiceDate,invoiceNo,serviceId,serviceName,serviceRate,serviceDuration,userId,userName,totalAmount,paymentStatus,delieveryStatus) {      
   	     var orderObj = Order.findOne({}, {sort: { orderNo : -1}});
			    if(orderObj){
			      orderNo = orderObj.orderNo + 1;
			    }else{
			      orderNo = 1;
			    }
   	      var id  = Order.insert({
   	      	  "orderNo"          :   orderNo,
   	      	  "invoiceDate"      :   invoiceDate,
   	      	  "invoiceNo"        :   invoiceNo,
              "serviceId"        :   serviceId,
              "serviceName"      :   serviceName,
              "serviceRate"      :   serviceRate,
              "serviceDuration"  :   serviceDuration,
              "userId"           :   userId,
              "userName"         :   userName,
              "totalAmount"      :   totalAmount,
              "paymentStatus"    :   paymentStatus,
              "delieveryStatus"  :  [delieveryStatus],
              "remark"           : '',
              "createdAt"        :   new Date(),
   	      },(error, result)=>{
             if (error) {
                return error;
             }else{
             	 return result;
             }
          });
          Meteor.call('createTicket',id,userId,serviceId,serviceName,totalAmount,paymentStatus,delieveryStatus);

       TempOrder.remove({});
      return id;
   	 },
     'changeTicketStatusInOrder':function(orderId,ticketId,status,reportLink,summeryFinding){
        Order.update(
            {"_id":orderId,"ticket.ticketId":ticketId},
            {
              $set:{
                  "ticket.$.status"        : status,
                  "ticket.$.report"        : reportLink,
                  "ticket.$.summeryFinding": summeryFinding,
                  "ticket.$.completedDate" : new Date(),
              }
            }
        );
        var orderDetails = Order.findOne({"_id":orderId});
        if(orderDetails){
          var ticketDetails = TicketMaster.findOne({"_id":ticketId});
          if(ticketDetails){
            if(status == 'Clear' || status == 'Minor Discrepancy'){
              var ticketStatus = 'Approved';
            }else{
              var ticketStatus = 'Reject';
            }
            Meteor.call('actulStatuofVerificationType',ticketDetails.userId,ticketDetails.verificationType,ticketDetails.verificationId,ticketStatus);
          }
          var ticketList = orderDetails.ticket;
          var orderStatus = 'Completed';
          for(i = 0 ; i < orderDetails.ticket.length ; i++){
            if(!orderDetails.ticket[i].report){
              orderStatus = 'In Process';
              break;
            }
          }         
          if(orderStatus == 'Completed'){
            Order.update(
              {"_id":orderId},
              {
                $set:{
                    "orderStatus" : 'Order Completed - Generating Report',
                    "completedDate" : new Date(),
                }
              }
            );      
            //Allocate the order to the dispatch team
            var memberDetails = Meteor.users.find({"roles":"dispatch team","profile.status":"Active"},{sort: {"count":1},limit:1}).fetch();
            if(memberDetails){
              Order.update(
                {"_id":orderId},
                {
                  $set : {
                    "allocatedToUserid"   : memberDetails[0]._id,
                    "allocatedToUserName" : memberDetails[0].profile.firstname + ' ' + memberDetails[0].profile.lastname,
                  }
                }
              );
            } 
          } 
        }
     },
     'changeStatusofOrder':function(userId, remark,verificationId,verificationType){
        if(verificationType=='employement'){
          Order.update({"userId":userId,"data.employementId":verificationId},
            {
              $set:{
                "data.$.editStatus":"Open",
                "data.$.remark": remark,
              }
            });
        }
        if(verificationType=='education'){
          Order.update({"userId":userId,"data.educationId":verificationId},
            {
              $set:{
                "data.$.editStatus":"Open",
                "data.$.remark": remark,
              }
            });
        }
        if(verificationType=='permanentAddress'){
          Order.update({"userId":userId,"data.permanentAddressId":verificationId},
            {
              $set:{
                "data.$.editStatus":"Open",
                "data.$.remark": remark,
              }
            });
        }
        if(verificationType=='currentAddress'){
          Order.update({"userId":userId,"data.currentAddressId":verificationId},
            {
              $set:{
                "data.$.editStatus":"Open",
                "data.$.remark": remark,
              }
            });
        }
        if(verificationType=='certificates'){
          Order.update({"userId":userId,"data.certificatesId":verificationId},
            {
              $set:{
                "data.$.editStatus":"Open",
                "data.$.remark": remark,
              }
            });
        }
        if(verificationType=='professionalEducation'){
          Order.update({"userId":userId,"data.professionalEducationId":verificationId},
            {
              $set:{
                "data.$.editStatus":"Open",
                "data.$.remark": remark,
              }
            });
        }
     }, 

     'orderCompleted':function(orderId,companyReference){
        Order.update({"_id":orderId},
            {
              $set:{
                "orderStatus":"Order Completed - Report Completed",
                "completedDate": new Date(),
              }
            });
        Meteor.call("updateStatusInCompanyOrder",orderId,companyReference);
     },
     'updateOrderGenrationlink' :function(orderId,genratedReport,genratedReportDate){ 
       
        Order.update({"_id": orderId},{
          $set:{
            "genratedReport"      : genratedReport,
            "genratedReportDate"  : genratedReportDate,
          }
        });
        var adminData   = Meteor.users.findOne({'roles' : "admin"});
        if (adminData) {
          var adminId  = adminData._id;
        }
        var order      = Order.findOne({"_id" : orderId});
        if (order) {
          var userid   = order.userId;
          var userData = Meteor.users.findOne({"_id" : userid});
           if (userData) {
            var newID = userData._id;
            if (userData.profile) {
              var firstLastNm = userData.profile.firstname+' '+userData.profile.lastname;
              var mobNumber   = userData.profile.mobNumber;
            }
          }
         //  var currentPath = browserHistory.getCurrentLocation();
         // console.log(currentPath);
           var orderNo     = order.orderNo;
           var newDate     = new Date();
           var msgvariable = {                       
                            '[username]' : firstLastNm,
                            '[orderNo]'  : orderNo,
                            '[date]'     : moment(newDate).format("DD/MM/YYYY"),
                           };
            // Format for send Email //
            var inputObj = {
              from         : adminId,
              to           : newID,
              templateName : 'OrderCompleted',
              variables    : msgvariable,
            }
            sendMailNotification(inputObj);
            // Format for sending SMS //
            var smsObj = {
              to           : newID,
              templateName : 'OrderCompleted',
              number       : mobNumber,
              variables    : msgvariable,
            }
            // 
            sendSMS(smsObj);
            // Format for sending notification //
            var notifictaionObj = {
              to           : newID,
              templateName : 'OrderCompleted',
              variables    : msgvariable,
           }
            sendInAppNotification(notifictaionObj);
        }
        
     }
   });

}
