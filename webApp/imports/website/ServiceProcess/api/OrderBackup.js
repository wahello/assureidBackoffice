import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

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
     }
   });

}
