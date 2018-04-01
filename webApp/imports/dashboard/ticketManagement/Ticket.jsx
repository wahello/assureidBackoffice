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
import UserInformation from './UserInformation.jsx';
import { TicketMaster } from '../../website/ServiceProcess/api/TicketMaster.js';
import { TempTicketReport } from "/imports/dashboard/ticketManagement/api/TempUpload.js";
import  ServiceInformation from './ServiceInformation.jsx';
import VerifiedDocuments from './VerifiedDocuments.jsx';
import ScreeningCommittee from '/imports/dashboard/ticketManagement/ScreeningCommittee.jsx';
import TicketDocumentDetails from '/imports/dashboard/ticketManagement/TicketDocumentDetail.jsx';
import RoleTicketStatus from './RoleTicketStatus.jsx';
import DocumentStatus from './DocumentStatus.jsx';
import AddImagesVideo from './AddImagesVideo.jsx';
import VerifyDetailsDocument from './VerifyDetailsDocument.jsx';
import { UserProfile } from '../../website/forms/api/userProfile.js';
import SubmittedDocuments from './SubmittedDocuments.jsx';
import UploadReport from './UploadReport.jsx';



class Ticket extends TrackerReact(Component){
  constructor(props){
    super(props);
    this.state = {
      'userDetails': {},
      "userRoleIn": Meteor.userId(),
      "showRejectBox" : 'N',
    }    
  }
  componentWillReceiveProps(nextProps){

    if(!nextProps.loading){
      this.setState({
        'userDetails':nextProps.user,
      });
    }    
  }
  viewprofile(event){
    event.preventDefault();
    var path = $(event.target).attr('data-userid');
    browserHistory.replace('/admin/viewProfile/'+path);
  }
  getRole(role) {
    return role != "backofficestaff";
  }
  showRejectBoxState(){
    this.setState({"showRejectBox" : 'Y'});
  }
  getRejectBox(){
    console.log('showRejectBox: ' + this.state.showRejectBox);
    // var roleStatus = $(event.currentTarget).attr('data-roleStatus');
    return(
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <textarea rows="3" cols="60" className="col-lg-6 col-lg-offset-2" id="rejectReason"/>
        <button onClick={this.rejectButton.bind(this)} 
          id="rejectButton" 
          // data-roleStatus = {roleStatus}
          // data-msg = {$(event.currentTarget).attr('data-msg')}
          className="col-lg-2 col-lg-offset-2"> 
          Submit </button>
      </div>
    )
  }
  rejectButton(event){
    console.log('submitReject clicked');
    event.preventDefault();
    var ticketId = this.props.ticketId;
    var elementLength = this.props.getTicket.ticketElement.length;
    if(this.props.getTicket.ticketElement[elementLength-1].roleStatus == 'Assign'){
      var roleStatus          = $('#TMRejectTicket').attr('data-roleStatus');
      var msg                 = $('#TMRejectTicket').attr('data-msg');
      var allocatedToUserid   = this.props.getTicket.ticketElement[elementLength-1].userid;
      var allocatedToUserName = this.props.getTicket.ticketElement[elementLength-1].userName;
    }else if(this.props.getTicket.ticketElement[elementLength-1].roleStatus == 'ProofSubmit'){
      var roleStatus          = $('#TMProofReject').attr('data-roleStatus');
      var msg                 = $('#TMProofReject').attr('data-msg');
      var allocatedToUserid   = this.props.getTicket.ticketElement[elementLength-1].allocatedToUserid;
      var allocatedToUserName = this.props.getTicket.ticketElement[elementLength-1].allocatedToUserName;
    }else if(this.props.getTicket.ticketElement[elementLength-1].roleStatus == 'VerificationPassQTMAllocated'){
      var roleStatus          = $('#QTMRejectTicket').attr('data-roleStatus');
      var msg                 = $('#QTMRejectTicket').attr('data-msg'); 
      var allocatedToUserid   = this.props.getTicket.ticketElement[elementLength-2].allocatedToUserid;
      var allocatedToUserName = this.props.getTicket.ticketElement[elementLength-2].allocatedToUserName;
    }else if(this.props.getTicket.ticketElement[elementLength-1].roleStatus == 'VerificationPassQTLAllocated'){
      var roleStatus          = $('#QTLRejectTicket').attr('data-roleStatus');
      var msg                 = $('#QTLRejectTicket').attr('data-msg'); 
      var allocatedToUserid   = this.props.getTicket.ticketElement[elementLength-2].allocatedToUserid;
      var allocatedToUserName = this.props.getTicket.ticketElement[elementLength-2].allocatedToUserName;
    }
    var insertData = {
      "userid"              : Meteor.userId(),
      "userName"            : Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname,
      "allocatedToUserid"   : allocatedToUserid,
      "allocatedToUserName" : allocatedToUserName,
      "role"                : Meteor.user().roles.find(this.getRole),
      "roleStatus"          : roleStatus,
      "msg"                 : msg,
      "remark"              : $('#rejectReason').val(),
      "createdAt"           : new Date()
    }
    // console.log('insertData ',insertData);
    Meteor.call('genericUpdateTicketMasterElement',this.props.ticketId,insertData);
    this.setState({"showRejectBox" : 'N'});
  }
  /**================= Team Leader Allocate To Team Member =================== */
  allocateToTeamMember(event){
    event.preventDefault();
    var userName = this.refs.allocateToName.value;
    var userId  = $(":selected").attr("id");
    console.log("userId :"+userId)
    var ticketId = this.props.ticketId; 
    Meteor.call('allocateToTeamMember',ticketId,userId,userName,(error,result)=>{
    });
  }
  changeTMStatus(event){
    var ticketId = this.props.ticketId;
    var status      = $(event.currentTarget).attr('data-status');
    Meteor.call('updateTMStatus',ticketId,status);
  }  
  /*Get radio value and display dropdown and textbox*/
  getRadioValue(event){
    event.preventDefault();
    var radioValue = $(event.currentTarget).val();
    this.setState({
        'radioState':radioValue,
    });
  }
  showBAFEList(role){
    var teammemberDetails = Meteor.users.find({"roles": {$in:[role]}}).fetch();
    return teammemberDetails;
  }
  uploadDocsDiv(event){
    event.preventDefault();
    $('#AddImagesVideo').css({"display" : "block"});
    $(event.currentTarget).css({"display" : "none"});
  }

