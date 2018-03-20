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

		'updateTicketElement':function(ticketId,empid,role){
			TicketMaster.update(
				{'_id':ticketId},
				{   $push:{
						'ticketElement':{
							'empid': empid,
							'role' : role,
							'role_status':'New',
							'createdAt': new Date()
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
			insertData.role_status = "Allocated";
			insertData.createdAt   = new Date();
			TicketMaster.update(
				{'_id':ticketId},
				{   $push:{
						'ticketElement':insertData,
					}
				}
			)

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

			/*=====================Update status in ticket Bucket For Role team leader */
			
				var status = "Allocated";
				var role   = "team leader";
				Meteor.call('genericUpdateTicketBucket',ticketId,status,role,(error,result)=>{
					
					if(result == 1){
						/*==================Insert New document  for team member in ticket bucket============= */
						var ticket ={
							'ticketid':ticketId,
							'empID'  : teamMemberDetails._id,
							'role'   : "team member",
							'status' : "New"
						}
						
					   Meteor.call('insertTicketBucket',ticket);
					}
				});
			

		},

		'updateTMStatus':function(ticketId,status,empid){
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
			

			/*================ Update Status In Ticket Bucket =============*/
			var id = ticketId;
			var status = status;
			var role = "team member";
			Meteor.call('genericUpdateTicketBucket',id,status,role)

			return addTM;
			
		},

		'addBADetails':function(BAName){

			var badetails = BADetails.insert({
				'BAName':BAName,
			});
			return badetails;
		},

		'genericTicketUpdate':function(empid,role,ticketId,id,FEid){
			
			var insertData = TicketMaster.findOne({'_id':ticketId,'ticketElement.empid': empid},{ 'ticketElement.$': 1 });
			var ticketElemLength = insertData.ticketElement.length;
			if(ticketElemLength > 0){
				for(var i=0;i<ticketElemLength;i++){
					if(insertData.ticketElement[i].empid == empid){
						var insertData1 = insertData.ticketElement[i];
					}
				}
			}			
			if(role == "BA"){
				var baDetails = BADetails.findOne({'_id':id});
				var baName    = baDetails.BAName;
				var FEid      = ''; 
				
			}else if(role == "Field Expert"){
				var feFullName  = id;
				var splitFEName = feFullName.split(" ");
				var baName      = splitFEName[0]+" "+splitFEName[1];
				var userDetails = Meteor.users.findOne({'profile.firstname':splitFEName[0],'profile.lastname':splitFEName[1]});
				var id          = userDetails._id;
				var FEid        = FEid;
				
			}else{
				var baName = "Self";
				insertData1.empid = empid;

			}
			insertData1.role_status = "Allocated";
			insertData1.allocatedTo = baName;
			insertData1.allocatedToRole = role;
			insertData1.createdAt   = new Date();

			TicketMaster.update(
				{'_id':ticketId},
				{$push:{
					'ticketElement':insertData1,
					}
				}
			)

			insertData1.empid = FEid;
			insertData1.role = role;
			insertData1.role_status="New";

			
			return TicketMaster.update(
				{'_id':ticketId},
				{$push:{
					'ticketElement':insertData1,
					}
				},
				(error,result)=>{
					if(error){
						console.log(error);
						
					}else{
						console.log("result: ",result);


					}
				}
			);

			/*=========Add New document in ticket bucket for field expert======== */
			var ticket = {
				'ticketid': ticketId,
				'empID'   : FEid,
				'role'    : 'Field Expert',
				'status'  : 'New',
			}
			Meteor.call('insertTicketBucket',ticket);

			
		
		},
		"updateCurrentTicketElement":function (id,empid,documents,currentAddressId) {

			 TicketMaster.update({"_id" : id, "ticketElement.allocatedToId" : empid , "ticketElement.currentAddress.currentAddressId" : parseInt(currentAddressId) },
			 	{$set : {
			 		"ticketElement.2.currentAddress.0.documents" : documents,
			 	}

			 });
		},
		"updatePermanentTicketElement":function (id,empid,documents,permanentAddressId) {
			 TicketMaster.update({"_id" : id, "ticketElement.allocatedToId" : empid , "ticketElement.permanentAddress.permanentAddressId" : parseInt(permanentAddressId) },
			 	{$set : {
			 		"ticketElement.2.permanentAddress.0.documents" : documents,
			 	}

			 });
		},


		/*======================= API Function According To New Flow And Design =========================*/
		/*======================= Add New Object with status Approved / Rejected in Ticket Master ========*/

		'updateTicketFinalStatus':function(id,status,remark){
			
			var ticketBucket = TicketBucket.findOne({'ticketid':id});
			if(status == "Approved"){
				var insertDataDetails = TicketMaster.findOne({'_id':id});
				var insertData = insertDataDetails.ticketElement[0];
				insertData.role_status = status;
				insertData.createdAt   = new Date();
				insertData.verificationData.status = status;
				insertData.verificationData.remark = remark;
				insertData.verificationData.statusAt = new Date();
				TicketMaster.update(
					{'_id':id},
						{   $push:{
								'ticketElement':insertData,
						}
					}
				)
			}else{
				// console.log("Write code for reject status");
				var insertDataDetails = TicketMaster.findOne({'_id':id});
				var insertData = insertDataDetails.ticketElement[0];
				insertData.role_status = status;
				insertData.createdAt   = new Date();
				insertData.verificationData.status = status;
				insertData.verificationData.remark = remark;
				insertData.verificationData.statusAt = new Date();
				TicketMaster.update(
					{'_id':id},
						{   $push:{
								'ticketElement':insertData,
						}
					}
				)
			}

			Meteor.call('genericUpdateTicketBucket',id,status,'screening committee');
			/*================= Update Ticket Bucket Status ================================*/
			// TicketBucket.update(
			// 	{'ticketid':id},
			// 	{$set:{'status':status}}
			// )

			// TicketBucket.insert(
			// 	{'ticketid':id},
			// 	{$set:{'status':status}}
			// )

			return TicketMaster.update(
				{'_id':id},
					{   $set:{
							'ticketStatus.0.status':status,
							'ticketStatus.0.createdAt': new Date(),
					}
				}
			)
			
		},

		/*=================== Update Status In Ticket Bucket ====================*/

		'genericUpdateTicketBucket': function(id,status,role){
	
			var ticketBucketDetails = TicketBucket.find({'ticketid':id}).fetch();
			var ticketBucketLength = ticketBucketDetails.length;
			if(ticketBucketLength > 0){
				var prevTicketBucketData = ticketBucketDetails[ticketBucketLength - 1];
				if(prevTicketBucketData.role == role){					
					/****** Update Status *******/
				return	TicketBucket.update(
						{'ticketid':id,'role':role},
						{
							$set:{
								'status' : status,
							}
						}
					)
				}
			}	
		},

		/*This function overwrite ticket bucket with Role team leader */
		'insertTicketBucket':function(ticket){
			var ticketBucketDetails = TicketBucket.find({'ticketid':ticket.ticketid}).fetch();
			var ticketBucketLength  = ticketBucketDetails.length;
			if(ticketBucketLength > 0){
				
				var prevTicketBucketData = ticketBucketDetails[ticketBucketLength - 1];
					TicketBucket.insert(
						{  
						    'ticketid'    : prevTicketBucketData .ticketid,
							'ticketNumber': prevTicketBucketData .ticketNumber,
							'orderId'     : prevTicketBucketData .orderId,
							'serviceName' : prevTicketBucketData .serviceName,
 							'empid'       : ticket.empID,
							'role'        : ticket.role,
							'status'      : ticket.status,
							'tatDate'     : prevTicketBucketData .tatDate,
							'createdAt'   : new Date(),
						}
				)
			}
		   
		   return ticket.ticketid;
	   	},

	
	  });


}