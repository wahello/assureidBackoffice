import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const NewsFeeds = new Mongo.Collection("newsFeeds");
export const TempNewsVideo = new Mongo.Collection("tempNewsVideo");

import { NewsVideo } from "../uploadToServer/uploadNewsVideoServer.js";

if(Meteor.isServer){
   Meteor.publish('newsFeeds',()=>{
       return NewsFeeds.find({});
   });
  Meteor.publish('singleNews',(_id)=>{
      return NewsFeeds.find({"_id":_id});  
  });
   Meteor.publish('tempNewsVideo',()=>{
      return TempNewsVideo.find({});
  });
  Meteor.publish('newsFeedData',()=>{
      return NewsFeeds.find({},{sort : {createdAt: -1} , limit : 2});
  });

	 Meteor.methods({
	 	 	'createNewsFeed':function(newsFeedTitile,startDate,endDate,newsDescription,newsVideoType,youTubevideo,userId,lastModified){

        var getVideo             = TempNewsVideo.findOne({"_id": "1"}, {sort: {createdAt: -1, limit: 1}});
        if(getVideo){
          var localVideo         = getVideo.link;
        }else{
          var localVideo         = "";
        }

        var getImage             = TempNewsVideo.findOne({"_id": "2"}, {sort: {createdAt: -1, limit: 1}});
        if(getImage){
          var localImage         = getImage.link;
        }else{
          var localImage         = "";
        }
        
    		NewsFeeds.insert({
          'newsFeedTitile'  : newsFeedTitile,
    			'startDate'       : startDate,
          'endDate'         : endDate,
    			'newsDescription' : newsDescription,
          'newsVideoType'   : newsVideoType,
          'newsVideo'       : localVideo,
          'newsYouTubeVideo': youTubevideo,
          'newsImage'       : localImage,
          'authorUserId'    : userId,
          'lastModified'    : lastModified,
          'createdAt'       : new Date(),

    		});  
        TempNewsVideo.remove({});
     	},
      "TempAddVideoToS3function": function (id) {
        var data = NewsVideo.findOne({"_id" : id});
        var link = data.link();
          TempNewsVideo.insert({
           "_id": "1",
           "userId": Meteor.userId(),
           "link":link,
          "createdAt":new Date(),
          },(error, result)=>{

        });
      },
      "TempAddImagetoNewsFeed": function (id) {
        var data = NewsVideo.findOne({"_id" : id});
        var link = data.link();
          TempNewsVideo.insert({
           "_id": "2",
           "userId": Meteor.userId(),
           "link":link,
          "createdAt":new Date(),
          },(error, result)=>{

        });
      },
      'updateNewsFeed':function(id,newsFeedTitile,startDate,endDate,newsDescription,newsVideoType,youTubevideo,userId,lastModified){
         var data = TempNewsVideo.findOne({"userId":Meteor.userId(),"_id" : "1"});
          if(data){
              var localvideoLink       = data.link;
          }else{
              var oldVideoData         = NewsVideo.findOne({"_id":id},{sort:{"createdAt":-1}});
              if(oldVideoData){
                var localvideoLink     = oldVideoData.newsVideo;
              }
          }
         var data = TempNewsVideo.findOne({"userId":Meteor.userId(),"_id" : "2"});
          if(data){
              var localImage         = data.link;
          }else{
              var oldVideoData       = NewsVideo.findOne({"_id":id},{sort:{"createdAt":-1}});
              if(oldVideoData){
                var localImage       = oldVideoData.newsImage;
              }
          }
         
        NewsFeeds.update(
          { '_id': id },
              {
                $set:{
                  'newsFeedTitile'        : newsFeedTitile,
                  'startDate'             : startDate,
                  'endDate'               : endDate,
                  'newsDescription'       : newsDescription,
                  'newsVideoType'         : newsVideoType,
                  'newsVideo'             : localvideoLink,
                  'newsYouTubeVideo'      : youTubevideo,
                  'newsImage'             : localImage,
                  'authorUserId'          : userId,
                  'lastModified'          : lastModified,
              } //End of set
            }
        );
        TempNewsVideo.remove({});
      }, 
      'deleteNews':function(id){
         NewsFeeds.remove({'_id': id});
      },

	 });

}