   handleReportUpload(event){
        event.preventDefault();
        let self = this;
        if (event.currentTarget.files && event.currentTarget.files[0]) { 
        var dataImg =event.currentTarget.files[0];
            if(dataImg){      
            var reader = new FileReader();       
            reader.onload = function (e) {          
            };      
            reader.readAsDataURL(event.currentTarget.files[0]);      
            var file = event.currentTarget.files[0];
            if (file) {         
                    addReportFunction(file,self);       
                }
            };
            } else { 
            swal({    
                position: 'top-right',     
                type: 'error',    
                title: 'Please select Video',       
                showConfirmButton: false,      
                timer: 1500      
            });   
        }
    }

  approveButton(event){
    event.preventDefault();
  
    var ticketId = this.props.ticketId;
    var elementLength = this.props.getTicket.ticketElement.length;
    var insertData = {
      "userid"              : Meteor.userId(),
      "userName"            : Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname,
      "role"                : Meteor.user().roles.find(this.getRole),
      "roleStatus"          : $(event.currentTarget).attr('data-roleStatus'),
      "msg"                 : $(event.currentTarget).attr('data-msg'),
      "createdAt"           : new Date()
    }
  
    // if(!this.props.loading){
      var reportLinkDetails = TempTicketReport.findOne({},{sort:{'createdAt':-1}});   
      var reportLink = reportLinkDetails.ReportLink;

    // }

    var memberid ='';
    var memberName = '';
    if(this.props.getTicket.ticketElement[elementLength-1].roleStatus == 'screenTLAllocated' || 
       this.props.getTicket.ticketElement[elementLength-1].roleStatus == 'AssignReject'){
        insertData.allocatedToUserid = $("#selectTMMember option:selected").val();
        insertData.allocatedToUserName = $("#selectTMMember option:selected").text();
    }else if(this.props.getTicket.ticketElement[elementLength-1].roleStatus == 'Assign' || 
              this.props.getTicket.ticketElement[elementLength-1].roleStatus == 'VerificationPass'){
        if(insertData.reportSubmited!=""){
        insertData.reportSubmited  = reportLink;

        }
        insertData.allocatedToUserid   = '';
        insertData.allocatedToUserName = '';
    }else if(this.props.getTicket.ticketElement[elementLength-1].roleStatus == 'AssignAccept' ||
             this.props.getTicket.ticketElement[elementLength-1].roleStatus == 'ProofSubmit' ){
      if(($(event.currentTarget).attr('data-roleStatus') == 'FEAllocated') || ($(event.currentTarget).attr('data-roleStatus') == 'BAAllocated')){
        insertData.allocatedToUserid = $("#selectMember option:selected").val();
        insertData.allocatedToUserName = $("#selectMember option:selected").text();
      }else{
        insertData.allocatedToUserid = this.props.getTicket.ticketElement[elementLength-1].allocatedToUserid;
        insertData.allocatedToUserName = this.props.getTicket.ticketElement[elementLength-1].allocatedToUserName;
      }
    }else if(this.props.getTicket.ticketElement[elementLength-1].roleStatus == 'VerificationPassQTLAllocated'){
      insertData.allocatedToUserid = this.props.getTicket.ticketElement[0].userId;
      insertData.allocatedToUserName = this.props.getTicket.ticketElement[0].userName;
    }
    // console.log('insertData ',insertData);
    Meteor.call('genericUpdateTicketMasterElement',this.props.ticketId,insertData);
  }
  actionBlock(){
    var n = this.props.getTicket.ticketElement.length;
    var currentUserRole = Meteor.user().roles.find(this.getRole);
    if(((this.props.getTicket.ticketElement[n-1].roleStatus == 'screenTLAllocated' || this.props.getTicket.ticketElement[n-1].roleStatus == 'AssignReject'))&&(currentUserRole == "team leader" && this.props.getTicket.ticketElement[n-1].allocatedToUserid == Meteor.userId())){
      var teamMemberList=[];
      var title = "Team Leader";
      return(
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tickStatWrapper"> 
          <h5> {title} </h5>
          <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12">
            <span className="col-lg-3 col-md-3 col-sm-4 col-xs-5"> Assign this ticket to: </span>
            <select className="col-lg-3 col-md-3 col-sm-4 col-xs-5 tmListWrap" id="selectTMMember" aria-describedby="basic-addon1" ref="allocateToName">  
              { 
                this.showBAFEList('team member').map((data,i)=>{
                  return(
                    <option key={i} value={data._id}>
                      {data.profile.firstname + ' ' + data.profile.lastname}
                    </option>
                  );
                })
              } 
            </select>
            <div className="col-lg-4 fesubmitouter noLRPad">
              <button type="submit" value="Submit" className="col-lg-11 fesubmitbtn noLRPad" data-role="Team Leader" data-roleStatus="Assign" data-msg="Assigned Ticket To Team Member" onClick={this.approveButton.bind(this)} >Submit</button>                                       
            </div>
          </div>
        </div>

      )
    
    }else if((this.props.getTicket.ticketElement[n-1].roleStatus == 'Assign')&&(currentUserRole == "team member" && this.props.getTicket.ticketElement[n-1].allocatedToUserid == Meteor.userId())){
      var title = "Team Member";  
      return(
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tickStatWrapper"> 
          <h5> {title} </h5> 
          <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12">
            <button className="btn btn-danger col-lg-3 col-md-3 col-sm-4 col-xs-5" id="TMRejectTicket" data-roleStatus="AssignReject" data-msg="Rejected Ticket" onClick={this.showRejectBoxState.bind(this)}> 
              Reject 
            </button>
            <button className="btn btn-success col-lg-3 col-md-3 col-sm-4 col-xs-5 approvebtn" data-roleStatus="AssignAccept" data-msg="Accepted Ticket" onClick={this.approveButton.bind(this)} > 
                  Approve </button>
          </div>
          {this.state.showRejectBox === 'Y' ? this.getRejectBox() : '' }
        </div>
      )

    }else if((this.props.getTicket.ticketElement[n-1].roleStatus == 'AssignAccept')&&(currentUserRole == "team member" && this.props.getTicket.ticketElement[n-1].allocatedToUserid == Meteor.userId())){
      var title = "Team Member"
      var data = [];
      return(
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tickStatWrapper"> 
          <h5> {title} </h5>

          <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12">
            <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 tickStatWrapper ">
              <div className="radio radiobtn col-lg-3 noLRPad">
                <label className="noLRPad"><input type="radio" name="radioState" value="Self" className="optradio" checked={this.state.radioState ==="Self"} onChange={this.getRadioValue.bind(this)}/>Self</label>
              </div>
              <div className="radio col-lg-6 radiobtn noLRPad">
                <label className="noLRPad"><input type="radio" name="radioState" value="field expert" className="optradio" checked={this.state.radioState ==="Field Expert"} onChange={this.getRadioValue.bind(this)}/>Field Expert</label>
              </div>
              <div className="radio radiobtn col-lg-3 noLRPad">
                <label className="noLRPad"><input type="radio" name="radioState" value="ba" className="optradio" checked={this.state.radioState ==="Business Associate"} onChange={this.getRadioValue.bind(this)}/>Business Associate</label>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad hideFieldexpert">                            
              {this.state.radioState == 'field expert'?       
                <div>
                    <div className="col-lg-7 teamMemOuter">
                      <lable>Allocate To Field Expert</lable>
                      <select className="form-control" id="selectMember" aria-describedby="basic-addon1" ref="allocateToFEName">
                          { 
                            this.showBAFEList('field expert').map((data,i)=>{
                              return(
                                <option key={i} value={data._id}>
                                  {data.profile.firstname + ' ' + data.profile.lastname}
                                </option>
                              );
                            })
                          } 
                      </select>
                    </div>
                    <div className="col-lg-4 fesubmitouter noLRPad">
                      <button type="submit" value="Submit" className="col-lg-11 fesubmitbtn noLRPad" data-role="field expert" data-roleStatus="FEAllocated" data-msg="Allocated Ticket To Field Expert" onClick={this.approveButton.bind(this)} >Submit</button>                                       
                    </div>
                </div>
              :this.state.radioState == 'ba'?       
              <div>
                  <div className="col-lg-7 teamMemOuter">
                    <lable>Allocate To Business Associate</lable>
                    <select className="form-control" id="selectMember" aria-describedby="basic-addon1" ref="allocateToFEName">
                        { 
                          this.showBAFEList('ba').map((data,i)=>{
                            return(
                              <option key={i} value={data._id}>
                                {data.profile.firstname + ' ' + data.profile.lastname}
                              </option>
                            );
                          })
                        } 
                    </select>
                  </div>
                  <div className="col-lg-4 fesubmitouter noLRPad">
                    <button type="submit" value="Submit" className="col-lg-11 fesubmitbtn noLRPad" data-role="Business Associate" data-roleStatus="BAAllocated" data-msg="Allocated Ticket To Business Associate" onClick={this.approveButton.bind(this)} >Submit</button>                                       
                  </div>
              </div>
              : this.state.radioState == 'Self'?
                <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">
                  <h5><strong>You are going to handle this ticket</strong></h5>
                  <button type="submit" value="Submit" className="col-lg-11 fesubmitbtn noLRPad" data-role="team member" data-roleStatus="SelfAllocated"  data-msg="Allocated Ticket To Self" onClick={this.approveButton.bind(this)} >Submit</button>                                                                              
              </div>
              :    ""
              }
            </div>
          </div>
        </div> 
      )
    }else if(this.props.getTicket.ticketElement[n-1].roleStatus == 'SelfAllocated' || this.props.getTicket.ticketElement[n-1].roleStatus == 'VerificationFail'){
      var title = "Team Member";  
      return(
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tickStatWrapper"> 
          <h5> {title} </h5>

          <div id="uploadButtonDiv" className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12">
            <button className="btn btn-primary col-lg-5 col-md-5 col-sm-12 col-xs-12"  onClick={this.uploadDocsDiv.bind(this)} > 
                  Upload Documents </button>  
          </div>
          <div id="AddImagesVideo" style={{"display":"none"}}>
            <AddImagesVideo ticket={this.props.ticketId}/>
          </div>
        </div>
      )
    }else if(this.props.getTicket.ticketElement[n-1].roleStatus == 'ProofSubmit'){
      var title = "Team Member";  
      return(
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tickStatWrapper"> 
          <h5> {title} </h5>
          <div id="SubmittedDocuments" >
            {this.props.getTicket.submittedDocuments ?
              <SubmittedDocuments submittedDocuments={this.props.getTicket.submittedDocuments} ticketId={this.props.ticketId}/>
              :
              ""
            }
          </div>
          <div className="docbtnwrap col-lg-6 col-lg-offset-4">
						<button type="button" className="btn btn-danger col-lg-4 ApprovRejDoc" id="TMProofReject" data-roleStatus="VerificationFail" data-msg="Rejected Verification Information" onClick={this.showRejectBoxState.bind(this)}>Reject</button>
            <button type="button" className="btn btn-primary col-lg-4 ApprovRejDoc" data-roleStatus="VerificationPass" data-msg="Approved Verification Information" onClick ={this.approveButton.bind(this)}>Approve</button>
          </div>
          {this.state.showRejectBox === 'Y' ? this.getRejectBox() : '' }
        </div>
        
      )
    }else if(this.props.getTicket.ticketElement[n-1].roleStatus == 'VerificationPass'){
      var title = "Team Member";  
      return(
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tickStatWrapper"> 
          <h5> {title} </h5>
          <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-xm-12 col-xs-12">
            <div className="col-lg-6 col-lg-offset-1">
                <input type="file" ref="uploadReportFile" id="uploadReport" name="uploadReport" className="col-lg-7 reporttitle noLRPad" onChange={this.handleReportUpload.bind(this)} multiple/>
            </div>
            <div className="col-lg-4">
                <button type="button" className="bg-primary col-lg-4" data-roleStatus="ReportSubmitted" data-msg="Submitted Verification Information" onClick={this.approveButton.bind(this)}>Submit</button>
            </div>
            <div className="docdownload col-lg-2 col-lg-offset-5" title="Download Report">
                <i className="fa fa-file-text-o" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        
      )
    }else if(this.props.getTicket.ticketElement[n-1].roleStatus == 'VerificationPassQTMAllocated'){
      var title = "Qulity Team Member";  
      return(
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tickStatWrapper"> 
          <h5> {title} </h5>
          <div id="SubmittedDocuments" >
            {this.props.getTicket.submittedDocuments ?
              <SubmittedDocuments submittedDocuments={this.props.getTicket.submittedDocuments}/>
              :
              ""
            }
          </div>
          <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-xm-12 col-xs-12">
            <div className="docdownload col-lg-2 col-lg-offset-5" title="Download Report">
                <i className="fa fa-file-text-o" aria-hidden="true"></i>
            </div>
            <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12">
            <button className="btn btn-danger col-lg-3 col-md-3 col-sm-4 col-xs-5" id="QTMRejectTicket" data-roleStatus="QAFail" data-msg="Rejected Verification Report For Quality Issue" onClick={this.showRejectBoxState.bind(this)} > 
              Reject 
            </button>
            <button className="btn btn-success col-lg-3 col-md-3 col-sm-4 col-xs-5 approvebtn" data-roleStatus="QAPass" data-msg="Approved Verification Report" onClick={this.approveButton.bind(this)} > 
                  Approve </button>
          </div>
          {this.state.showRejectBox === 'Y' ? this.getRejectBox() : '' }
          </div>
        </div>
      )
    }else if(this.props.getTicket.ticketElement[n-1].roleStatus == 'VerificationPassQTLAllocated'){
      var title = "Qulity Team Leader";  
      return(
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tickStatWrapper"> 
          <h5> {title} </h5>
          <div id="SubmittedDocuments" >
            {this.props.getTicket.submittedDocuments ?
              <SubmittedDocuments submittedDocuments={this.props.getTicket.submittedDocuments}/>
              :
              ""
            }
          </div>
          <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-xm-12 col-xs-12">
            <div className="docdownload col-lg-2 col-lg-offset-5" title="Download Report">
                <i className="fa fa-file-text-o" aria-hidden="true"></i>
            </div>
            <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12">
            <button className="btn btn-danger col-lg-3 col-md-3 col-sm-4 col-xs-5" id="QTLRejectTicket" data-roleStatus="ReviewFail" data-msg="Rejected Verification Report For Quality Issue" onClick={this.showRejectBoxState.bind(this)} > 
              Reject 
            </button>
            <button className="btn btn-success col-lg-3 col-md-3 col-sm-4 col-xs-5 approvebtn" data-roleStatus="ReviewPass" data-msg="Approved And Delivered Verification Report" onClick={this.approveButton.bind(this)} > 
                  Approve </button>
          </div>
          {this.state.showRejectBox === 'Y' ? this.getRejectBox() : '' }
          </div>
        </div>
      )
    }
  }

