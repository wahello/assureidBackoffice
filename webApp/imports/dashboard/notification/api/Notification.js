import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import { TicketMaster } from '/imports/website/ServiceProcess/api/TicketMaster.js';

export const Notification = new Mongo.Collection('notification');
export const SMS = new Mongo.Collection('sms');

if(Meteor.isServer){

  Meteor.startup(() => {
    Notification._ensureIndex({ "toUserId": 1});
  });
  
  Meteor.publish('notification',function notification(){
      return Notification.find({});
  });

   Meteor.publish('sms',function sms(){
      return SMS.find({});
  });

  Meteor.publish('userNotification',function userNotification(){
    return Notification.find({"toUserId": Meteor.userId(), "event": { $exists: true, $ne: null } });
  });
  
}

Meteor.methods({
 'insertNotification' : function(eventName,toMailId,toUserId,notifBody){
        
        var notifData = Notification.findOne({}, {sort: {notificationId: -1}});

        if(notifData){
        notificationId = notifData.notificationId + 1;
        }else{
          notificationId = 1;
        }

        var id = Notification.insert({
          'notificationId' :notificationId,
          'event'          : eventName,
          'toMailId'       : toMailId,
          'toUserId'       : toUserId,
          'notifBody'      : notifBody,
          'status'         : 'unread',
          'date'           : new Date(),
         });

        if(eventName == 'FEBESelfAllocated' && id){
          var notficationId = Notification.findOne({ '_id' : id });
          if(notficationId){
            var ticketFound = notficationId.notifBody.match(/(\bAA\S+\b)/ig);
            if(ticketFound && ticketFound.length > 0){
              var getTicketId = TicketMaster.findOne({"ticketNumber" : ticketFound[0]});
              if(getTicketId){
                var id = Notification.update({ '_id' : id },
                                             {
                                              $set:{
                                                'ticketId' : getTicketId._id,
                                              }
                                             });   
              }
            }          
          }
        }
       
        
      },

      'insertSMS' : function(toUserId,smsBody,toNumber){
        
        var smsData = SMS.findOne({}, {sort: {smsId: -1}});

        if(smsData){
        smsId = smsData.smsId + 1;
        }else{
          smsId = 1;
        }

            Notification.insert({
              'smsId'      :smsId,
              'toUserId'   : toUserId,
              'smsBody'    : smsBody,
              'status'     : 'unread',
              'date'       : new Date(),
          });

       
        
      },

  'updateNotification' : function(id){
    Notification.update(
              { "_id" : id },
              { $set: { "status"         : 'Read',  
                                
                       }  
              },
        );//end update 

  },

  'deleteNotification' : function(id){
    Notification.remove({"_id": id});

  },

  'updateSMS' : function(id){
    SMS.update(
              { "_id" : id },
              { $set: { "status"         : 'Read',  
                                
                       }  
              },
        );//end update 

  },

  'deleteSMS' : function(id){
    SMS.remove({"_id": id});

  }

});