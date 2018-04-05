import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import Validation from 'react-validation';
import validator from 'validator';
import {Tracker} from 'meteor/tracker';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { TicketMaster } from '../../website/ServiceProcess/api/TicketMaster.js';
import {CompanySettings} from '/imports/dashboard/companySetting/api/CompanySettingMaster.js';
import { TicketBucket } from '../../website/ServiceProcess/api/TicketMaster.js';
import { UserProfile } from '/imports/website/forms/api/userProfile.js';
import '../notification/components/SendMailnNotification.jsx';
class VerifiedDocuments extends TrackerReact(Component){
  constructor(props){
    super(props);
    this.state = {
      "subscription" : {
        "allTickets" : Meteor.subscribe("allTickets"),
        "userfunction" : Meteor.subscribe('userfunction'),
      }
    }
  }
  showDocuments(event){
    event.preventDefault();
    var idVal= $(event.currentTarget).attr('data-target');
    $('#'+idVal).modal('show');
    // Session.set('editExp','editexperienceinfo');
  }

/*
  hideShowRejectReason function for show reason block click on Reject button
*/

  hideShowRejectReason(){
    $('.showHideReasonWrap').toggleClass('showReasonSection');
  }

/*
    This function execute when document get approved. 
*/
  submitRejectReason(event){
    var curURl = location.pathname;
    if(curURl){
      var _id = curURl.split('/').pop();
    }
    console.log('curURL ',_id);
    var rejectReason =  $('.rejectReason').val();
    var status       = 'Reject';
    Meteor.call("addRejectStatus",rejectReason,status,_id,(error,result)=>{
      if(error){

      }else{
        // swal('Ticket Rejected');
      }
    });
  }

  /* hideShowRejectReason function for show reason block click on Reject button*/

