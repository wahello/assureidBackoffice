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
import { UserProfile } from '/imports/website/forms/api/userProfile.js';
import '../notification/components/SendMailnNotification.jsx';
class VerifiedDocuments extends TrackerReact(Component){
  constructor(props){
    super(props);
    this.state = {
      "subscription" : {
        "allTickets" : Meteor.subscribe("allTickets"),
        "userfunction" : Meteor.subscribe('userfunction'),
      },
      'showRejectBox':"N",
    }
  }
  showDocuments(event){
    event.preventDefault();
    var idVal= $(event.currentTarget).attr('data-target');
    $('#'+idVal).modal('show');
    // Session.set('editExp','editexperienceinfo');
  }

//hideShowRejectReason function for show reason block click on Reject button
  hideShowRejectReason(){
    // console.log("Inside showRejectBox");
    // this.setState({"showRejectBox":"Y"});
    
    $('.showHideReasonWrap').toggleClass('showReasonSection');
  }
// hideShowRejectReason function for show reason block click on Reject button
  hideShowRejectCurReason(){
    $('.showHideReasonWrap').toggleClass('showReasonSection');
  }
  getRole(role) {
    return role != "backofficestaff";
  }
  //show data according to service
  showData(verificationType,verificationData){
    switch(verificationType){
      case 'permanentAddress' :
        return(
          <div className="col-lg-12 col-md-12 showAddrWrap">
            <h5 className ="documentHead">Permanent Address</h5>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {verificationData.line1 ? verificationData.line1 : ''},
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {verificationData.line2 ? verificationData.line2 : ''},
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {verificationData.line3 ? verificationData.line3 : ''},
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {verificationData.landmark ? verificationData.landmark : ''},
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {verificationData.city ? verificationData.city+',' : ''}&nbsp;
              {verificationData.state ? verificationData.state+',' : ''}&nbsp;
              {verificationData.Country ? verificationData.Country+',' : ''}&nbsp;
              {verificationData.pincode ? verificationData.pincode+',' : ''},<br />
              <label><b>Residing From :</b> </label>{verificationData.residingFrom} <label><b>Residing Till :</b> </label>{verificationData.residingTo}
            </div>
          </div>
        );
        break;
      case 'currentAddress' :
        return(
          <div className="col-lg-12 col-md-12 showAddrWrap">
            <h5 className ="documentHead">Current Address</h5>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {verificationData.tempLine1 ? verificationData.tempLine1 : ''},
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {verificationData.tempLine2 ? verificationData.tempLine2 : ''},
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {verificationData.tempLine3 ? verificationData.tempLine3 : ''},
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {verificationData.tempLandmark ? verificationData.temLandmark : ''},
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {verificationData.tempCity ? verificationData.tempCity+',' : ''}&nbsp;
              {verificationData.tempState ? verificationData.tempState+',' : ''}&nbsp;
              {verificationData.tempCountry ? verificationData.tempCountry+',' : ''}&nbsp;
              {verificationData.tempPincode ? verificationData.tempPincode+',' : ''},<br />
              <label><b>Residing From :</b> </label>{verificationData.tempresidingFrom} <label><b>Residing Till :</b> </label>{verificationData.tempresidingTo}
            </div>
          </div>
        );
        break;
      case 'employement' :
        return(
          <div className="col-lg-12 col-md-12 showAddrWrap">
            <h5 className ="documentHead">Employment</h5>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <label><b>Employer :</b> </label>{verificationData.nameOfEmployer ? verificationData.nameOfEmployer : "-"},<br />
              <label><b>Address :</b> </label>{verificationData.employerAddress ? verificationData.employerAddress: "-"}<br />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <label><b>Contact No. :</b>&nbsp; </label>{verificationData.contactNo ? verificationData.contactNo : "-"}.<br />
              <label><b>Employee Id :</b>&nbsp; </label>{verificationData.employeeCode ? verificationData.employeeCode : "-"}<br />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <label><b>Designation :</b>&nbsp; </label>{verificationData.designation ? verificationData.designation :"-"},<br />
              <label><b>Department :</b> &nbsp;</label>{verificationData.department ? verificationData.department :"-"},<br />
              <label><b>Employment From :</b> &nbsp;</label>{verificationData.employmentFrom ? verificationData.employmentFrom: "-"},<br />
              <label><b>Employment To :</b> &nbsp;</label>{verificationData.employmentTo ? verificationData.employmentTo : "-"},<br />
              <label><b>Type Of Employement :</b> &nbsp;</label>{verificationData.typeOfEmployement? verificationData.typeOfEmployement : "-"},<br /> 
              <label><b>Duties And Responsibilites :</b> &nbsp;</label>{verificationData.dutiesAndResponsibilites? verificationData.dutiesAndResponsibilites :" - "}<br/>
              <label><b>Reporting Manager :</b> &nbsp;</label>{verificationData.reportingManagerNm ? verificationData.reportingManagerNm : " - "},<br />
              <label><b>Previous Designation :</b> &nbsp;</label>{verificationData.prevDesignation ? verificationData.prevDesignation : "-"}<br />
            </div>
          </div>
        );
        break;
      case 'certificates' :
        return(
          <div className="col-lg-12 col-md-12 showAddrWrap">
            <h5 className ="documentHead">Certificates</h5>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {this.props.verificationData[index].certificateName ? this.props.verificationData[index].certificateName : " "},<br />
              {this.props.verificationData[index].issuedBy ? this.props.verificationData[index].issuedBy : ""}<br />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {this.props.verificationData[index].certificatedOn ? this.props.verificationData[index].certificatedOn : ""},<br />
              {this.props.verificationData[index].validTill ? this.props.verificationData[index].validTill : ""}<br />
            </div>
          </div>
        );
        break;
      case 'professionalEducation' :
        return(
          <div className="col-lg-12 col-md-12 showAddrWrap">
            <h5 className ="documentHead">professional Education</h5>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {verificationData.professionalQualification ? verificationData.professionalQualification : ""},<br />
              {verificationData.registrationNo ? verificationData.registrationNo : "" }<br />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {verificationData.dateOfQualification ? verificationData.dateOfQualification : ""},<br />
              {verificationData.professionalRollNo ? verificationData.professionalRollNo : ""}<br />
              {verificationData.qualifyingBodyNm ? verificationData.qualifyingBodyNm : ""}<br />
            </div>
            
          </div>
        );
        break;
      case 'education' :
        return(
          <div className="col-lg-12 col-md-12 showAddrWrap">
            <h5 className ="documentHead">Education</h5>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {verificationData.educationLevel ? verificationData.educationLevel : ""},<br />
              {verificationData.educationQualification ? verificationData.educationQualification:""}<br />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {verificationData.specialization ? verificationData.specialization: ""},<br />
              {verificationData.grades ? verificationData.grades: ""}<br />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {verificationData.educationMode}{ verificationData.educationMode ? "," : ""}<br />
              {verificationData.dateAttendedTo}{ verificationData.dateAttendedTo ? "," : ""}<br />
              {verificationData.collegeName}{ verificationData.collegeName ? "," : ""}<br />
              {verificationData.university}{ verificationData.university ? "," : ""}<br />
              {verificationData.collegeAddress} {verificationData.rollNo}<br />
            </div>
          </div>
        );
        break;
      case 'PoliceVerification' :
        return(
          <div>PoliceVerification</div>
        );
        break;
    }
  }
/*This function execute when document get approved as well as rejected. */
  approvedCurDocument(event){
    event.preventDefault();
    var curURl = location.pathname;
    if(curURl){
      var ticketId = curURl.split('/').pop();
    }
    var status = $(event.currentTarget).attr('data-status');
    var remark = $('.rejectReason-0').val();
  
   
    var ticketObj = TicketMaster.findOne({'_id':ticketId});                       
    if(ticketObj){
      var insertData = {
        "userId"              : Meteor.userId(),
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
      
      if(remark!="" && status != 'ScreenRejected'){
          $('.close').click();
          $('.showHideReasonWrap').removeClass('showReasonSection');    
          Meteor.call('genericUpdateTicketMasterElement',ticketId,insertData);
      }else if(status == 'ScreenRejected' && remark!=""){
        $('.close').click();        
        $('.showHideReasonWrap').removeClass('showReasonSection');            
        Meteor.call('genericUpdateTicketMasterElement',ticketId,insertData);
        
      }else{
          swal({
            position: 'top-right',
            type: 'error',
            title: 'Please Add Remark',
            showConfirmButton: false,
            timer: 1500
        });
      }
      // $('.showHideReasonWrap').toggleClass('showReasonSection');
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
              {this.props.getTicket.verificationDocument.length > 0 ?
                this.props.getTicket.verificationDocument.map((verificationDocument,index)=>{
                  return(
                    <div key={index}>
                      {verificationDocument.proofOfDocument ?
                        <div>
                          <div className="col-lg-12 col-md-12 col-sm-3 col-xs-3 verifyDocWrap" >
                            <div data-toggle="modal" data-target={"showProofOfDocumentModal-"+index} onClick={this.showDocuments.bind(this)} title="Click to verify Document">
                              { verificationDocument.fileExt == "png" || verificationDocument.fileExt == "jpg" || verificationDocument.fileExt == "jpeg" || verificationDocument.fileExt == "gif" ?
                                  <img src="/images/assureid/Photo-icon.png" className=" col-lg-offset-1 img-responsive addressImage"/>
                                :
                                verificationDocument.fileExt == "pdf" ?
                                  <img src="/images/assureid/pdf.png" className="img-responsive col-lg-offset-1 addressImage"/>
                                :
                                ""
                              }
                              <div className="text-center col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <p>{verificationDocument.fileName}</p>
                              </div>
                            </div>
                          </div>
                          <div className="modal fade" id={"showProofOfDocumentModal-"+index} role="dialog">
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-body">
                                  <button type="button" className="close documentClose" data-dismiss="modal">&times;</button>
                                  <div className="row">
                                    <div className="col-lg-12 col-md-12  col-sm-12 col-sm-12">
                                        {this.showData(this.props.getTicket.verificationType,this.props.getTicket.verificationData)}
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                      <img src={verificationDocument.proofOfDocument}  className="col-lg-12 img-responsive addressImageModal showAddrImgWrap col-lg-12 col-md-12 col-sm-12 col-xs-12"/>
                                    </div>
                                    {this.props.docApproveRejectDiv == true ?
                                      <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-12 col-xs-12 otherInfoForm">
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <button type="button" className="btn btn-danger rejectTicket teammember acceptreject" data-id={this.props.getTicket._id} onClick={this.hideShowRejectReason.bind()}>Reject</button>
                                            <button type="button" className="btn btn-success acceptTicket acceptreject" data-id={this.props.getTicket._id} data-status="ScreenApproved" onClick={this.approvedCurDocument.bind()}>Approve</button>
                                          </div>    
                                      </div>
                                      :
                                      ""
                                      }
                                      {/* { this.state.showRejectBox =='Y'? */}
                                      <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 showHideReasonWrap">
                                      <div className="col-lg-10  col-md-10  col-sm-12 col-xs-12 otherInfoForm">
                                            <textarea className={"col-lg-12 col-md-12 col-sm-12 col-xs-12 rejectReason required rejectReason-"+index} rows='2' placeholder="Enter Reject reason..."></textarea>
                                      </div>
                                      <div className="col-lg-2  col-md-2  col-sm-12 col-xs-12 rejectBtnWrap">
                                        <button className="col-lg-12 col-md-12 btn btn-primary rejectReasonBtn pull-left" data-status="ScreenRejected" onClick={this.approvedCurDocument.bind(this)}>Submit</button>
                                      </div>
                                      </div>
                                      {/* :
                                      ""
                                      } */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      :
                        <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3 verifyDocWrap" >
                            <div  title="No Documents Attached!">
                            <img src="/images/assureid/noDocument.png" className="img-responsive addressImage"/>
                          </div>
                        </div>
                      }
                    </div>
                  )
                })  
              : 
              ''
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
    const getTicket   = TicketMaster.findOne({"_id" : _id}) || {};
    var roles = Meteor.user().roles;
    var reqRole = roles.find(function (obj) { return obj != 'backofficestaff' });
    // console.log('reqRole ',reqRole);
    var userId = Meteor.userId();
    if(userId){
      var ticketElement = getTicket.ticketElement;
      if(ticketElement){
        var docApproveRejectData = ticketElement.find(function(obj){return (obj.allocatedToUserid == userId && obj.roleStatus == 'NewScrAllocated' ) ? obj : false});
        if(docApproveRejectData){
          var docApproveRejectDiv = true;
        }else{
          var docApproveRejectDiv = false;
        }
      }
    }
    const loading = !postHandle.ready() ;
    return {
        loading,
        getTicket,
        docApproveRejectDiv,
    };
})(VerifiedDocuments);
export default verifiedDocumentsContainer;