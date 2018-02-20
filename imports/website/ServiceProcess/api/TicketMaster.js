import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const TicketMaster = new Mongo.Collection("ticketMaster");

if(Meteor.isServer){
	Meteor.publish('allTickets',()=>{
        return TicketMaster.find({});
	});
	Meteor.publish('singleTicket',(_id)=>{
        return TicketMaster.find({"_id" : _id});
	});
	
	Meteor.methods({
   	 'createTicket':function(id,userId,serviceId,serviceName,totalAmount,paymentStatus,delieveryStatus) {
   	 	   var ticketObj = TicketMaster.findOne({}, {sort: { createdAt : -1}});
			    if(ticketObj){
			      // var ticketNumber = parseInt(ticketObj.ticketNumber.);
			     //  var last  = parseInt(ticketObj.ticketNumber.substr(ticketObj.ticketNumber.length - 6));
			     //  var first = ticketObj.ticketNumber.substr(0, 1);
				    // var ticket = 'AZ099998';
				    var first = ticketObj.ticketNumber.substr(0, 2);
				    var last  = parseInt(ticketObj.ticketNumber.substr(ticketObj.ticketNumber.length - 6));
					  last = last + 1;
				    var last0 = '0';
				    if(last > 0 && last < 11) 
				    {
				    	last0 = '00000' + last;
				        if(last == 10){last0 = '0000' + last;} /*working*/
				    }else if(last > 10 && last < 101){
				    	last0 = '0000' + last;
				        if(last == 100){last0 = '000' + last;}/*working*/
				    }else if(last > 100 && last < 1001){
				    	last0 = '000' + last;
				        if(last == 1000){last0 = '00' + last;}/*working*/
				    }else if(last > 1000 && last < 10001){
				    	last0 = '00' + last;
				        if(last == 10000){last0 = '0' + last;}/*working*/
				    }else if(last > 10000 && last < 100001){
				    	last0 = '0' + last;
				        if(last == 100000){last0 = '000000';}
				    }
				    if(last >= 100000){
				    	last0 = '000000';
				        var first2Char = first.substr(1,1); /*second digit*/
				        var secondAscii = first2Char.charCodeAt(); /*second ascii*/
				        var firstChar = first.substr(0,1); /*First char*/
				        if(secondAscii == 90){
				        	var firstAscii = firstChar.charCodeAt() + 1;
				          first = String.fromCharCode(firstAscii) + 'A';
				        }else {
				        	var newsecond = secondAscii + 1;
				          first = firstChar +''+ String.fromCharCode(newsecond);
				        }
				        
				    }
				    var ticketNumber = first+''+last0;			   
	       }else{
			      var ticketNumber = 'AA000000';
			   }
			   var ticketId  = TicketMaster.insert({
   	      	  "orderId"          :   id,
   	      	  "userId"           :   userId,
   	      	  "serviceId"        :   serviceId,
              "serviceName"      :   serviceName,
              "payment"          :   totalAmount,
              "paymentStatus"    :   paymentStatus,
              "ticketNumber"     :   ticketNumber,
              "ticketStatus"     :  [delieveryStatus],
              "createdAt"        :   new Date(),
   	      },(error, result)=>{
             if (error) {
                return error;
             }else{
             	 return result;
             }
          });
			  return ticketId;
		},    
		

		'updateTicket':function(ticketElem){
			var updateTicket = TicketMaster.update(
				{'_id':ticketElem.ticketid},
				{$push:{
						ticketElement:{
						'staffId'  : ticketElem.staffId,
						'staffName': ticketElem.staffname,
						'staffRole': ticketElem.role,
						'roleTicketStatus':[{
							'ticketstatus':"Accepted",
							'createdOn'   : new Date(),
						}]
						}
					}
				}
			);
			Meteor.call('updateOuterStatus',ticketElem);
			return updateTicket;
			
		},

		'updateOuterStatus':function(ticketElem){
			TicketMaster.update(
			{'_id':ticketElem.ticketid},
			{   $set:{
					"ticketStatus.0.status":"Accepted",
				}
			}
			)
			
		},
		'addDocument':function(id,index,status,addressType){
		console.log("id :"+id);
		console.log("index :"+index);
		console.log("status :"+status);
		console.log("addressType :"+addressType);
			if(addressType == "Current Address"){
				TicketMaster.update(
					{'_id':id},
						{   $set:{
								["ticketElement.currentAddress."+index+".status"]:status,
								["ticketElement.currentAddress."+index+".statusDate"] : new Date(),
								
						}
					}
				)
			}else if(addressType == "Permanent Address"){
				TicketMaster.update(
					{'_id':id},
						{   $set:{
								["ticketElement.permanentAddress."+index+".status"]:status,
								["ticketElement.permanentAddress."+index+".statusDate"] : new Date(),
								
						}
					}
				)
			}
			
		}
		

	  });


}