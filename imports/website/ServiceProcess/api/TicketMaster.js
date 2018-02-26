import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export const TicketMaster = new Mongo.Collection("ticketMaster");
export const TicketBucket = new Mongo.Collection("ticketbucket");
export const BADetails = new Mongo.Collection("badetails");

if(Meteor.isServer){
	Meteor.publish('allTickets',()=>{
        return TicketMaster.find({});
	});
	Meteor.publish('singleTicket',(_id)=>{
        return TicketMaster.find({"_id" : _id});
	});

	Meteor.publish('allTicketBucket',()=>{
        return TicketBucket.find({});
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
		
			if(addressType == "Current Address"){
				TicketMaster.update(
					{'_id':id},
						{   $set:{
								["ticketElement.0.currentAddress."+index+".status"]:status,
								["ticketElement.0.currentAddress."+index+".statusDate"] : new Date(),
								
						}
					}
				)
			}else if(addressType == "Permanent Address"){
				TicketMaster.update(
					{'_id':id},
						{   $set:{
								["ticketElement.0.permanentAddress."+index+".status"]:status,
								["ticketElement.0.permanentAddress."+index+".statusDate"] : new Date(),
								
						}
					}
				)
			}else{

				TicketMaster.update(
					{'_id':id},
						{   $set:{
								["ticketElement.0.currentAddress."+index+".status"]:status,
								["ticketElement.0.currentAddress."+index+".statusDate"] : new Date(),
								
						}
					}
				),

				TicketMaster.update(
					{'_id':id},
						{   $set:{
								["ticketElement.0.permanentAddress."+index+".status"]:status,
								["ticketElement.0.permanentAddress."+index+".statusDate"] : new Date(),
								
						}
					}
				)
			}
			
		},
		'updateTicketFinalStatus':function(id,status){
			return TicketMaster.update(
				{'_id':id},
					{   $set:{
							'ticketStatus.0.status':status,
							'ticketStatus.0.createdAt': new Date(),
					}
				}
			)
		},
		'updateTicketBucket':function(ticket){
			// console.log("Inside updateTicketBucket ");
			// console.log(ticket);
			 TicketBucket.update(
				{'ticketid':ticket.ticketid},
					{   $set:{
						"empid"    : ticket.empID,
						"role"     : ticket.role,
						"createdAt" : new Date(),
					}
				}
			)
			// console.log(ticket.ticketid)
			return ticket.ticketid;
		},


		'updateCommitteeUserCount':function(count,id){
			Meteor.users.update(
				{'_id':id},
				{$set:{
					'count':count
				}}
			
			)
		},

		'updateTicketElement':function(ticketId,empid,role,permanentAddress,currentAddress){
			console.log("Inside updateTicketElement");
			console.log(ticketId,empid,role);
			// console.log(permanentAddress);
			// console.log(currentAddress);
			TicketMaster.update(
				{'_id':ticketId},
				{   $push:{
						'ticketElement':{
							'empid': empid,
							'role' : role,
							'role_status':'Accepted',
							'createdAt': new Date(),
							'permanentAddress' : permanentAddress,
							'currentAddress'   : currentAddress,
						}
					}
				}
			)

			TicketMaster.update(
				{'_id':ticketId},
				{   $set:{
						'ticketStatus.0.status': "Accepted",					
						'ticketStatus.0.role': "team leader",
						'ticketStatus.0.createdAt': new Date()
					}
				}
			)
		},

		'allocateToTeamMember':function(ticketId,firstName,lastName,allocateToMemberDetails){
			var teamMemberDetails = Meteor.users.findOne({'profile.firstname':firstName,'profile.lastname':lastName})
			TicketMaster.update(
				{'_id':ticketId},
				{   $push:{
						'ticketElement':{
							'empid': teamMemberDetails._id,
							'role' : "team member",
							'role_status':'New',
							'createdAt': new Date(),
							'permanentAddress' : allocateToMemberDetails.permanentAddress,
							'currentAddress'   : allocateToMemberDetails.currentAddress,
						}
					}
				}
			)

			TicketMaster.update(
				{'_id':ticketId},
				{   $set:{
						// 'ticketElement.2.permanentAddress.status':"New",
						// 'ticketElement.2.permanentAddress.statusDate': new Date(),
						'ticketElement.1.role_status': "Allocated",					
						'ticketElement.1.createdAt': new Date(),
						'ticketElement.1.allocatedTo': firstName+" "+lastName,	
					}
				}
			)

		},

		'updateTMStatus':function(ticketId,addressType,status){
			console.log(ticketId,addressType,status);
			if((addressType=="permanentAddress") && (status=="Accepted")){
				TicketMaster.update(
					{'_id':ticketId},
					{   $set:{
							
							'ticketElement.2.permanentAddress.status': status,					
							'ticketElement.2.permanentAddress.createdAt': new Date(),
							
						}
					}
				)
			}else if((addressType=="currentAddress") && (status=="Accepted")){
				TicketMaster.update(
					{'_id':ticketId},
					{   $set:{
							
						'ticketElement.2.currentAddress.status': status,					
						'ticketElement.2.currentAddress.createdAt': new Date(),
							// 'ticketElement.2.currentAddress.Remark':""
						}
					}
				)
			}else if((addressType=="currentAddress") && (status=="Rejected")){
				TicketMaster.update(
					{'_id':ticketId},
					{   $set:{
							
						'ticketElement.2.currentAddress.status': status,					
						'ticketElement.2.currentAddress.createdAt': new Date(),
						'ticketElement.2.currentAddress.Remark':""
						}
					}
				)
			}else{
				TicketMaster.update(
					{'_id':ticketId},
					{   $set:{
							
						'ticketElement.2.permanentAddress.status': status,					
						'ticketElement.2.permanentAddress.createdAt': new Date(),
						'ticketElement.2.permanentAddress.Remark':""
						}
					}
				)
			}

			TicketMaster.update(
				{'_id':ticketId},
				{   $set:{
						
						'ticketElement.2.role_status': "Accepted",					
						'ticketElement.2.createdAt': new Date(),
						
					}
				}
			)
		},

		'addBADetails':function(BAName){

			var badetails = BADetails.insert({
				'BAName':BAName,
			});
			return badetails;

		}
	
	  });


}