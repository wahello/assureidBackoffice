import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const Packages = new Mongo.Collection("packages");
export const TempPackageImages = new Mongo.Collection("tempPackageImages");
// export const ChecklistFieldExpert = new Mongo.Collection("checklistFieldExpert");

if(Meteor.isServer){
import { PackageImage } from "../UploadToServer/UploadPackageImgsServer.js";
    Meteor.publish('packages',()=>{
        return Packages.find({});
    }); 
    Meteor.publish('tempPackageImages',()=>{
        return TempPackageImages.find({});
    });
    Meteor.publish('singlePackages',(_id)=>{
        return Packages.find({"_id":_id});   
    });
   
    Meteor.methods({
      //add image to TempPackageImages
      "TempPackageImageToS3function": function (id) {
        var data = PackageImage.findOne({"_id" : id});
        var imageLink = data.link();
          TempPackageImages.insert({
          "userId": Meteor.userId(),
          "imageLink":imageLink,
          "fileName": data.name,
          "fileExt": data.ext,
          "createdAt":new Date(),
          },(error, result)=>{

        });
      },
  
      // //add service method
      'createPackage':function(packageName,packageDuration,packageDiscount,packageDescription,selectedServices,userId){
        var getImage              = TempPackageImages.findOne({}, {sort: {createdAt: -1, limit: 1}});
        if(getImage){
          var image               = getImage.imageLink;
          var fileName            = getImage.fileName;
          var fileExt             = getImage.fileExt;
        }else{
          var image               = "/images/assureid/noImage.png";
          var fileName            = 'noImage';
          var fileExt             = 'png';
        }

        Packages.insert({
          'packageName'           : packageName,
          'packageDuration'       : packageDuration,
          'packageDiscount'       : packageDiscount,
          'packageDescription'    : packageDescription,
          'selectedServices'      : selectedServices,
          'image'                 : image,
          'fileName'              : fileName,
          'fileExt'               : fileExt,
          'packageStatus'         : 'Active',
          'createdAt'             : new Date(),
          'authorUserId'          : userId,
        }); 
        TempPackageImages.remove({});
      },
      //update package method
      'updatePackage':function(id,packageName,packageDuration,packageDiscount,packageDescription,selectedServices){
           var data = TempPackageImages.findOne({"userId":Meteor.userId()});
            if(data){
                var imageLink     = data.imageLink;
                var fileName      = data.fileName;
                var fileExt       = data.fileExt;
            }else{
                var oldImgData    = Packages.findOne({"_id":id},{sort:{"createdAt":-1}});
                if(oldImgData){
                    var imageLink = oldImgData.image;
                    var fileName  = oldImgData.fileName;
                    var fileExt   = oldImgData.fileExt;
                }
            }
             
        Packages.update(
          {'_id': id },
              {
                $set:{
                  'packageName'           : packageName,
                  'packageDuration'       : packageDuration,
                  'packageDiscount'       : packageDiscount,
                  'packageDescription'    : packageDescription,
                  'image'                 : imageLink,
                  'fileName'              : fileName,
                  'fileExt'               : fileExt,
                  'selectedServices'      : selectedServices,
                  'packageStatus'         : 'Active',
              } //End of set
            }
        );
        TempPackageImages.remove({});
      },
      //delete package method
      'deletePackage':function(id){
         Packages.remove({'_id': id});
      },
      'updatePackageStatus':function(packageId){
        Packages.update({"_id" : packageId},
          {$set:{
             'packageStatus'         : 'Inactive',
          }});
      }
    });
}
