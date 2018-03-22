import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const Services = new Mongo.Collection("services");
export const TempServiceImages = new Mongo.Collection("tempServiceImages");
export const ChecklistFieldExpert = new Mongo.Collection("checklistFieldExpert");

if(Meteor.isServer){
import { ServiceImage } from "../UploadToServer/UploadServiceImgsServer.js";
    Meteor.publish('services',()=>{
        return Services.find({});
    }); 
    Meteor.publish('tempServiceImages',()=>{
        return TempServiceImages.find({});
    });
    Meteor.publish('singleServices',(_id)=>{
        return Services.find({"_id":_id});   
    });
    Meteor.publish('checklistFieldExpert',()=>{
        return ChecklistFieldExpert.find({});
    });
    Meteor.publish('singleChecklistFieldExpert',(_id)=>{
        return ChecklistFieldExpert.find({"_id" : _id});
    });
    Meteor.methods({
      //add Checklist to ChecklistFieldExpert collection
      "createChecklist" : function (checkListFor,task,checkListFrom) {
         ChecklistFieldExpert.insert({
          "checkListFor": checkListFor,
          "task"        : task,
          "checkListFrom": checkListFrom,
        });
      },
      //delete task from ChecklistFieldExpert
      'deleteCheckList':function (id) {
        ChecklistFieldExpert.remove({"_id":id});
      },
      //update task from ChecklistFieldExpert
      'updateChecklist': function (id,checkListFor,task,checkListFrom) {
        // ChecklistFieldExpert.update({"_id" : id},
        // {$set:{
        //    "checkListFor": checkListFor,
        //    "task"        : task,
        //    "checkListFrom": checkListFrom,
        //   }
        // });
        ChecklistFieldExpert.update({"_id":id},{$set:{'checkListFor'  : checkListFor,'task'  : task, 'checkListFrom' : checkListFrom}});
      },
      // 'deletefieldChecklist':function (serviceId,id,checklistData) {
      //   var checklistId = parseInt(id);
      //   Services.update({"_id": serviceId},
      //     {$unset:{ 
      //       ['fieldChecklist.'+checklistId] : 1,
      //     }});
      //   Services.update({"_id": serviceId}, {$pull : {'fieldChecklist' : null}});  

      // },
      //add image to TempServiceImages
      "addNewTemporaryServiceImage": function (id) {
        var data = ServiceImage.findOne({"_id" : id});
        var imageLink = data.link();
          TempServiceImages.insert({
          "userId": Meteor.userId(),
          "imageLink":imageLink,
          "createdAt":new Date(),
          },(error, result)=>{

        });
      }, 
     //  'uploadTempServiceImages':function(id,amazonUrl,uploadTime){
      //  TempServiceImages.insert({
      //    'id'             : id,
      //    'amazonUrl'      : amazonUrl,
      //    'uploadTime'     : new Date(),
     //      'authorUserId'   : id,
     //      'submitted'      : false,
      //  });
      // },
     //  'updateTempServiceImages':function(_id,boolean){
      //  TempServiceImages.update({
      //    '_id'           : _id},
     //      {$set:{
      //    'submitted'      : boolean,
      //  }}); 
      // },
      // 'removeTempServiceImages':function(id){
      //   TempServiceImages.remove({'_id':id,'submitted':true});
      // },
      // 'removeServiceUnsubmitImages':function(id){
      //   TempServiceImages.remove({'id':id,'submitted':false});
      // },
      // 'removeServiceUrlImages':function(url){
      //   TempServiceImages.remove({'amazonUrl':url});
      // },

      //add service method
      'createService':function(ProfileForms,StatutoryForm,AddressForm,EducationForm,WorkForm,SkillsCertificate,OtherInfoForm,serviceName,serviceRate,serviceDuration,servicesDescription,userId,lastModified,serviceFor,serviceDayNumbers){
        // var tempServiceImages = 
        // console.log(s3);
        var getImage              = TempServiceImages.findOne({}, {sort: {createdAt: -1, limit: 1}});
        if(getImage){
          var image               = getImage.imageLink;
        }else{
          var image               = "/images/assureid/noImage.png";
        }

        Services.insert({
          'ProfileForms'          : ProfileForms,
          'StatutoryForm'         : StatutoryForm,
          'AddressForm'           : AddressForm,
          'EducationForm'         : EducationForm,
          'serviceDayNumbers'     : serviceDayNumbers,
          'WorkForm'              : WorkForm,
          'SkillsCertificate'     : SkillsCertificate,
          'OtherInfoForm'         : OtherInfoForm,
          'serviceName'           : serviceName,
          'serviceRate'           : serviceRate,
          'serviceDuration'       : serviceDuration,
          'servicesDescription'   : servicesDescription,
          'image'                 : image,
          'createdAt'     : new Date(),
          'authorUserId'  : userId,
          'lastModified'  : lastModified,
          'serviceFor'    : serviceFor,
        }); 
        ChecklistFieldExpert.remove({});
        TempServiceImages.remove({});
      },
      //update service method
      'updateService':function(id,ProfileForms,StatutoryForm,AddressForm,EducationForm,WorkForm,SkillsCertificate,OtherInfoForm,serviceName,serviceRate,serviceDuration,servicesDescription,userId,lastModified,serviceDayNumbers,serviceFor){
           var data = TempServiceImages.findOne({"userId":Meteor.userId()});
            if(data){
                var imageLink     = data.imageLink;
            }else{
                var oldImgData    = Services.findOne({"_id":id},{sort:{"createdAt":-1}});
                if(oldImgData){
                    var imageLink = oldImgData.image;
                }
            }
             
        Services.update(
          { '_id': id },
              {
                $set:{
                  'ProfileForms'          : ProfileForms,
                  'StatutoryForm'         : StatutoryForm,
                  'AddressForm'           : AddressForm,
                  'EducationForm'         : EducationForm,
                  'serviceDayNumbers'     : serviceDayNumbers,
                  'WorkForm'              : WorkForm,
                  'SkillsCertificate'     : SkillsCertificate,
                  'OtherInfoForm'         : OtherInfoForm,
                  'serviceName'           : serviceName,
                  'serviceRate'           : serviceRate,
                  'serviceDayNumbers'     : serviceDayNumbers,
                  'serviceDuration'       : serviceDuration,
                  'servicesDescription'   : servicesDescription,
                  'image'                 : imageLink,
                  'authorUserId'          : userId,
                  'lastModified'          : lastModified,
                  'serviceFor'            : serviceFor,
              } //End of set
            }
        );
        ChecklistFieldExpert.remove({});
        TempServiceImages.remove({});

      },
     //  'updateEditService':function(amazonUrl){
      //  Services.update(
      //    { "s3.amazonUrl": amazonUrl },
      //         {
      //           $set:{
     //              's3.$.amazonUrl'   : "",
     //              's3.$.uploadTime'  : "",
      //         } //End of set
      //       }
      //  );
      // },
     //  'updateServiceAmazonUrl':function(amazonUrl,uploadTime,id){
      //  Services.update(
      //       { '_id': id },
      //         {
      //           $push:{
     //                's3':
     //                {
     //                  'amazonUrl': amazonUrl,
     //                  'uploadTime':uploadTime,
     //                }
      //         }
      //       }
      //  );
      // },

      //delete service method
      'deleteService':function(id){
         Services.remove({'_id': id});
      },
    });
}
