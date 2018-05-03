import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import { TempTicketImages } from "../../../dashboard/ticketManagement/api/TempUpload.js";
import { TempTicketVideo } from "../../../dashboard/ticketManagement/api/TempUpload.js";
import { TempTicketReport } from "../../../dashboard/ticketManagement/api/TempUpload.js";
import {CompanySettings} from '/imports/dashboard/companySetting/api/CompanySettingMaster.js';
import {Order} from './Order.js';

export const TicketMaster = new Mongo.Collection("ticketMaster");
export const TicketBucket = new Mongo.Collection("ticketbucket");
export const BADetails = new Mongo.Collection("badetails");

if(Meteor.isServer){
	
	Meteor.publish('allTickets',()=>{
        return TicketMaster.find({});
	});
	Meteor.publish('singleTicket',(_id)=>{
		// console.log('ticket id : ',_id);
        return TicketMaster.find({"_id" : _id}); 
	});

	Meteor.publish('allTicketBucket',()=>{
        return TicketBucket.find({});
	});
	Meteor.publish('allBADEtails',()=>{
        return BADetails.find({});
	});
	Meteor.publish('listTickets',()=>{
		return TicketMaster.find({},{fields:{ticketNumber:1,orderNo:1,serviceName:1,createdAt:1,tatDate:1,'ticketElement.userId':1,'ticketElement.allocatedUsrId':1,'ticketElement.role':1,'ticketElement.roleStatus':1,'ticketElement.createdAt':1}});
	});

	Meteor.methods({
   	'testAPI':function(){
   		console.log('testAPI');
   	},
	//Find User with minium tickets for specific role and serviceName
	'autoAllocateMember':function(role,serviceName){
		//Get the Member with minium count for the role specified
		var memberDetails = Meteor.users.find({"roles":role,"profile.status":"Active"},{sort: {"count":1},limit:1}).fetch();
		
		if(memberDetails){
			return memberDetails;
		}	
	},
	//Convert String into Sentence Case
	'toTitleCase':function(str) {
		return str.replace(/(?:^|\s)\w/g, function(match) {
			return match.toUpperCase();
		});
	},
	'genericUpdateTicketMasterElement': function(ticketid,insertData){

		//Update TicketElement
		//Write code for split
		
		var memberValue = insertData.allocatedToUserName;
		var a = memberValue.indexOf("(");
		if(a !== -1){
			var splitDropdownValue = memberValue.split('(');
			insertData.allocatedToUserName = splitDropdownValue[0];
			var countValueSplit = splitDropdownValue[1].split(')');
		}
		var updateStatus = TicketMaster.update(
			{'_id':ticketid},
			{
				$push:{
					'ticketElement' : insertData,
				}
			}
		);	

		switch(insertData.roleStatus){
			case 'ScreenApproved' 	:
				var newCount = Meteor.user().count;
				if(newCount){
					Meteor.call('updateCommitteeUserCount',newCount-1,insertData.userId);
				}
				var role = "team leader";
				var roleStatus = "screenTLAllocated";
				var ticketDetails = TicketMaster.findOne({"_id":ticketid});
				if(ticketDetails){
					var newMember = Meteor.call('autoAllocateMember',role,ticketDetails.serviceName);
					var roleSentence = Meteor.call('toTitleCase',role);
					
					if(roleSentence){
						var insertData = {
							"userId"              : '',
							"userName"            : '',
							"role"                : 'system action',
							"roleStatus"          : roleStatus,
							"msg"                 : "System Allocated Ticket To " + roleSentence,
							"allocatedToUserid"	  : newMember[0]._id,
							"allocatedToUserName" : newMember[0].profile.firstname + ' ' + newMember[0].profile.lastname,
							"createdAt"           : new Date()
						}
						//Update TicketElement - System Action
						TicketMaster.update(
							{'_id':ticketid},
							{
								$push:{
									'ticketElement' : insertData,
								}
							}
						);	
						Meteor.call('updateCommitteeUserCount',newMember[0].count+1,newMember._id);
					}
				}
				
				break;
			case 'ScreenRejected' 	: 
				var newCount = Meteor.user().count;
				if(newCount){
					Meteor.call('updateCommitteeUserCount',newCount-1,insertData.userId);
				}
				var ticketDetails = TicketMaster.findOne({"_id":ticketid});
				if(ticketDetails){
					// console.log('ticketmaster ',ticketid,ticketDetails.userId,insertData.remark,ticketDetails.verificationType,ticketDetails.verificationId);
					Meteor.call('changeStatusMethod',ticketid,ticketDetails.userId,insertData.remark,ticketDetails.verificationType,ticketDetails.verificationId);
				}
				break;
			
			case 'Assign':
				count = parseInt(countValueSplit)+1;	
				if(count){
					Meteor.call('updateCommitteeUserCount',count,insertData.allocatedToUserid);
				}
				break;
			
			case 'AssignReject':
				var teamMember = Meteor.users.findOne({"_id":insertData.userId});
				if(teamMember && teamMember.count){
					var newCount = teamMember.count - 1;
				} else{
					var newCount = 0;
				}			
				Meteor.call('updateCommitteeUserCount',newCount,teamMember._id);
				break;
			case 'ProofSubmit'      :
				TicketMaster.update({"_id": ticketid},{
					$set: {
						'submitedDoc.createdAt' : insertData.createdAt,
						'submitedDoc.documents' : insertData.submitedDoc,
					}
				});
				TempTicketImages.remove({});
				TempTicketVideo.remove({});
				var curTicket = TicketMaster.findOne({"_id":ticketid});
				if(curTicket){
					
					var ticketElements = curTicket.ticketElement; 
					var selfAllocated = ticketElements.find(function (obj) { return obj.roleStatus == 'SelfAllocated' });
					if(selfAllocated){
						var insertData = {
							"userId"              : Meteor.userId(),
							"userName"            : Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname,
							"allocatedToUserid"   : '',
							"allocatedToUserName" : '',
							"role"                : 'team member',
							"roleStatus"          : 'VerificationPass',
							"msg"                 : 'Approved Verification Information',
							"createdAt"           : new Date()
						}
						TicketMaster.update(
							{'_id':ticketid},
							{
								$push:{
									'ticketElement' : insertData,
								}
							}
						);	
					}
				}
				

				break;
			case 'ProofResubmitted' :
					TicketMaster.update({"_id": ticketid},{
						$set: {
							'submitedDoc.createdAt' : insertData.createdAt,
							'submitedDoc.documents' : insertData.submitedDoc,
						}
					});
					TempTicketImages.remove({});
					TempTicketVideo.remove({});
					var curTicket = TicketMaster.findOne({"_id":ticketid});
					if(curTicket){
						
						var ticketElements = curTicket.ticketElement; 
						var selfAllocated = ticketElements.find(function (obj) { return obj.roleStatus == 'SelfAllocated' });
						if(selfAllocated){
							var insertData = {
								"userId"              : Meteor.userId(),
								"userName"            : Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname,
								"allocatedToUserid"   : '',
								"allocatedToUserName" : '',
								"role"                : 'team member',
								"roleStatus"          : 'VerificationPass',
								"msg"                 : 'Approved Verification Information',
								"createdAt"           : new Date()
							}
							TicketMaster.update(
								{'_id':ticketid},
								{
									$push:{
										'ticketElement' : insertData,
									}
								}
							);	
						}
					}
					break;
			case 'ReportSubmitted' 	:
					if(insertData.reportSubmited){
						TicketMaster.update({"_id": ticketid},{
							$set: {
								'reportSubmited.createdAt' : insertData.createdAt,
								'reportSubmited.documents' : insertData.reportSubmited,
								'reportSubmited.fileExtension' : insertData.fileExtension,
							}
						});
						TempTicketReport.remove({});
						var role = "quality team member";
						var roleStatus = "VerificationPassQTMAllocated";
						var ticketDetails = TicketMaster.findOne({"_id":ticketid});
						if(ticketDetails){
							var newMember = Meteor.call('autoAllocateMember',role,ticketDetails.serviceName);
							var roleSentence = Meteor.call('toTitleCase',role);
							if(roleSentence){
								var insertData = {
									"userId"              : '',
									"userName"            : '',
									"role"                : 'system action',
									"roleStatus"          : roleStatus,
									"msg"                 : "System Allocated Ticket To " + roleSentence,
									"allocatedToUserid"	  : newMember[0]._id,
									"allocatedToUserName" : newMember[0].profile.firstname + ' ' + newMember[0].profile.lastname,
									"createdAt"           : new Date()
								}
								//Update TicketElement - System Action
								TicketMaster.update(
									{'_id':ticketid},
									{
										$push:{
											'ticketElement' : insertData,
										}
									}
								);	
							
								Meteor.call('updateCommitteeUserCount',newMember[0].count+1,newMember[0]._id);
							}
						}
					}
					break;
			case 'ReportReSubmitted':
						TicketMaster.update({"_id": ticketid},{
							$set: {
								'reportSubmited.createdAt' : insertData.createdAt,
								'reportSubmited.documents' : insertData.reportSubmited,
								'reportSubmited.fileExtension' : insertData.fileExtension,
								
							}
						});
						TempTicketReport.remove({});
						var role = "quality team member";
						var roleStatus = "VerificationPassQTMAllocated";
						var ticketDetails = TicketMaster.findOne({"_id":ticketid});
						if(ticketDetails){
							var newMember = Meteor.call('autoAllocateMember',role,ticketDetails.serviceName);
							var roleSentence = Meteor.call('toTitleCase',role);
							if(roleSentence){
								var insertData = {
									"userId"              : '',
									"userName"            : '',
									"role"                : 'system action',
									"roleStatus"          : roleStatus,
									"msg"                 : "System Allocated Ticket To " + roleSentence,
									"allocatedToUserid"	  : newMember[0]._id,
									"allocatedToUserName" : newMember[0].profile.firstname + ' ' + newMember[0].profile.lastname,
									"createdAt"           : new Date()
								}
								//Update TicketElement - System Action
								TicketMaster.update(
									{'_id':ticketid},
									{
										$push:{
											'ticketElement' : insertData,
										}
									}
								);	
								Meteor.call('updateCommitteeUserCount',newMember[0].count+1,newMember[0]._id);
							}
						}
						break;
			case 'QAPass' :
					var newCount = Meteor.user().count;
					if(newCount){
						Meteor.call('updateCommitteeUserCount',newCount-1,insertData.userId);
					}
					var role = "quality team leader";
					var roleStatus = "QAPassQTLAllocated";
					var ticketDetails = TicketMaster.findOne({"_id":ticketid});
					if(ticketDetails){
						var newMember = Meteor.call('autoAllocateMember',role,ticketDetails.serviceName);
						var roleSentence = Meteor.call('toTitleCase',role);
						if(roleSentence){
							var insertData = {
								"userId"              : '',
								"userName"            : '',
								"role"                : 'system action',
								"roleStatus"          : roleStatus,
								"msg"                 : "System Allocated Ticket To " + roleSentence,
								"allocatedToUserid"	  : newMember[0]._id,
								"allocatedToUserName" : newMember[0].profile.firstname + ' ' + newMember[0].profile.lastname,
								"createdAt"           : new Date()
							}
							//Update TicketElement - System Action
							TicketMaster.update(
								{'_id':ticketid},
								{
									$push:{
										'ticketElement' : insertData,
									}
								}
							);	
							Meteor.call('updateCommitteeUserCount',newMember[0].count,newMember._id);
						}
					}
					break;
			case 'QAFail' :
					break;
			case 'ReviewPass' :
				var ticketDetails = TicketMaster.findOne({"_id":ticketid});
				if(ticketDetails){ 
					Meteor.call('changeTicketStatusInOrder',ticketDetails.orderId,ticketid,insertData.ticketDataChangeStaus,ticketDetails.reportSubmited.documents)
				}
				break;
		}
		return updateStatus;
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
	/* update status = reject and add rejection reason. */
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
	/* update status CurrentAddress= reject and add rejection reason. */
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
		// console.log("count,id :"+count,id);
		Meteor.users.update(
			{'_id':id},
			{$set:{
				'count':count
			}}
		)
	},

	'updateTicketElement':function(ticketId,empid,role,allocatedToUserName){
		var insertDataDetails = TicketMaster.findOne({'_id':ticketId});
		if(insertDataDetails){
			var insertData = {};
			var length = insertDataDetails.ticketElement.length;
			if(length>0){
				insertData.userId               = "";
				insertData.userName             = "";
				insertData.allocatedToUserid    = empid;
				insertData.allocatedToUserName  = allocatedToUserName;
				insertData.role                 = "System Action";
				insertData.roleStatus           = "ScreenTLAllocated";
				insertData.msg                  = 'System Allocated Ticket To Team Leader';
				insertData.createdAt            = new Date();
			}
			Meteor.call('genericUpdateTicketMasterElement',ticketId,insertData);
			TicketMaster.update(
				{'_id':ticketId},
				{   $set:{
						'ticketStatus.0.status': "Accepted",					
						'ticketStatus.0.role': "team leader",
						'ticketStatus.0.createdAt': new Date()
					}
				}
			)
		}
	},
	/*Insert status with allocated status of team leader  */
	'allocateToTeamMember':function(ticketId,userId,userName){
		var insertDataDetails = TicketMaster.findOne({'_id':ticketId});
		if(insertDataDetails){
			var insertData = {};
			var length = insertDataDetails.ticketElement.length;
			if(length>0){
				insertData.userId               = insertDataDetails.ticketElement[length-1].allocatedToUserid;
				insertData.userName             = insertDataDetails.ticketElement[length-1].allocatedToUserName;
				insertData.allocatedToUserid    = userId;
				insertData.allocatedToUserName  = userName;
				insertData.role                 = "Team Leader";
				insertData.roleStatus           = "Assign";
				insertData.msg                  = 'Assigned The Ticket';
				insertData.createdAt            = new Date();
			}
		}
		
		Meteor.call('genericUpdateTicketMasterElement',ticketId,insertData);
				

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

	'updateTMStatus':function(ticketId,status){
		
		var insertDataDetails = TicketMaster.findOne({'_id':ticketId});
		if(insertDataDetails){
			var length = insertDataDetails.ticketElement.length;
			var insertData = insertDataDetails.ticketElement[length-1];
			if(length>0){

				insertData.userId               = insertDataDetails.ticketElement[length-1].allocatedToUserid;
				insertData.userName             = insertDataDetails.ticketElement[length-1].allocatedToUserName;
				insertData.allocatedToUserid    = "";
				insertData.allocatedToUserName  = "";
				insertData.role                 = "Team Member";
				insertData.roleStatus           = status;
				insertData.msg                  = 'Accepted Ticket';
				insertData.createdAt            = new Date();
			}
		}
		
		Meteor.call('genericUpdateTicketMasterElement',ticketId,insertData);
		

		/*================ Update Status In Ticket Bucket =============*/
		var id = ticketId;
		var status = status;
		var role = "team member";
		Meteor.call('genericUpdateTicketBucket',id,status,role)

		// return addTM;
		
	},
		/**==================== We show Dropdown insted of submit box================== */
		// 'addBADetails':function(BAName){

		// 	var badetails = BADetails.insert({
		// 		'BAName':BAName,
		// 	});
		// 	return badetails;
		// },

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
			// var baDetails = BADetails.findOne({'_id':id});
			// var baName    = baDetails.BAName;
			// var FEid      = ''; 
			// insertData1.allocatedToRole = role;

			var feFullName  = id;
			var splitFEName = feFullName.split(" ");
			var baName      = splitFEName[0]+" "+splitFEName[1];
			var userDetails = Meteor.users.findOne({'profile.firstname':splitFEName[0],'profile.lastname':splitFEName[1]});
			var id          = userDetails._id;
			var FEid        = FEid;
			// insertData1.empid = id;
			insertData1.allocatedToRole =role;
			insertData1.allocatedTo = baName;	
		
			
		}else if(role == "Field Expert"){
			var feFullName  = id;
			var splitFEName = feFullName.split(" ");
			var baName      = splitFEName[0]+" "+splitFEName[1];
			var userDetails = Meteor.users.findOne({'profile.firstname':splitFEName[0],'profile.lastname':splitFEName[1]});
			var id          = userDetails._id;
			var FEid        = FEid;
			

			// insertData1.empid = id;
			insertData1.allocatedToRole =role;
			insertData1.allocatedTo = baName;	
			
		}else{
			// var baName = "Self";
			// insertData1.role = role;
			// insertData1.empid = empid;
			id = empid; 
			role = "team member";
			insertData1.allocatedToRole ="";
			insertData1.allocatedTo = "Self";			

		}
		insertData1.role_status = "Allocate";
		insertData1.createdAt   = new Date();
		TicketMaster.update(
			{'_id':ticketId},
			{$push:{
				'ticketElement':insertData1,
				}
			}
		)

		/*=========Add New document in ticket bucket for field expert======== */
		var ticket = {
			'ticketid': ticketId,
			'empID'   : FEid,
			'role'    : role,
			'status'  : 'New',
		}
		Meteor.call('insertTicketBucket',ticket);

		insertData1.empid = id;
		insertData1.role = role;
		insertData1.role_status="Allocate";
		insertData1.allocatedTo="";
		insertData1.allocatedToRole="";
	
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

	'updateTicketFinalStatus':function(ticketId,status,remark){
		
		var ticketBucket = TicketBucket.findOne({'ticketid':ticketId});
		var insertDataDetails = TicketMaster.findOne({'_id':ticketId});

		if(insertDataDetails){
			// var insertData = insertDataDetails.ticketElement[0];
			var previousData = [];
			var insertData = {};
			var length = insertDataDetails.ticketElement.length;
			if(length>0){
				// var insertData={
				insertData.userId               = insertDataDetails.ticketElement[length-1].allocatedToUserid;
				insertData.userName             = insertDataDetails.ticketElement[length-1].allocatedToUserName;
				insertData.allocatedToUserid    = '';
				insertData.allocatedToUserName  = '';
				insertData.role                 = 'Screening Committee';
				insertData.roleStatus           = status;
				insertData.msg                  = 'Screened Ticket Documents';
				insertData.createdAt            = new Date();
				// }
			}
			if(status == 'ScreenRejected'){
				insertData.remark      = remark;
				insertData.rejectedData     = insertDataDetails.verificationData;
				insertData.rejectedDocument = insertDataDetails.verificationDocument;
			}
		}
		Meteor.call('genericUpdateTicketMasterElement',ticketId,insertData);	
		Meteor.call('genericUpdateTicketBucket',ticketId,status,'Screening Committee');
		// /*================= Update Ticket Bucket Status ================================*/
		
		return TicketMaster.update(
			{'_id':ticketId},
				{   $set:{
						'ticketStatus.0.status':status,
						'ticketStatus.0.createdAt': new Date(),
					}
			}
		);
		
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

	// Function for add ticketBAElement submitted status
	'addticketSelfElement' : function (id,ticketSelfElement) {
		TicketMaster.update({"_id": id},{
			$push: {
				'ticketElement' : ticketSelfElement,
			}
			});
			
			if(ticketSelfElement.submitedDoc.images.length>0){
			
				TicketMaster.update({"_id": id},{
					$set: {
						'submittedDocuments.createdAt' : ticketSelfElement.createdAt,
						'submittedDocuments.documents' : ticketSelfElement.submitedDoc,
					}
				});
			}
			

		TempTicketImages.remove({});
		TempTicketVideo.remove({});
	},

		/*=============== Team Member Approve/Reject Depend On Submited Document ===============*/
	addTMDocStatus(tickteId,status){
	
		var ticketDetails = TicketMaster.findOne({'_id':tickteId});
		var ticketElemLength = ticketDetails.ticketElement.length;		
		if((ticketDetails) && (ticketElemLength>0)){
			var insertData = ticketDetails.ticketElement[ticketElemLength-2];
			insertData.role_status = status;
			TicketMaster.update(
				{'_id':tickteId},
				{$push:{
						'ticketElement':insertData,
					}
				}
			)
		}
	},
	/*================== Upload Report Team Member=============*/
	uploadReport(ticketId){
		var reportLinkDetails = TempTicketReport.findOne({},{sort:{'createdAt':-1}});		
		var reportLink = reportLinkDetails.ReportLink;
		var ticketDetails = TicketMaster.findOne({'_id':ticketId});
		var ticketElemLength = ticketDetails.ticketElement.length; 
		if((ticketDetails) &&(ticketElemLength>0)){
			var insertData = {
				"userid"              : Meteor.userId(),
				"userName"            : Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname,
				"allocatedToUserid"   : '',
				"allocatedToUserName" : '',
				"role"                : 'team member',
				"roleStatus"          : 'ReportSubmitted',
				"msg"                 : 'Team Leader has Uploaded the Report',
				"createdAt"           : new Date()
			  }
			// var insertData = ticketDetails.ticketElement[ticketElemLength-1];
			// insertData.role_status = "ReportSubmit";
			// insertData.createdAt = new Date();
			return TicketMaster.update(
				{'_id':ticketId},
				{$push:{
					'ticketElement':insertData
						}
				}
			)
			// TempTicketReport.remove();
		}
			
	},

	addQTM(ticketId,empID,role,status){
		// console.log("ticketId,empID,role :"+ticketId,empID,role,status);
		TicketMaster.update(
			{'_id':ticketId},
			{   $push:{
					'ticketElement':{
						'empid': empID,
						'role' : role,
						'role_status':status,
						'createdAt': new Date()
					}
				}
			}
		)
	},
	// updateQAStatus(ticketId){
	// 	var ticketDetails = TicketMaster.findOne({'_id':ticketId});
	// 	if((ticketDetails)){
			
	// 	}
	// }  
		deleteImageFromSubmitDocument(id,dataIndex){
			var ticketDetails = TicketMaster.findOne({"_id":id});
			if(ticketDetails){
				var images = ticketDetails.submitedDoc.documents.images;
			// console.log('before images list ', images);
			if (dataIndex > -1) {
			    images.splice(dataIndex, 1);
			}
			// console.log('after images list ', images);
			TicketMaster.update({"_id":id},
					{$set:{ 'submitedDoc.documents.images' : images}}
				);	
			}

		},
	
	/**============== Delete Report================== */
	deleteReport(ticketid){
		TicketMaster.update({'_id':ticketid},
		{
			$set:{
				reportSubmited:{},
			}
		}
		)

	}
	});
}