	render(){
    if(!this.props.loading){
      return(            
        <div>
          <div className="content-wrapper">
            <section className="content">
              <div className="row">
                <div className="col-md-12">
                  <div className="box">
                    <div className="box-header with-border">
                      <h2 className="box-title">Ticket</h2> 
                    </div>
                    <div className="box-body">
                       <div className="ticketWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="ticketHeader col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="ticketBorder col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 noLRPad">
                                  <img src="/images/assureid/Assure-ID-logo-Grey.png" className="assureidLogo" />
                              </div>
                            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-right outerTicketIcons">
                                <i className="fa fa-print ticketIcons" title="Print"></i>  
                                <i className="fa fa-file-pdf-o ticketIcons"  title="pdf"></i> 
                                <i className="fa fa-download ticketIcons" title="Download"></i> 
                            </div>
                            </div> 
                          </div>

                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                            <h3 className="ticketheadStyle col-lg-12">{this.props.getTicket.serviceName}/{this.props.getTicket.ticketNumber}</h3>
                          </div>
                          <div className="ticketPills col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noLRPad">
                              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                { this.props.userProfile.userProfile ?
                                  <img src={this.props.userProfile.userProfile } className="ticketUserImage" /> :
                                  <img src="/images/assureid/userIcon.png" className="ticketUserImage" /> 
                                }
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight assureidValue">
                                    <button type="button" className="btn viewbtn" data-userid={this.props.user._id} onClick= {this.viewprofile.bind(this)}>View</button>
                                </div>
                              </div>
                              <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
                                  {/* <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-left userLabel">
                                  Name <span className="pull-right">:</span>
                                  </div>   */}
                                  <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-left userName">
                                    <h5>{this.props.userProfile.firstName} {this.props.userProfile.lastName}</h5>
                                  </div> 
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
                                  <div className="col-lg-5 col-md-5 col-sm-4 col-xs-4 text-left  userLabel">
                                  Assure ID <span className="pull-right">:</span>
                                  </div>  
                                  <div className="col-lg-7 col-md-7 col-sm-8 col-xs-8 text-left userValue">
                                   
                                    <p>{this.props.userProfile.assureId}</p>
                                  </div> 
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
                                  <div className="col-lg-5 col-md-5 col-sm-4 col-xs-4 text-left userLabel">
                                 Mobile <span className="pull-right">:</span>
                                  </div>  
                                  <div className="col-lg-7 col-md-7 col-sm-8 col-xs-8 text-left userValue">
                                  {/* <p>{this.state.userDetails.emails[0].address}</p> */}
                                    <p>+91{this.props.userProfile.mobileNo}</p>
                                  </div> 
                                </div>

                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
                                  <div className="col-lg-5 col-md-5 col-sm-4 col-xs-4 text-left userLabel">
                                  Email Id <span className="pull-right">:</span>
                                  </div>  
                                  <div className="col-lg-7 col-md-7 col-sm-8 col-xs-8 text-left userValue">
                                    <p>{this.props.userProfile.emailId}</p>
                                  </div> 
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
                                  <div className="col-lg-5 col-md-5 col-sm-4 col-xs-4 text-left userLabel">
                                  Age<span className="pull-right">:</span>
                                  </div>  
                                   <div className="col-lg-7 col-md-7 col-sm-8 col-xs-8 text-left userValue">
                                    <p>{this.props.userProfile.dateOfBirth}&nbsp;Year</p>
                                  </div> 
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
                                  <div className="col-lg-5 col-md-5 col-sm-4 col-xs-4 text-left userLabel">
                                  Gender <span className="pull-right">:</span>
                                  </div>  
                                  <div className="col-lg-7 col-md-7 col-sm-8 col-xs-8 text-left userValue">
                                    <p className="genName">{this.props.userProfile.gender}</p>
                                  </div> 
                                </div>
                               
                              </div>
                              {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-right viewProfileLink noPadLeftRight">
                                <Link>View profile</Link>
                              </div> */}
                         </div>
                         <div className="col-lg-6">
                         <ServiceInformation ticketId={this.props.params.id}/>
                         </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <VerifyDetailsDocument ticketId={this.props.params.id}/>
                          </div>
                         <VerifiedDocuments ticketId={this.props.params.id}/>

                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerShadow">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 activityDetails">                            
                                  <h3> Activities</h3>
                              </div>
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">
                                {this.props.getTicket.ticketElement.map((element,i)=>{
                                   return ( 
                                    <div key={i} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tickStatWrapper"> 
                                      <h5> {element.role} </h5>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
                                        <b>{element.userName}</b> {element.msg} on {moment(element.createdAt).format("DD/MM/YYYY hh:mm A")}
                                        <br />
                                        {
                                          element.remark ?
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                              <span>Remark &nbsp;:</span><span>{element.remark}</span> 
                                            </div>
                                          :
                                          ""
                                        }
                                      </div>  
                                    </div>
                                    )
                                  })
                                }

                                {this.actionBlock()}

                              </div>
                            </div>
                          </div>
                       </div>
                       </div>
                       </div> 
                    </div>
                  </div>
                </div>
              {/* </div> */}
            </section>
          </div>
        </div>    
      );
    }else{
      return(<span>loading...</span>);
    }

   }
}

