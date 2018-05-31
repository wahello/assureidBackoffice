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
      "createChecklist" : function (checkListFor,task,checkListFrom,relatedFieldArr) {
         ChecklistFieldExpert.insert({
          "checkListFor": checkListFor,
          "task"        : task,
          "checkListFrom": checkListFrom,
          "relatedFields": relatedFieldArr
        });
      },
      //delete task from ChecklistFieldExpert
      'deleteCheckList':function (id) {
        ChecklistFieldExpert.remove({"_id":id});
      },
      //update task from ChecklistFieldExpert
      'updateChecklist': function (id,checkListFor,task,checkListFrom,relatedFieldArr) {
          
          ChecklistFieldExpert.update({"_id":id},{$set:{'checkListFor'  : checkListFor,'task'  : task, 'checkListFrom' : checkListFrom,"relatedFields": relatedFieldArr}});
      },
      //add image to TempServiceImages
      "addNewTemporaryServiceImage": function (id) {
        var data = ServiceImage.findOne({"_id" : id});
        var imageLink = data.link();
          TempServiceImages.insert({
          "userId": Meteor.userId(),
          "imageLink":imageLink,
          "fileName": data.name,
          "fileExt": data.ext,
          "createdAt":new Date(),
          },(error, result)=>{

        });
      },
  
      //add service method
      'createService':function(ProfileForms,StatutoryForm,AddressForm,EducationForm,WorkForm,SkillsCertificate,OtherInfoForm,serviceName,serviceRate,serviceDuration,servicesDescription,userId,lastModified,serviceFor,serviceDayNumbers){
        var getImage              = TempServiceImages.findOne({}, {sort: {createdAt: -1, limit: 1}});
        if(getImage){
          var image               = getImage.imageLink;
          var fileName            = getImage.fileName;
          var fileExt             = getImage.fileExt;
        }else{
          var image               = "/images/assureid/noImage.png";
          var fileName            = 'noImage';
          var fileExt             = 'png';
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
          'fileName'              : fileName,
          'fileExt'               : fileExt,
          'createdAt'     : new Date(),
          'authorUserId'  : userId,
          'lastModified'  : lastModified,
          'serviceFor'    : serviceFor,
        }); 
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
        TempServiceImages.remove({});

      },
      //delete service method
      'deleteService':function(id){
         Services.remove({'_id': id});
      },
    });
}