  hideShowRejectCurReason(){
    $('.showHideReasonWrap').toggleClass('showReasonSection');
  }
  getRole(role) {
    return role != "backofficestaff";
  }
/*This function execute when document get approved. */
  approvedCurDocument(event){
    event.preventDefault();
    var curURl = location.pathname;
    if(curURl){
      var ticketId = curURl.split('/').pop();
    }
    var status = $(event.currentTarget).attr('data-status');
    console.log("my status is",status);
    var remark = $('.rejectReason-0').val();
    $('.close').click();
   
    var ticketObj = TicketMaster.findOne({'_id':ticketId});                       
    if(ticketObj){
      var insertData = {
        "userid"              : Meteor.userId(),
        "userName"            : Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname,
        "role"                : 'screening committee',
        "roleStatus"          : status,
        "msg"                 : 'Screened Ticket Documents',
        "allocatedToUserid"   : '',
        "allocatedToUserName" : '',
        "createdAt"           : new Date()
      }
      if(status == 'ScreenRejected'){
        insertData.remark = remark;
      }
      // console.log('insertData ',insertData ); 
      Meteor.call('genericUpdateTicketMasterElement',ticketId,insertData);
              // Notification to user- Need to implement
              //Data Missing, Need to upload correct Data
              // Meteor.call('changeStatusMethod',ticketObj._id,ticketObj.userId,remark,ticketObj.verificationType,ticketObj.verificationId,function(error,result){
              //   if (error) {
              //     console.log(error.reason);
              //   }else{
              //       var ticketUserId = userId;
              //       var adminData   = Meteor.users.findOne({'roles' : "admin"});
              //       var userData    = Meteor.users.findOne({"_id" : ticketUserId });
              //         // console.log("ticketUserId",ticketUserId);
              //         // console.log('userData',userData);
              //         // console.log('adminData: ',adminData);
              //         if (adminData) {
              //           var adminId  = adminData._id;
              //         }
              //         // console.log("adminId",adminId);
              //         if (userData) {
              //           var newID = userData._id;
              //           if (userData.profile) {
              //             var firstLastNm = userData.profile.firstname+' '+userData.profile.lastname;
              //             var mobNumber   = userData.profile.mobNumber;
              //           }
              //         }
              //         // console.log("mobNumber",mobNumber);
              //         var newDate     = new Date();

              //         var msgvariable = {                       
              //                           '[username]' : firstLastNm,
              //                           '[date]'     : moment(newDate).format("DD/MM/YYYY"),
              //                          };
              //         // Format for send Email //
              //         var inputObj = {
              //             from         : adminId,
              //             to           : newID,
              //             templateName : 'Document Reject by screening committee',
              //             variables    : msgvariable,
              //         }
              //         sendMailNotification(inputObj);
                      
              //         // Format for sending SMS //
              //         var smsObj = {
              //             to           : newID,
              //             templateName : 'Document Reject by screening committee',
              //             number       : mobNumber,
              //             variables    : msgvariable,
              //         }
              //         // console.log("smsObj",smsObj);
              //         sendSMS(smsObj);
              //         // Format for sending notification //
              //         var notifictaionObj = {
              //           to           : newID,
              //           templateName : 'Document Reject by screening committee',
              //           variables    : msgvariable,
              //         }
              //         sendInAppNotification(notifictaionObj);
              //   }
              // }); // Userprofile collection
    // }
    //   var userId  = ticketObj.userId;
    //   Meteor.call('updateTicketFinalStatus',ticketId,status,remark,function(error,result){
    //     if(result){
    //       console.log('hi');
    //       if(status == 'ScreenApproved'){
    //         //Get max allocate number for team leader
    //         var memberDetails = Meteor.users.find({"roles":"team leader"},{sort:{'count':1}}).fetch();
    //         var companyObj = CompanySettings.findOne({"maxnoOfTicketAllocate.role":"team leader"});
    //         for(var i=0;i<companyObj.maxnoOfTicketAllocate.length;i++){
    //           if(companyObj.maxnoOfTicketAllocate[i].role == "team leader"){
    //             var allocatedtickets = companyObj.maxnoOfTicketAllocate[i].maxTicketAllocate;
    //           }
    //         }
    //         for(var k=0;k<memberDetails.length;k++){
    //           var newTicketAllocated = {
    //               'ticketid' : ticketId,
    //               'empID'    : memberDetails[k]._id,
    //               'role'     : 'team leader',
    //               'status'   : status,
    //           }
    //           Meteor.call('insertTicketBucket',newTicketAllocated,function(error,result){
    //               if(result){
    //                   var ticketBucketDetail = TicketBucket.findOne({"ticketid":newTicketAllocated.ticketid});
    //                   if(ticketBucketDetail){
    //                       var ticketId = newTicketAllocated.ticketid;
    //                       var empID    = newTicketAllocated.empID;
    //                       var role     = newTicketAllocated.role;
    //                       Meteor.call('updateTicketElement',ticketId,empID,role,function(error,result){                   
    //                       });
    //                   }
    //               }
    //           });

    //           if(memberDetails[k].count){
    //             var newCount = memberDetails[k].count + 1;
    //           } else{
    //             var newCount = 1;
    //           }
    //           Meteor.call('updateCommitteeUserCount',newCount,memberDetails[k]._id);
    //           break;
    //         }
    //         // swal("Approved successfully");
    //       }else{
    //         // swal("Ticket Approved");             
    //           
    //           Meteor.call('changeStatusofOrder',ticketObj.userId,remark,ticketObj.verificationId,ticketObj.verificationType); // Change the Status in Order collection
    //       }        
    //     }
    //   });
    // }
   }
}


/*Show multiple document section in address verification*/
  showallSlides(){
    var curURl = location.pathname;
    if(curURl){
      var _id = curURl.split('/').pop();
    }
    const postHandle = Meteor.subscribe('singleTicket',_id);
    const getTicket  = TicketMaster.findOne({"_id" : _id}); 
    if (getTicket) {
       var ticketElement = getTicket.ticketElement;
       if (ticketElement) {
         var firstTicketElen = ticketElement[0];
       }
         var policeVerificationArray1 = firstTicketElen.policeVerificationArray;
         if(policeVerificationArray1){
            var policeVerificationArray = policeVerificationArray1[0].documents;
            var policeVerificationArray = policeVerificationArray;
          }
        }

      return policeVerificationArray;
  }

