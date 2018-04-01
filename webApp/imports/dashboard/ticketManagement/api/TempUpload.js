import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const TempTicketImages = new Mongo.Collection("tempTicketImages");
export const TempTicketVideo = new Mongo.Collection("tempTicketVideo");
export const TempTicketReport = new Mongo.Collection("tempTicketReport");
import { TicketImages } from "../uploadToServer/uploadImagesToServer.js";
import { TicketVideo } from "../uploadToServer/uploadVideoToServer.js";
import { TicketReport } from "../uploadToServer/uploadReportToServer.js";

 
if(Meteor.isServer){
 Meteor.publish('allTicketImages',()=>{
     return TempTicketImages.find({});
  });
  Meteor.publish('allTicketVideo',()=>{
     return TempTicketVideo.find({});
  });
  Meteor.publish('allTicketReport',()=>{
    return TempTicketReport.find({});
 });
	 Meteor.methods({
		 "addNewTemporaryTicketImages": function (id) {
        var data = TicketImages.findOne({"_id" : id});
        var imageLink = data.link();
          TempTicketImages.insert({
          "userId": Meteor.userId(),
          "imageLink":imageLink,
          "createdAt":new Date(),
          },(error, result)=>{

        });
      },
      "TempTicketVideoToS3function": function (id) {
        var data = TicketVideo.findOne({"_id" : id});
        var videoLink = data.link();
          TempTicketVideo.insert({
          "userId": Meteor.userId(),
          "videoLink":videoLink,
          "createdAt":new Date(),
          },(error, result)=>{

        });
      }, 

      "TempReportToS3function": function (id) {
        var data = TicketReport.findOne({"_id" : id});
        var ReportLink = data.link();
          TempTicketReport.insert({
          "userId": Meteor.userId(),
          "ReportLink":ReportLink,
          "createdAt":new Date(),
          },(error, result)=>{

        });
      }
   });
}