export default UserDetailsContainer = withTracker(props => {
  var handleSinTick = Meteor.subscribe("singleTicket",props.params.id);
  var handleUseFunc = Meteor.subscribe('userfunction');
  var handleUserProfile = Meteor.subscribe("userProfileData");
  var handleReport    = Meteor.subscribe("allTicketReport");

  var ticketId = props.params.id;
  var loading = !handleSinTick.ready() && !handleUseFunc.ready() && !handleUserProfile.ready() && !handleReport.ready();
  var getTicket = TicketMaster.findOne({"_id":ticketId}) || {};        
  
  var user = Meteor.users.findOne({"_id": getTicket.userId}) || {};
  var userProfile = UserProfile.findOne({"userId": getTicket.userId}) || {};
    // var reportLinkDetails = TempTicketReport.findOne({},{sort:{'createdAt':-1}}).fetch();   
    // console.log("reportLinkDetails");
    // console.log(reportLinkDetails);
    // console.log(reportLinkDetails[0].ReportLink);
    // var reportLink        = reportLinkDetails.ReportLink;

  if(userProfile.dateOfBirth){
    var today = new Date();
    var birthDate = new Date(userProfile.dateOfBirth);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    userProfile.dateOfBirth=age;
  }else{
    userProfile.dateOfBirth='-';
  }
  return {
    loading,
    getTicket,
    user,
    userProfile,
    ticketId,
    
  };
})(Ticket);