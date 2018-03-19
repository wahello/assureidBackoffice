import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const UserProfile = new Mongo.Collection("userProfile");
export const TempProofDocs = new Mongo.Collection("tempProofDocs");

if(Meteor.isServer){
  import { ProofDocuments } from "../UploadToServer/ProofUploadServer.js";
    Meteor.publish('userProfileData',()=>{
        return UserProfile.find({});
    });
    Meteor.publish('TempProofDocs',()=>{
        return TempProofDocs.find({});
    });
    Meteor.publish('LatestTempProofDocs',()=>{
        return TempProofDocs.find({}, {sort: {createdAt: -1, limit: 1}});
    });
    Meteor.publish('userprofile',(_id)=>{
        return UserProfile.find({"userId" : _id});
    });
    Meteor.methods({
        "addNewTempProofDocs": function (id,userId,prooftype,proofSubtype) {
          var data = ProofDocuments.findOne({"_id" : id});
          // console.log('data:',data);
          // console.log('prooftype:',prooftype);
          var imageLink = data.link();
          var proofObj = TempProofDocs.findOne({}, {sort: {createdAt: -1, limit: 1}});
          // console.log('proofObj: ',proofObj);
          if(proofSubtype == ''){
            TempProofDocs.insert({
              "userId": userId,
              "imageLink":imageLink,
              "ext":data.ext,
              "name":data.name,
              "prooftype": prooftype,
              "proofSubtype":proofSubtype,
              "createdAt":new Date(),
              },(error, result)=>{
            });
          }else{
            if(proofObj){
              // console.log(proofObj.proofSubtype);
              if(proofObj.proofSubtype == ''){
                // console.log('true');
                TempProofDocs.insert({
                  "userId": userId,
                  [proofSubtype]:imageLink,
                  "ext":data.ext,
                  "name":data.name,
                  "prooftype": prooftype,
                  "proofSubtype":proofSubtype,
                  "createdAt":new Date(),
                  },(error, result)=>{
                });
              }else{
                // console.log('falseelse');
                TempProofDocs.update({"_id" : proofObj._id},
                  {
                    $set:{
                      [proofSubtype] :  imageLink,
                    } //End of set
                  },(error, result)=>{
                });
              }
            }else{
              // console.log('trueelse');
              TempProofDocs.insert({
                "userId": userId,
                [proofSubtype] : imageLink ,
                "ext":data.ext,
                "name":data.name,
                "prooftype": prooftype,
                "proofSubtype":proofSubtype,
                "createdAt":new Date(),
                },(error, result)=>{
              });
            }
          }
        }, 
        "insertBasicData": function (formValues) {
            // console.log("formValues: ",formValues);
            var getImage = TempProofDocs.findOne({"userId":Meteor.userId(),'prooftype':'basic'}, {sort: {createdAt: -1, limit: 1}});
            if(getImage){
              var image = getImage.imageLink;
            }
            UserProfile.insert({
              "userId"          : Meteor.userId(),
              "firstName"       : formValues.firstName,
              "lastName"        : formValues.lastName,
              "fatherFirstName" : formValues.fatherFirstName,
              "fatherLastName"  : formValues.fatherLastName,
              "motherFirstName" : formValues.motherFirstName,
              "motherLastName"  : formValues.motherLastName,
              "spouseFirstName" : formValues.spouseFirstName,
              "spouseLastName"  : formValues.spouseLastName,
              "gender"          : formValues.gender,
              "dateOfBirth"     : formValues.dateOfBirth,
              "mobileNo"        : formValues.mobileNo,
              "altMobileNo"     : formValues.altMobileNo,
              "emailId"         : formValues.emailId,
              "altEmailId"      : formValues.altEmailId,
              "proofOfDOB"      : image,
              "remark"          : '',
              "createdAt"       : new Date(),
            },(error, result)=>{
            
            });
            TempProofDocs.remove({'prooftype':'basic'});
        }, 
        "updateBasicData" : function(getuserId,formValues) {
            var getImage = TempProofDocs.findOne({"userId":Meteor.userId(),'prooftype':'basic'}, {sort: {createdAt: -1, limit: 1}});
            if(getImage){
              var image = getImage.imageLink;
            }
            UserProfile.update({"userId":getuserId},{
            $set : {
              "firstName"       : formValues.firstName,
              "lastName"        : formValues.lastName,
              "fatherFirstName" : formValues.fatherFirstName,
              "fatherLastName"  : formValues.fatherLastName,
              "motherFirstName" : formValues.motherFirstName,
              "motherLastName"  : formValues.motherLastName,
              "spouseFirstName" : formValues.spouseFirstName,
              "spouseLastName"  : formValues.spouseLastName,
              "gender"          : formValues.gender,
              "dateOfBirth"     : formValues.dateOfBirth,
              "mobileNo"        : formValues.mobileNo,
              "altMobileNo"     : formValues.altMobileNo,
              "emailId"         : formValues.emailId,
              "altEmailId"      : formValues.altEmailId,
              "proofOfDOB"      : image,
            }
           });
           TempProofDocs.remove({'prooftype':'basic'});
        },
        'insertStatutory':function(id,adharCardNo,panCardNo,drivingCardNo,votingCardNo,rationCardNo,passportNo) {
          var getImage = TempProofDocs.findOne({"userId":Meteor.userId(),'prooftype':'identity'}, {sort: {createdAt: -1, limit: 1}});;
          if(getImage){
            var adharCardProof1 = getImage.aadhar1;
            var adharCardProof2 = getImage.aadhar2;
            var panCardProof1 = getImage.pan1;
            var panCardProof2 = getImage.pan2;
            var drivingCardProof1 = getImage.driving1;
            var drivingCardProof2 = getImage.driving2;
            var votingCardProof1 = getImage.voting1;
            var votingCardProof2 = getImage.voting2;
            var rationCardProof1 = getImage.ration1;
            var rationCardProof2 = getImage.ration2;
            var passportProof1 = getImage.passport1;
            var passportProof2 = getImage.passport2;
          }
          UserProfile.update({"userId" : id},
            {$set : { identity:{
              "adharCardNo"        :  adharCardNo,
              "panCardNo"          :  panCardNo,
              "drivingCardNo"      :  drivingCardNo,
              "votingCardNo"       :  votingCardNo,
              "rationCardNo"       :  rationCardNo,
              "passportNo"         :  passportNo,
              "adharCardProof1"        :  adharCardProof1,
              "panCardProof1"          :  panCardProof1,
              "drivingCardProof1"      :  drivingCardProof1,
              "votingCardProof1"       :  votingCardProof1,
              "rationCardProof1"       :  rationCardProof1,
              "passportProof1"         :  passportProof1,
              "adharCardProof2"        :  adharCardProof2,
              "panCardProof2"          :  panCardProof2,
              "drivingCardProof2"      :  drivingCardProof2,
              "votingCardProof2"       :  votingCardProof2,
              "rationCardProof2"       :  rationCardProof2,
              "passportProof2"         :  passportProof2,
            }
            }
          });
          TempProofDocs.remove({'prooftype':'identity'});
        },
        'insertPermanantAddress':function(id,permanentAddress) {
          UserProfile.update({"userId" : id},
          {$push : {
                      "permanentAddress" : permanentAddress,
                    }
          });
        },
       'insertTemporaryAddress':function(id,temporaryAddress) {
          UserProfile.update({"userId" : id},
          {$push : {
                      "temporaryAddress" : temporaryAddress,
                    }
          });
        },
       'insertEducation':function(id,education) {
          UserProfile.update({"userId" : id},
          {$push : {
                      "education" : education,
                    }
          });
        },
        'insertProfessionalEducation':function(id,education) {
          UserProfile.update({"userId" : id},
          {$push : {
                      "professionalEducation" : education,
                    }
          });
        },
       'insertEmployement':function(id,employement) {
          UserProfile.update({"userId" : id},
          {$push : {
                      "employement" : employement,
                    }
          });
        },
        'insertOtherInformation':function(id,otherInformation) {
          UserProfile.update({"userId" : id},
            {$set : {
              "otherBusinessInvolving" :  otherInformation.otherBusinessInvolving,
              "dismissedFromService"   :  otherInformation.dismissedFromService,
              "criminalOffence"        :  otherInformation.criminalOffence,
              "civilJudgments"         :  otherInformation.civilJudgments,
            }
          });
        },
        'removeTempProofDocs':function(imgLink){
          TempProofDocs.remove({'imageLink':imgLink});
        },
        'removeTempIdentyDocs':function(imgLink,subtype){
          // console.log('trueserver');
          TempProofDocs.update({"userId" : Meteor.userId()},
            {
              $unset:{
                [subtype] :  imgLink,
              } //End of set
            },(error, result)=>{
          });     
          TempProofDocs.update({"userId" : Meteor.userId()},
            {
              $pull:{
                [subtype] :  imgLink,
              } //End of set
            },(error, result)=>{
          });        
        },
        'addCurrentDocuments':function(userId,documents,currentAddressId) {
          UserProfile.update({"userId" : userId, "currentAddress.currentAddressId" : parseInt(currentAddressId)},
              {$set : { 
                "currentAddress.$.documents":  documents,
              }
            }
          );

        },
        'addPermanentDocuments':function(userId,documents,permanentAddressId) {
          console.log("userId",userId);
          console.log("documents",documents);
          console.log("permanentAddressId",permanentAddressId);

          UserProfile.update({"userId" : userId, "permanentAddress.permanentAddressId" : parseInt(permanentAddressId)},
              {$set : { 
                "permanentAddress.$.documents":  documents,
              }
            }
          );

        },

        'changeStatusMethod':function(ticketId,userId,remark,verificationType,verificationId){
          var status = "Reopen";
          // var _id = UserProfile.findOne({"userId":userId});

          // if(_id){
            if(verificationType=='employement'){
              UserProfile.update({'userId':userId,"employement.employementId":1},
                {
                  $set:
                  {
                    'employement.$.ticketId':ticketId,
                    'employement.$.editStatus':status,
                    'employement.$.remark':remark,

                  }
                });
            }
            if(verificationType=='education'){
              UserProfile.update({'userId':userId,"education.educationId":1},
                {
                  $set:
                  {
                    'education.$.ticketId':ticketId,
                    'education.$.editStatus':status,
                    'education.$.remark':remark
                  }
                });
            }
            if(verificationType=='permanentAddress'){
              UserProfile.update({'userId':userId,"permanentAddress.permanentAddressId":1},
                {
                  $set:
                  {
                    'permanentAddress.$.ticketId':ticketId,
                    'permanentAddress.$.editStatus':status,
                    'permanentAddress.$.remark':remark
                  }
                });
            }
            if(verificationType=='currentAddress'){
              UserProfile.update({'userId':userId,"currentAddress.currentAddressId":1},
                {
                  $set:
                  {
                    'currentAddress.$.ticketId':ticketId,
                    'currentAddress.$.editStatus':status,
                    'currentAddress.$.remark':remark,
                  }
                });
            }
            if(verificationType=='certificates'){
              UserProfile.update({'userId':userId,"certificates.certificatesId":1},
                {
                  $set:
                  {
                    'certificates.$.ticketId':ticketId,
                    'certificates.$.editStatus':status,
                    'certificates.$.remark':remark,
                }
                });
            }
            if(verificationType=='professionalEducation'){
              UserProfile.update({'userId':userId,"professionalEducation.professionalEducationId":1},
                {
                  $set:
                  {
                    'professionalEducation.$.ticketId':ticketId,
                    'professionalEducation.$.editStatus':status,
                    'professionalEducation.$.remark':remark
                  }
                });
            }


          // }

        }
    });
}