  myCarousel(){
    var curURl = location.pathname;
    if(curURl){
      var _id = curURl.split('/').pop();
    }
     var myArray = [];
    const postHandle = Meteor.subscribe('singleTicket',_id);
    const getTicket  = TicketMaster.findOne({"_id" : _id}); 
    if (getTicket) {
       var ticketElement = getTicket.ticketElement;
       if (ticketElement) {
         var firstTicketElen = ticketElement[0];
       }
         var policeVerificationArray1 = firstTicketElen.policeVerificationArray;
         var  policeVerificationArray = policeVerificationArray1[0].documents;
         var len = policeVerificationArray.length;
         if(policeVerificationArray){
          for(var i=0; i<policeVerificationArray.length;i++){
            myArray.push(
              <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3 carmodalDiv" key={i}>
                <div data-target="#lightbox" title="Click to verify police verification" data-toggle="modal" data-slide-to={i}>
                  <img src={policeVerificationArray[i].proofOfCurrentAddr} className="img-responsive addressImage"/>
                </div>
              </div>

              );
          }
          return myArray;
        
         }

    }

  }
  render(){
    if (!this.props.loading) {
     return(           
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="verifiedDocumentsWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="verifiedDocumentsHeader text-left col-lg-12 col-md-12 col-sm-12 col-xs-12">
             <h5 className="dataDetails">Document Attachment:</h5>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addressDashedLine">
          <div className="col-lg-10 col-lg-offset-1">
              {this.props.getTicket.verificationType === "education" ?
                  <div>
                     {this.props.getTicket.verificationData ?
                        this.props.verificationData.map((educationProof, index)=>{
                          return (
                             <div key={index}> 
                              {educationProof.proofOfDocument == '' ?
                                <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3 verifyDocWrap" >
                                  <div  title="No Documents Attached!">
                                   <img src="/images/assureid/noDocument.png" className="img-responsive addressImage"/>
                                  </div>
                                </div>
                                :
                                <div>
                                  <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3 verifyDocWrap" >
                                    <div data-toggle="modal" data-target={"showPermanentDocumnetsModal-"+index} onClick={this.showDocuments.bind(this)} title="Click to verify Document">
                                      { educationProof.fileExt == "png" || educationProof.fileExt == "jpg" || educationProof.fileExt == "jpeg" || educationProof.fileExt == "gif" ?
                                          <img src="/images/assureid/Photo-icon.png" className="img-responsive addressImage"/>
                                        :
                                        educationProof.fileExt == "pdf" ?
                                          <img src="/images/assureid/pdf.png" className="img-responsive addressImage"/>
                                        :
                                        ""
                                       }
                                    </div>
                                    <div className="text-center">
                                     <p>{educationProof.proofType}</p>
                                   </div>
                                  </div>
                                  <div className="modal fade" id={"showPermanentDocumnetsModal-"+index} role="dialog">
                                    <div className="modal-dialog">
                                      <div className="modal-content">
                                        <div className="modal-body">
                                          <button type="button" className="close" data-dismiss="modal">&times;</button>
                                          <div className="row">
                                            <div className="col-lg-12 col-md-12  col-sm-12 col-sm-12">
                                              <div className="col-lg-12 col-md-12 showAddrWrap">
                                                <h5>Employement</h5>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                  {this.props.verificationData[index].educationLevel},
                                                  {this.props.verificationData[index].educationQualification}
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                  {this.props.verificationData[index].specialization},
                                                  {this.props.verificationData[index].grades}
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                  {this.props.verificationData[index].educationMode},
                                                  {this.props.verificationData[index].dateAttendedTo},
                                                  {this.props.verificationData[index].collegeName},
                                                  {this.props.verificationData[index].university},<br />
                                                  {this.props.verificationData[index].collegeAddress} {this.props.verificationData[index].rollNo}
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                              <img src={educationProof.proofOfDocument}  className="col-lg-12 img-responsive addressImageModal showAddrImgWrap col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
                                            </div>
                                           {this.props.isRoleUser == true ?
                                              <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 otherInfoForm">
                                               {this.props.ticketStatus.status == "New" || this.props.ticketStatus.status == "ScreenRejected" && this.props.ticketStatus.role == "screening committee" ?
                                                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <button type="button" className="btn btn-danger col-lg-4 ApprovRejDoc rejectTicket acceptreject teammember" data-id={this.props.getTicket._id} onClick={this.hideShowRejectReason.bind()}>Reject</button>
                                                    <button type="button" className="btn btn-primary col-lg-4 ApprovRejDoc acceptTicket teammember acceptreject " data-id={this.props.getTicket._id} data-status="ScreenApproved" onClick={this.approvedCurDocument.bind()}>Approved</button>
                                                  </div>                                          
                                                  :
                                                  ""
                                                 }
                                                </div>
                                              :
                                              ""
                                            }
                                            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 showHideReasonWrap">
                                            <div className="col-lg-10  col-md-10  col-sm-12 col-xs-12 otherInfoForm">
                                                  <textarea className={"col-lg-12 col-md-12 col-sm-12 col-xs-12 rejectReason rejectReason-"+index} rows='2' placeholder="Enter Reject reason..."></textarea>
                                            </div>
                                            <div className="col-lg-2  col-md-2  col-sm-12 col-xs-12 rejectBtnWrap">
                                              <button className="col-lg-12 col-md-12 btn btn-primary rejectReasonBtn pull-left" data-status="ScreenedRejected" onClick={this.approvedCurDocument.bind(this)}>Submit</button>
                                            </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              }
                               
                             </div>
                            );
                        })
                        :
                        ""
                     }    
                   </div>
                  :
                  ""
              }

              {this.props.getTicket.verificationType === "permanentAddress" ?
                  <div>
                     {this.props.getTicket.verificationData ?
                        this.props.verificationData.map((permanentAddrProof, index)=>{
                          return (
                             <div key={index}>
                              {permanentAddrProof.proofOfDocument == '' ?
                               <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3 verifyDocWrap" >
                                  <div  title="No Documents Attached!">
                                   <img src="/images/assureid/noDocument.png" className="img-responsive addressImage"/>
                                  </div>
                                </div>
                                :
                                <div>
                                 <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3 verifyDocWrap" >
                                   <div data-toggle="modal" data-target={"showPermanentDocumnetsModal-"+index} onClick={this.showDocuments.bind(this)} title="Click to verify permanent address">
                                     { permanentAddrProof.fileExt == "png" || permanentAddrProof.fileExt == "jpg" || permanentAddrProof.fileExt == "jpeg" || permanentAddrProof.fileExt == "gif" ?
                                          <img src="/images/assureid/Photo-icon.png" className="img-responsive addressImage"/>
                                        :
                                        permanentAddrProof.fileExt == "pdf" ?
                                          <img src="/images/assureid/pdf.png" className="img-responsive addressImage"/>
                                        :
                                        ""
                                     }
                                    </div>
                                    <div className="text-center">
                                     <p>{permanentAddrProof.proofType}</p>
                                   </div>
                                 </div>
                                  <div className="modal fade" id={"showPermanentDocumnetsModal-"+index} role="dialog">
                                    <div className="modal-dialog">
                                      <div className="modal-content">
                                        <div className="modal-body">
                                          <button type="button" className="close" data-dismiss="modal">&times;</button>
                                          <div className="row">
                                            <div className="col-lg-12 col-md-12  col-sm-12 col-sm-12">
                                              <div className="col-lg-12 col-md-12 showAddrWrap">
                                                <h5>Permanent Address</h5>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                  {this.props.verificationData[index].line1},&nbsp;
                                                  {this.props.verificationData[index].line2}
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                  {this.props.verificationData[index].line3},&nbsp;
                                                  {this.props.verificationData[index].landmark}
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                  {this.props.verificationData[index].city},&nbsp;
                                                  {this.props.verificationData[index].state},&nbsp;
                                                  {this.props.verificationData[index].Country},&nbsp;
                                                  {this.props.verificationData[index].pincode},<br />
                                                  <label>Residing From : </label>{this.props.verificationData[index].residingFrom} <label>Residing Till : </label>{this.props.verificationData[index].residingTo}
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                              <img src={permanentAddrProof.proofOfDocument}  className="col-lg-12 img-responsive addressImageModal showAddrImgWrap col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
                                            </div>
                                            {this.props.docApproveRejectDiv == true ?
                                              <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 otherInfoForm">
                                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <button type="button" className="btn btn-danger rejectTicket teammember acceptreject" data-id={this.props.getTicket._id} onClick={this.hideShowRejectReason.bind()}>Reject</button>
                                                    <button type="button" className="btn btn-success acceptTicket acceptreject" data-id={this.props.getTicket._id} data-status="ScreenApproved" onClick={this.approvedCurDocument.bind()}>Approved</button>
                                                  </div>    
                                                  
                                              </div>
                                             :
                                              ""
                                             }
                                            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 showHideReasonWrap">
                                            <div className="col-lg-10  col-md-10  col-sm-12 col-xs-12 otherInfoForm">
                                                  <textarea className={"col-lg-12 col-md-12 col-sm-12 col-xs-12 rejectReason rejectReason-"+index} rows='2' placeholder="Enter Reject reason..."></textarea>
                                            </div>
                                            <div className="col-lg-2  col-md-2  col-sm-12 col-xs-12 rejectBtnWrap">
                                              <button className="col-lg-12 col-md-12 btn btn-primary rejectReasonBtn pull-left" data-status="ScreenRejected" onClick={this.approvedCurDocument.bind(this)}>Submit</button>
                                            </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              }
                             </div>
                            );
                        })
                        :
                        ""
                     }    
                   </div>
                  :
                  ""
              }
             
              {this.props.getTicket.verificationType === "currentAddress" ?
                  <div>
                     {this.props.getTicket.verificationData ?
                        this.props.verificationData.map((currentAddrProof, index)=>{
                          return (
                            <div key={index}>
                            {currentAddrProof.proofOfDocument == '' ?
                             <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3 verifyDocWrap" >
                                <div  title="No Documents Attached!">
                                 <img src="/images/assureid/noDocument.png" className="img-responsive addressImage"/>
                                </div>
                              </div>
                              :
                              <div>
                               <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3 verifyDocWrap" >
                                <div data-toggle="modal" data-target={"CurrentAddrDocumnetsModal-"+index} onClick={this.showDocuments.bind(this)} title="Click to verify current address" className="">
                                  { currentAddrProof.fileExt == "png" || currentAddrProof.fileExt == "jpg" || currentAddrProof.fileExt == "jpeg" || currentAddrProof.fileExt == "gif" ?
                                        <img src="/images/assureid/Photo-icon.png" className="img-responsive addressImage"/>
                                      :
                                      currentAddrProof.fileExt == "pdf" ?
                                        <img src="/images/assureid/pdf.png" className="img-responsive addressImage"/>
                                      :
                                      ""
                                   }
                                 </div>
                                  <div className="text-center">
                                     <p>{currentAddrProof.proofType}</p>
                                   </div>
                               </div>
                               <div className="modal fade" id={"CurrentAddrDocumnetsModal-"+index} role="dialog">
                                  <div className="modal-dialog">
                                    <div className="modal-content">
                                      <div className="modal-body">
                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                        <div className="row">
                                          <div className="col-lg-12 col-md-12  col-sm-12 col-sm-12">
                                              <div className="col-lg-12 col-md-12 showAddrWrap">
                                                <h5>Current Address</h5>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                  {this.props.verificationData[index].tempLine1},
                                                  {this.props.verificationData[index].tempLine2}
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                  {this.props.verificationData[index].tempLine3},
                                                  {this.props.verificationData[index].tempLandmark}
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                  {this.props.verificationData[index].tempCity},
                                                  {this.props.verificationData[index].tempState},
                                                  {this.props.verificationData[index].tempCountry},
                                                  {this.props.verificationData[index].tempPincode},<br />
                                                  Residing From : {this.props.verificationData[index].tempresidingFrom} Residing Till : {this.props.verificationData[index].tempresidingTo}
                                                </div>
                                              </div>
                                            </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 curImgWrap">
                                            <img src={currentAddrProof.proofOfDocument}  className="img-responsive addressImageModal col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
                                          </div>
                                         {this.props.isRoleUser == true ?
                                            <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 otherInfoForm">
                                             {this.props.ticketStatus.status == "New" || this.props.ticketStatus.status == "ScreenRejected" && this.props.ticketStatus.role == "screening committee" ?
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                  <button type="button" className="btn btn-danger rejectTicket teammember acceptreject" onClick={this.hideShowRejectCurReason.bind()}>Reject</button>
                                                  <button type="button" className="btn btn-primary acceptTicket acceptreject" data-status="ScreenApproved" onClick={this.approvedCurDocument.bind()}>Approved</button>
                                                </div>
                                                :
                                                ""
                                              } 
                                            </div>
                                            :
                                             ""
                                           }
                                            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 showHideReasonWrap">
                                            <div className="col-lg-10  col-md-10  col-sm-12 col-xs-12 otherInfoForm">
                                                  <textarea className={"col-lg-12 col-md-12 col-sm-12 col-xs-12 rejectReason rejectReason-"+index} rows='2' placeholder="Enter Reject reason..."></textarea>
                                            </div>
                                            <div className="col-lg-2  col-md-2  col-sm-12 col-xs-12 rejectBtnWrap">
                                              <button className="col-lg-12 col-md-12 btn btn-primary rejectReasonBtn pull-left"data-status="ScreenRejected"  onClick={this.approvedCurDocument.bind(this)}>Submit</button>
                                            </div>
                                            </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            }
                            
                            </div>

                            );
                        })
                        :
                        ""
                     }
                   </div>
                  :
                  ""
              }

               {this.props.getTicket.verificationType === "employement" ?
                  <div>
                     {this.props.getTicket.verificationData ?
                        this.props.verificationData.map((employementProof, index)=>{
                          return (
                            <div key={index}>
                            {employementProof.proofOfDocument == '' ?
                              <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3 verifyDocWrap">
                                <div  title="No Documents Attached!">
                                 <img src="/images/assureid/noDocument.png" className="img-responsive addressImage"/>
                                </div>
                              </div>
                              :
                              <div>
                               <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3 verifyDocWrap" >
                                <div data-toggle="modal" data-target={"CurrentAddrDocumnetsModal-"+index} onClick={this.showDocuments.bind(this)} title="Click to verify current address" className="">
                                  { employementProof.fileExt == "png" || employementProof.fileExt == "jpg" || employementProof.fileExt == "jpeg" || employementProof.fileExt == "gif" ?
                                      <img src="/images/assureid/Photo-icon.png" className="img-responsive addressImage"/>
                                    :
                                    employementProof.fileExt == "pdf" ?
                                      <img src="/images/assureid/pdf.png" className="img-responsive addressImage"/>
                                    :
                                    ""
                                   }
                                 </div>
                                 <div className="text-center">
                                   <p>{employementProof.proofType}</p>
                                 </div>
                               </div>
                               <div className="modal fade" id={"CurrentAddrDocumnetsModal-"+index} role="dialog">
                                  <div className="modal-dialog">
                                    <div className="modal-content">
                                      <div className="modal-body">
                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                        <div className="row">
                                          <div className="col-lg-12 col-md-12  col-sm-12 col-sm-12">
                                              <div className="col-lg-12 col-md-12 showAddrWrap">
                                                <h5>Education</h5>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                  {this.props.verificationData[index].nameOfEmployer},
                                                  {this.props.verificationData[index].employerAddress}
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                  {this.props.verificationData[index].contactNo},
                                                  {this.props.verificationData[index].employeeCode}
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                  {this.props.verificationData[index].designation},
                                                  {this.props.verificationData[index].department},
                                                  {this.props.verificationData[index].employmentFrom},
                                                  {this.props.verificationData[index].employmentTo},<br />
                                                  {this.props.verificationData[index].typeOfEmployement}, {this.props.verificationData[index].dutiesAndResponsibilites}<br/>
                                                  {this.props.verificationData[index].reportingManagerNm}, {this.props.verificationData[index].prevDesignation}
                                                </div>
                                              </div>
                                            </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 curImgWrap">
                                            <img src={employementProof.proofOfDocument}  className="img-responsive addressImageModal col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
                                          </div>
                                          {this.props.isRoleUser == true ?
                                            <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 otherInfoForm">
                                              {this.props.ticketStatus.status == "New" || this.props.ticketStatus.status == "ScreenRejected" && this.props.ticketStatus.role == "screening committee" ?
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                  <button type="button" className="btn btn-danger rejectTicket teammember acceptreject"  onClick={this.hideShowRejectCurReason.bind()}>Reject</button>
                                                  <button type="button" className="btn btn-primary acceptTicket acceptreject" data-status="Approved" onClick={this.approvedCurDocument.bind()}>Approved</button>
                                                    
                                                </div>
                                                :
                                                ""
                                              }   
                                            </div>
                                            :
                                              ""
                                            }
                                            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 showHideReasonWrap">
                                            <div className="col-lg-10  col-md-10  col-sm-12 col-xs-12 otherInfoForm">
                                                  <textarea className={"col-lg-12 col-md-12 col-sm-12 col-xs-12 rejectReason rejectReason-"+index} rows='2' placeholder="Enter Reject reason..."></textarea>
                                            </div>
                                            <div className="col-lg-2  col-md-2  col-sm-12 col-xs-12 rejectBtnWrap">
                                              <button className="col-lg-12 col-md-12 btn btn-primary rejectReasonBtn pull-left" data-status="ScreenRejected" onClick={this.approvedCurDocument.bind(this)}>Submit</button>
                                            </div>
                                            </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            }
                            </div>
                            );
                        })
                        :
                        ""
                     }
                   </div>
                  :
                  ""
               }

               {this.props.getTicket.verificationType === "certificates" ?
                  <div>
                     {this.props.getTicket.verificationData ?
                        this.props.verificationData.map((certificatesProof, index)=>{
                          return (
                            <div key={index}>
                              {certificatesProof.proofOfDocument == '' ?
                               <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3 verifyDocWrap" >
                                  <div  title="No Documents Attached!">
                                   <img src="/images/assureid/noDocument.png" className="img-responsive addressImage"/>
                                  </div>
                                </div>
                                :
                               <div>
                                 <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3 verifyDocWrap" >
                                  <div data-toggle="modal" data-target={"CurrentAddrDocumnetsModal-"+index} onClick={this.showDocuments.bind(this)} title="Click to verify Document" className="">
                                    { certificatesProof.fileExt == "png" || certificatesProof.fileExt == "jpg" || certificatesProof.fileExt == "jpeg" || certificatesProof.fileExt == "gif" ?
                                      <img src="/images/assureid/Photo-icon.png" className="img-responsive addressImage"/>
                                      :
                                      certificatesProof.fileExt == "pdf" ?
                                        <img src="/images/assureid/pdf.png" className="img-responsive addressImage"/>
                                      :
                                      ""
                                   }
                                   </div>
                                   <div className="text-center">
                                    <p>{certificatesProof.proofType}</p>
                                   </div>
                                 </div>
                                <div className="modal fade" id={"CurrentAddrDocumnetsModal-"+index} role="dialog">
                                  <div className="modal-dialog">
                                    <div className="modal-content">
                                      <div className="modal-body">
                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                        <div className="row">
                                          <div className="col-lg-12 col-md-12  col-sm-12 col-sm-12">
                                              <div className="col-lg-12 col-md-12 showAddrWrap">
                                                <h5>Certificates</h5>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                  {this.props.verificationData[index].certificateName},
                                                  {this.props.verificationData[index].issuedBy}
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                  {this.props.verificationData[index].certificatedOn},
                                                  {this.props.verificationData[index].validTill}
                                                </div>
                                               
                                              </div>
                                            </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 curImgWrap">
                                            <img src={certificatesProof.proofOfDocument}  className="img-responsive addressImageModal col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
                                          </div>
                                          {this.props.isRoleUser == true ?
                                            <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 otherInfoForm">
                                             {this.props.ticketStatus.status == "New" || this.props.ticketStatus.status == "ScreenRejected" && this.props.ticketStatus.role == "screening committee" ?
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <button type="button" className="btn btn-info rejectTicket acceptreject"  onClick={this.hideShowRejectCurReason.bind()}>Reject</button>                                                
                                                    <button type="button" className="btn btn-info acceptTicket acceptreject" data-status="ScreenApproved" onClick={this.approvedCurDocument.bind()}>Approved</button>
                                                    {/* <button type="button" className="btn btn-info rejectTicket acceptreject"  onClick={this.hideShowRejectCurReason.bind()}>Reject</button> */}
                                                </div>
                                              :
                                              ""
                                              }
                                            </div>
                                             :
                                              ""
                                            }
                                            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 showHideReasonWrap">
                                            <div className="col-lg-10  col-md-10  col-sm-12 col-xs-12 otherInfoForm">
                                                  <textarea className={"col-lg-12 col-md-12 col-sm-12 col-xs-12 rejectReason rejectReason-"+index} rows='2' placeholder="Enter Reject reason..."></textarea>
                                            </div>
                                            <div className="col-lg-2  col-md-2  col-sm-12 col-xs-12 rejectBtnWrap">
                                              <button className="col-lg-12 col-md-12 btn btn-primary rejectReasonBtn pull-left" data-status="ScreenRejected"  onClick={this.approvedCurDocument.bind(this)}>Submit</button>
                                            </div>
                                            </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              }
                            </div>
                            );
                        })
                        :
                        ""
                     }
                   </div>
                  :
                  ""
               }

               {this.props.getTicket.verificationType === "professionalEducation" ?
                  <div>
                     {this.props.getTicket.verificationData ?
                        this.props.verificationData.map((professionalEducationProof, index)=>{
                          return (
                            <div key={index}>
                             {professionalEducationProof.proofOfDocument == '' ?
                               <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3 verifyDocWrap" >
                                  <div  title="No Documents Attached!">
                                   <img src="/images/assureid/noDocument.png" className="img-responsive addressImage"/>
                                  </div>
                                </div>
                              :
                             <div>
                               <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3 verifyDocWrap" >
                                <div data-toggle="modal" data-target={"CurrentAddrDocumnetsModal-"+index} onClick={this.showDocuments.bind(this)} title="Click to verify current address" className="">
                                  { professionalEducationProof.fileExt == "png" || professionalEducationProof.fileExt == "jpg" || professionalEducationProof.fileExt == "jpeg" || professionalEducationProof.fileExt == "gif" ?
                                      <img src="/images/assureid/Photo-icon.png" className="img-responsive addressImage"/>
                                      :
                                      professionalEducationProof.fileExt == "pdf" ?
                                        <img src="/images/assureid/pdf.png" className="img-responsive addressImage"/>
                                      :
                                      ""
                                   }
                                 </div>
                                 <div className="text-center">
                                  <p>{professionalEducationProof.proofType}</p>
                                 </div>
                               </div>
                               <div className="modal fade" id={"CurrentAddrDocumnetsModal-"+index} role="dialog">
                                  <div className="modal-dialog">
                                    <div className="modal-content">
                                      <div className="modal-body">
                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                        <div className="row">
                                          <div className="col-lg-12 col-md-12  col-sm-12 col-sm-12">
                                              <div className="col-lg-12 col-md-12 showAddrWrap">
                                                <h5>professional Education</h5>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                  {this.props.verificationData[index].professionalQualification},
                                                  {this.props.verificationData[index].registrationNo}
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                  {this.props.verificationData[index].dateOfQualification},
                                                  {this.props.verificationData[index].professionalRollNo}
                                                  {this.props.verificationData[index].qualifyingBodyNm}
                                                </div>
                                               
                                              </div>
                                            </div>
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 curImgWrap">
                                            <img src={professionalEducationProof.proofOfDocument}  className="img-responsive addressImageModal col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
                                          </div>
                                          {this.props.isRoleUser == true ?
                                            <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 otherInfoForm">
                                                { this.props.ticketStatus ?
                                                  this.props.ticketStatus.status == "New" || this.props.ticketStatus.status == "ScreenRejected" && this.props.ticketStatus.role == "screening committee" ?
                                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                      <button type="button" className="btn btn-info rejectTicket acceptreject"  onClick={this.hideShowRejectCurReason.bind()}>Reject</button>                                                    
                                                      <button type="button" className="btn btn-info acceptTicket acceptreject" data-status="ScreenApproved" onClick={this.approvedCurDocument.bind()}>Approved</button>
                                                  </div>
                                                  :
                                                  ""
                                                 :
                                                 ""
                                                }    
                                              </div>
                                              :
                                              ""
                                            }
                                            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 showHideReasonWrap">
                                            <div className="col-lg-10  col-md-10  col-sm-12 col-xs-12 otherInfoForm">
                                                  <textarea className={"col-lg-12 col-md-12 col-sm-12 col-xs-12 rejectReason rejectReason-"+index} rows='2' placeholder="Enter Reject reason..."></textarea>
                                            </div>
                                            <div className="col-lg-2  col-md-2  col-sm-12 col-xs-12 rejectBtnWrap">
                                              <button className="col-lg-12 col-md-12 btn btn-primary rejectReasonBtn pull-left" data-status="ScreenRejected" onClick={this.approvedCurDocument.bind(this)}>Submit</button>
                                            </div>
                                            </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              }
                            </div>
                            );
                        })
                        :
                        ""
                     }
                   </div>
                  :
                  ""
               }
           
              {this.props.getTicket.verificationType === "PoliceVerification" ?
                 <div> {this.myCarousel()}
                  <div className="col-lg-12 col-md-12">
                     <div className="modal fade and carousel slide carouselSec" id="lightbox">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-body myModalBody">
                           <button type="button" className="close carClose" data-dismiss="modal">&times;</button>
                            <div id="lightbox" className="carousel slide ECSlideShow" data-ride="carousel" data-interval="false">
                              <div className="carousel-inner">
                              { this.showallSlides().map( (slides,index)=>{
                                if(index == 0){
                                  var activeStatus = 'active';
                                }else{
                                  var activeStatus = '';
                                  var hideSlideDetail = "hideSlidDetails";
                                }
                                 
                                return (
                                      <div className={"curImgWrap item "+ activeStatus} key={index}>
                                        <div className="col-lg-12 col-md-12">
                                          <div className="col-lg-12 col-md-12 showAddrWrapCarousel">
                                              {slides.policeStation}
                                          </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                          <img src={slides.proofOfCurrentAddr} className="col-lg-12 col-sm-12 col-md-12 col-xs-12 bannerimg"/>
                                        </div>
                                       {this.props.isRoleUser == true ?
                                         <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 otherInfoForm verCarouselWrap">
                                            {this.props.ticketStatus.status == "New" || this.props.ticketStatus.status == "ScreenRejected" && this.props.ticketStatus.role == "screening committee" ?
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <button type="button" className="btn btn-info rejectTicket acceptreject" onClick={this.hideShowRejectReason.bind()}>Reject</button>                                              
                                                <a href="#lightbox" data-slide="next" ><button type="button" className="btn btn-info acceptTicket acceptreject" name={index} onClick={this.approvedCurDocument.bind()}>Approved</button></a>
                                            </div>
                                            :
                                            ""
                                          }  
                                          </div>
                                          :
                                          ""
                                        }
                                          <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 showHideReasonWrap">
                                          <div className="col-lg-10  col-md-10  col-sm-12 col-xs-12 otherInfoForm">
                                                <textarea className={"col-lg-12 col-md-12 col-sm-12 col-xs-12 rejectReason rejectReason-"+index} rows='2' placeholder="Enter Reject reason..."></textarea>
                                          </div>
                                          <div className="col-lg-2  col-md-2  col-sm-12 col-xs-12 rejectBtnWrap">
                                            <a href="#lightbox" data-slide="next" ><button className="col-lg-12 col-md-12 btn btn-primary rejectReasonBtn pull-left" id={index} onClick={this.submitRejectReasonPV.bind(this)}>Submit</button></a>
                                          </div>
                                          </div>
                                      </div>
                                  );
                                })
                              }
                              </div>
                              <a className="left carousel-control" href="#lightbox" data-slide="prev">
                                <span className="glyphicon glyphicon-chevron-left"></span>
                                <span className="sr-only">Previous</span>
                              </a>
                              <a className="right carousel-control" href="#lightbox" data-slide="next">
                                <span className="glyphicon glyphicon-chevron-right"></span>
                                <span className="sr-only">Next</span>
                              </a>
                            </div>
                            <a className="left carousel-control" href="#lightbox" role="button" data-slide="prev">
                              <span className="glyphicon glyphicon-chevron-left"></span>
                            </a>
                            <a className="right carousel-control" href="#lightbox" role="button" data-slide="next">
                              <span className="glyphicon glyphicon-chevron-right"></span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>    
                 </div>
                  :
                  ""
              }
          </div>
          </div>
          </div>
        </div>   
      ); 
   }else{
    return(
       <span>Loading</span>
      );
   }
  
  }
}
verifiedDocumentsContainer = withTracker(props => { 
    var _id = props.ticketId;
    const postHandle = Meteor.subscribe('singleTicket',_id);
    const companyHandle = Meteor.subscribe('companyData');
    const ticketBucket = Meteor.subscribe("allTicketBucket");
    const getTicket   = TicketMaster.findOne({"_id" : _id}) || {};
    if (getTicket) {
         var verificationData = [getTicket.verificationData];
         if(!verificationData){
          var verificationData = '';
         }
         if (getTicket.ticketStatus) {
          var ticketStatus = getTicket.ticketStatus[0];
         }
         var length = getTicket.ticketElement.length;
    }
     
    const loading = !postHandle.ready() &&  !companyHandle.ready() && !ticketBucket.ready();
    
    if((Roles.userIsInRole(Meteor.userId(), ['screening committee'],))){
      var docApproveRejectDiv = true;
    }else{
      var docApproveRejectDiv = false;
    }
    

    // this.props.ticketStatus.status == "New" || this.props.ticketStatus.status == "ScreenRejected" && this.props.ticketStatus.role == "screening committee"
    // if ((Roles.userIsInRole(Meteor.userId(), ['screening committee'],))&&(getTicket.ticketElement[length-1].allocatedToUserid == Meteor.userId())) {
    //    var isRoleUser = true;
    //  }else{
    //    var isRoleUser = false;
    //  }
     // console.log("isRoleUser",isRoleUser);
    // if(_id){
      return {
          loading  : loading,
          getTicket : getTicket,
          verificationData,
          docApproveRejectDiv  : docApproveRejectDiv,
          ticketStatus : ticketStatus,
          // curAddrArray,
          // policeVerificationArray,
          // firstTicketElen : firstTicketElen,
      };
})(VerifiedDocuments);
export default verifiedDocumentsContainer;