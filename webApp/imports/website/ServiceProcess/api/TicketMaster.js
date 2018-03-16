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
	Meteor.publish('allBADEtails',()=>{
        return BADetails.find({});
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
		// 'updateTicketFinalStatus':function(id,status){

		// 	return TicketMaster.update(
		// 		{'_id':id},
		// 			{   $set:{
		// 					'ticketStatus.0.status':status,
		// 					'ticketStatus.0.createdAt': new Date(),
		// 			}
		// 		}
		// 	),
		// 	TicketMaster.update(
		// 		{'_id':id},
		// 			{   $set:{
		// 					'ticketElement.0.role_status':status,
		// 					'ticketElement.0.createdAt': new Date(),
		// 			}
		// 		}
		// 	)
		// },
		'updateTicketBucket':function(ticket){
			
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

		/*
			update status = reject and add rejection reason.
		*/

		'addRejectStatus':function(rejectReason,status,_id){
			TicketMaster.update({"_id":_id},
				{
					$set:{
						["ticketElement.0.permanentAddress."+0+".status"]:status,
						["ticketElement.0.permanentAddress."+0+".rejectRemark"]:rejectReason,
					}
				});
		},

		'addApproovedStatus':function(rejectReason,status,_id){
			TicketMaster.update({"_id":_id},
				{
					$set:{
						["ticketElement.0.permanentAddress."+0+".status"]:status,
						["ticketElement.0.permanentAddress."+0+".rejectRemark"]:rejectReason,
					}
				});
		},


		/*
			update status CurrentAddress= reject and add rejection reason.
		*/

		'addRejectCurStatus':function(rejectReason,status,_id){
			TicketMaster.update({"_id":_id},
				{
					$set:{
						["ticketElement.0.currentAddress."+0+".status"]:status,
						["ticketElement.0.currentAddress."+0+".rejectRemark"]:rejectReason,
					}
				});
		},

		'addApproovedCurStatus':function(rejectReason,status,_id){
			TicketMaster.update({"_id":_id},
				{
					$set:{
						["ticketElement.0.currentAddress."+0+".status"]:status,
						["ticketElement.0.currentAddress."+0+".rejectRemark"]:rejectReason,
					}
				});
		},

		'PVAddRejectCurStatus':function(docArrayIndex,status,rejectReason,_id){
			TicketMaster.update({"_id":_id},
				{
					$set:{
						["ticketElement.0.policeVerificationArray.0.documents"+docArrayIndex+".status"]:status,
						["ticketElement.0.policeVerificationArray.0.documents"+docArrayIndex+".status"]:rejectReason,
					}
				});
		},

		'updateCommitteeUserCount':function(count,id){
			Meteor.users.update(
				{'_id':id},
				{$set:{
					'count':count
				}}
			
			)
		},

<<<<<<< Updated upstream
		'updateTicketElement':function(ticketId,empid,role){
=======
		'updateTicketElement':function(ticketId,empid,role,permanentAddress,currentAddress){
>>>>>>> Stashed changes
			
			// console.log(permanentAddress);
			// console.log(currentAddress);
			TicketMaster.update(
				{'_id':ticketId},
				{   $push:{
						'ticketElement':{
							'empid': empid,
							'role' : role,
							'role_status':'New',
<<<<<<< Updated upstream
							'createdAt': new Date()
=======
							'createdAt': new Date(),
							'permanentAddress' : permanentAddress,
							'currentAddress'   : currentAddress,
>>>>>>> Stashed changes
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
		/*Insert status with allocated status of team leader  */
		'allocateToTeamMember':function(ticketId,firstName,lastName,allocateToMemberDetails,empid){
			var teamMemberDetails = Meteor.users.findOne({'profile.firstname':firstName,'profile.lastname':lastName});
			var ticketDetails = TicketMaster.findOne({'_id':ticketId,'ticketElement.empid': empid},{ 'ticketElement.$': 1 });
			for(var i=0;i<ticketDetails.ticketElement.length;i++){
				if(ticketDetails.ticketElement[i].empid == empid){
					var insertData = ticketDetails.ticketElement[i];
				}
			}
			insertData.role_status = "allocated";
			insertData.createdAt   = new Date();
<<<<<<< Updated upstream
=======
			 
			// TicketMaster.update(
			// 	{'_id':ticketId,"ticketElement.empid":empid},
			// 	{   $set:{
			// 			// 'ticketElement.2.permanentAddress.status':"New",
			// 			// 'ticketElement.2.permanentAddress.statusDate': new Date(),
			// 			'ticketElement.1.role_status': "Allocated",					
			// 			'ticketElement.1.createdAt': new Date(),
			// 			'ticketElement.1.allocatedTo': firstName+" "+lastName,	
			// 		}
			// 	}
			// ),
>>>>>>> Stashed changes
			TicketMaster.update(
				{'_id':ticketId},
				{   $push:{
						'ticketElement':insertData,
					}
				}
			),
			TicketMaster.update(
				{'_id':ticketId},
				{   $push:{
						'ticketElement':{
							'empid': teamMemberDetails._id,
							'role' : "team member",
							'role_status':'New',
							'createdAt': new Date(),
							'verificationData':insertData.verificationData
						}
					}
				}
			)

			

		},

		'updateTMStatus':function(ticketId,status,empid){
			console.log(ticketId,status);
			// if((addressType=="permanentAddress") && (status=="Accepted")){
			// 	TicketMaster.update(
			// 		{'_id':ticketId},
			// 		{   $set:{
							
			// 				'ticketElement.2.permanentAddress.status': status,					
			// 				'ticketElement.2.permanentAddress.createdAt': new Date(),
							
			// 			}
			// 		}
			// 	)
			// }else if((addressType=="currentAddress") && (status=="Accepted")){
			// 	TicketMaster.update(
			// 		{'_id':ticketId},
			// 		{   $set:{
							
			// 			'ticketElement.2.currentAddress.0.status': status,					
			// 			'ticketElement.2.currentAddress.0.createdAt': new Date(),
			// 				// 'ticketElement.2.currentAddress.Remark':""
			// 			}
			// 		}
			// 	)
			// }else if((addressType=="currentAddress") && (status=="Rejected")){
			// 	TicketMaster.update(
			// 		{'_id':ticketId},
			// 		{   $set:{
							
			// 			'ticketElement.2.currentAddress.status': status,					
			// 			'ticketElement.2.currentAddress.createdAt': new Date(),
			// 			'ticketElement.2.currentAddress.Remark':""
			// 			}
			// 		}
			// 	)
			// }else{
			// 	TicketMaster.update(
			// 		{'_id':ticketId},
			// 		{   $set:{
							
			// 			'ticketElement.2.permanentAddress.status': status,					
			// 			'ticketElement.2.permanentAddress.createdAt': new Date(),
			// 			'ticketElement.2.permanentAddress.Remark':""
			// 			}
			// 		}
			// 	)
			// }


			var ticketDetails = TicketMaster.findOne({'_id':ticketId,'ticketElement.empid': empid},{ 'ticketElement.$': 1 });
			for(var i=0;i<ticketDetails.ticketElement.length;i++){
				if(ticketDetails.ticketElement[i].empid == empid){
					var insertData = ticketDetails.ticketElement[i];
				}
			}
			insertData.role_status = "Accepted";
			insertData.createdAt   = new Date();

			 var addTM = TicketMaster.update(
				{'_id':ticketId},
				{   $push:{
						'ticketElement':insertData,
					}
				}
			)
			TicketBucket.update(
				{'ticketid':ticketId},
				{ $set:{
							'role':'team member',
							'empid': empid,
					   }
					
				}
			)

			return addTM;
			
		},

		'addBADetails':function(BAName){

			var badetails = BADetails.insert({
				'BAName':BAName,
			});
			return badetails;
		},

<<<<<<< Updated upstream
		'genericTicketUpdate':function(empid,role,ticketId,id){
			// // var TickteDetails = TicketMaster.findOne({'_id':ticketId});
			// // var ticketElementLength = TickteDetails.ticketElement.length;
			// // var insertData = TickteDetails.ticketElement[ticketElementLength-1];
			// var insertData = TicketMaster.findOne({'_id':ticketId,'ticketElement.empid': empid},{ 'ticketElement.$': 1 });
			// console.log("insertData");
			// console.log(insertData);
			// console.log("insertData.ticketElement.length");
			// console.log(insertData.ticketElement.length);
			// for(var i=0;i<insertData.ticketElement.length;i++){
			// 	if(insertData.ticketElement[i].empid == empid){
			// 		var insertData = insertData.ticketElement[i];
			// 	}
			// }
			// insertData.role_status = "Assigned";
			// insertData.createdAt   = new Date();
			// if(role == "BA"){
			// 	var baDetails = BADetails.findOne({'_id':id});
			// 	var baName    = baDetails.BAName;
=======
		'genericTicketUpdate':function(addressType,role,ticketId,id){
			var TickteDetails = TicketMaster.findOne({'_id':ticketId});
			var ticketElementLength = TickteDetails.ticketElement.length;
			var insertData = TickteDetails.ticketElement[ticketElementLength-1];
			if(role == "BA"){
				var baDetails = BADetails.findOne({'_id':id});
				var baName    = baDetails.BAName;
				
			}else if(role == "Field Expert"){
				var feFullName = id;
				var splilFEName = feFullName.split(" ");
				var baName      = splilFEName[0]+" "+splilFEName[1];
				var userDetails = Meteor.users.findOne({'profile.firstname':splilFEName[0],'profile.lastname':splilFEName[1]});
				var id        = userDetails._id;
				
			}
			insertData.role = role;
			insertData.role_name = baName;
			insertData.empid = id;
			insertData.role_status="New"
			
			if(addressType == "currentAddress"){
				insertData.currentAddress[0].status = "New";
				insertData.currentAddress[0].statusDate = new Date();
>>>>>>> Stashed changes
				
			// }else if(role == "Field Expert"){
			// 	var feFullName  = id;
			// 	var splitFEName = feFullName.split(" ");
			// 	var baName      = splitFEName[0]+" "+splitFEName[1];
			// 	var userDetails = Meteor.users.findOne({'profile.firstname':splitFEName[0],'profile.lastname':splitFEName[1]});
			// 	var id          = userDetails._id;
				
			// }
			// insertData.role = role;
			// insertData.role_name = baName;
			// TicketMaster.update(
			// 	{'_id':ticketId},
			// 	{   $push:{
			// 			'ticketElement':insertData,
			// 		}
			// 	}
			// )
			// insertData.empid = id;
			// insertData.role_status="New";
			
			// TicketMaster.update(
			// 	{'_id':ticketId},
			// 	{$push:{
			// 		'ticketElement':insertData,
			// 		}
			// 	},
			// 	(error,result)=>{
			// 		if(error){
			// 			console.log(error);
						
			// 		}else{
			// 			console.log("result: ",result);


			// 		}
			// 	}
			// );

			// TicketBucket.update(
			// 	{'ticketid':ticketId},
			// 	{
			// 		$set:{
			// 			'empid': id,
			// 			'role': role
			// 		}

			// 	}
			// )

			

		},
		"updateCurrentTicketElement":function (id,empid,documents,currentAddressId) {
			 // console.log("id",id);
			 // console.log("empid",empid);
			 // console.log("documents",documents);
			 // console.log("currentAddressId",currentAddressId);
			 TicketMaster.update({"_id" : id, "ticketElement.allocatedToId" : empid , "ticketElement.currentAddress.currentAddressId" : parseInt(currentAddressId) },
			 	{$set : {
			 		"ticketElement.2.currentAddress.0.documents" : documents,
			 	}

			 });
		},
		"updatePermanentTicketElement":function (id,empid,documents,permanentAddressId) {
			 // console.log("id",id);
			 // console.log("empid",empid);
			 // console.log("documents",documents);
			 // console.log("currentAddressId",currentAddressId);
			 TicketMaster.update({"_id" : id, "ticketElement.allocatedToId" : empid , "ticketElement.permanentAddress.permanentAddressId" : parseInt(permanentAddressId) },
			 	{$set : {
			 		"ticketElement.2.permanentAddress.0.documents" : documents,
			 	}

			 });
		},


		/*======================= API Function According To New Flow And Design =========================*/

		'updateTicketFinalStatus':function(id,status){
			
			console.log("Inside updateTicketFinalStatus id, status :"+id,status);
			if(status == "Approved"){
				var insertDataDetails = TicketMaster.findOne({'_id':id});
				var insertData = insertDataDetails.ticketElement[0];
				insertData.role_status = status;
				insertData.createdAt   = new Date();
<<<<<<< Updated upstream
				insertData.verificationData.status = status;
				insertData.verificationData.statusAt = new Date();
=======
>>>>>>> Stashed changes
				TicketMaster.update(
					{'_id':id},
						{   $push:{
								'ticketElement':insertData,
						}
					}
				)
			}else{
				console.log("Write code for reject status");
			}


			return TicketMaster.update(
				{'_id':id},
					{   $set:{
							'ticketStatus.0.status':status,
							'ticketStatus.0.createdAt': new Date(),
					}
				}
			)
			
		}
	
	  });


}