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

  getRejectBox(){
    console.log('showRejectBox: ' + this.state.showRejectBox);
    return(
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <textarea rows="3" cols="60" className="col-lg-6 col-lg-offset-2" />
        <button onClick={this.submitReject.bind(this)} className="col-lg-2 col-lg-offset-2"> Submit </button>
      </div>
    )
  }

  submitReject(){
    console.log('submitReject clicked');

  }

  showRejectBoxState(){
    this.setState({"showRejectBox" : 'Y'});
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
  
  actionBlock(){
    var n = this.props.getTicket.ticketElement.length;
    if(this.props.getTicket.ticketElement[n-1].roleStatus == 'ScreenTLAllocated'){
      var teamMemberList=[];
      var title = "Team Leader";
      var allTeamMemberList = Meteor.users.find({'roles':'team member'}).fetch();
      for(k=0;k<allTeamMemberList.length;k++){
        var teamMemberName = allTeamMemberList[k].profile.firstname+" "+allTeamMemberList[k].profile.lastname;
        var teamMemberId   = allTeamMemberList[k]._id;
        teamMemberList.push({'teamMemberName':teamMemberName,'teamMemberId':teamMemberId});
      } 
      return(
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tickStatWrapper"> 
          <h5> {title} </h5>
          <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12">
            <span className="col-lg-3 col-md-3 col-sm-4 col-xs-5"> Assign this ticket to: </span>
            <select className="col-lg-3 col-md-3 col-sm-4 col-xs-5 tmListWrap" aria-describedby="basic-addon1" ref="allocateToName">  
            { 
              teamMemberList.map((teamMemberList, index)=>{
                  return(
                      <option key={index} id={teamMemberList.teamMemberId}>
                          {teamMemberList.teamMemberName}
                      </option>
                  );
              })
            }
            </select>
            <div className="col-lg-2 fesubmitouter noLRPad">
                <button type="button" className="fesubmitbtn col-lg-12 teammember" onClick={this.allocateToTeamMember.bind(this)}>Assign To</button>
            </div>
          </div>
          
        </div>
      )
    
    }else if(this.props.getTicket.ticketElement[n-1].roleStatus == 'Assign'){

      var title = "Team Member";  
      return(
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tickStatWrapper"> 
          <h5> {title} </h5>

          <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12">
            <button className="btn btn-success col-lg-3 col-md-3 col-sm-4 col-xs-5 approvebtn" data-status="AssignAccept" onClick={this.changeTMStatus.bind(this)} > 
                  Approve </button>
            <button className="btn btn-danger col-lg-3 col-md-3 col-sm-4 col-xs-5" data-status="AssignAccept"
                    onClick={this.showRejectBoxState.bind(this)}> 
              Reject 
            </button>
          </div>
          {this.state.showRejectBox === 'Y' ? this.getRejectBox() : '' }
        </div>
      )

    }else if(this.props.getTicket.ticketElement[n-1].roleStatus == 'AssignAccept'){
        // <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
        //   <div className="radio radiobtn col-lg-3 noLRPad">
        //   <label className="noLRPad"><input type="radio" name="optradio" value="Self" className="optradio" checked={this.state.radioState ==="Self"}/>Self</label>
        //   </div>
        //   <div className="radio col-lg-6 radiobtn noLRPad">
        //   <label className="noLRPad"><input type="radio" name="optradio" value="Field Expert" className="optradio" checked={this.state.radioState ==="Field Expert"}/>Field Expert</label>
        //   </div>
        //   <div className="radio radiobtn col-lg-3 noLRPad">
        //   <label className="noLRPad"><input type="radio" name="optradio" value="BA" className="optradio" checked={this.state.radioState ==="BA"}/>BA</label>
        //   </div>
        // </div>

        <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
        <div className="radio radiobtn col-lg-3 noLRPad">
        <label className="noLRPad"><input type="radio" name="optradio" value="Self" className="optradio"/>Self</label>
        </div>
        <div className="radio col-lg-6 radiobtn noLRPad">
        <label className="noLRPad"><input type="radio" name="optradio" value="Field Expert" className="optradio"/>Field Expert</label>
        </div>
        <div className="radio radiobtn col-lg-3 noLRPad">
        <label className="noLRPad"><input type="radio" name="optradio" value="BA" className="optradio"/>BA</label>
        </div>
      </div>
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

  var ticketId = props.params.id;
  var loading = !handleSinTick.ready() && !handleUseFunc.ready() && !handleUserProfile.ready();
  var getTicket = TicketMaster.findOne({"_id":ticketId}) || {};        
  
  var user = Meteor.users.findOne({"_id": getTicket.userId}) || {};
  var userProfile = UserProfile.findOne({"userId": getTicket.userId}) || {};

    var today = new Date();
    var birthDate = new Date(userProfile.dateOfBirth);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    userProfile.dateOfBirth=age;
    
  return {
    loading,
    getTicket,
    user,
    userProfile,
    ticketId,
  };
})(Ticket);