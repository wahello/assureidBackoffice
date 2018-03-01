import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const Invoice = new Mongo.Collection("invoice");

if(Meteor.isServer){
    Meteor.publish('invoiceData',()=>{
        return Invoice.find({});
    });
    Meteor.publish('singleInvoice',(_id)=>{
        return Invoice.find({"_id" : _id});
    });
   Meteor.methods({
   	 'insertInvoice':function(companyName,serviceId,serviceName,serviceRate,serviceDuration,userId,userName,companyAddress,companyCity,companyState,companyCountry,companyPincode,tax) {
   	     var invoiceObj = Invoice.findOne({}, {sort: { invoiceNo : -1}});
			    if(invoiceObj){
			      invoiceNo = invoiceObj.invoiceNo + 1;
			    }else{
			      invoiceNo = 1;
			    }
   	      var id  = Invoice.insert({
   	      	  "invoiceNo"        :   invoiceNo,
              "serviceId"        :   serviceId,
              "serviceName"      :   serviceName,
              "serviceRate"      :   serviceRate,
              "serviceDuration"  :   serviceDuration,
              "userId"           :   userId,
              "userName"         :   userName,
              "companyName"      :   companyName,
              "companyAddress"   :   companyAddress,
              "companyCity"      :   companyCity,
              "companyState"     :   companyState,
              "companyCountry"   :   companyCountry,
              "companyPincode"   :   companyPincode,
              "tax"              :   tax,
              "createdAt"        :   new Date(),
   	      },(error, result)=>{
             if (error) {
                return error;
             }else{
             	 return result;
             }
          });

      return id;
   	 }
   });

}
