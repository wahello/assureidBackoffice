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


class Ticket extends TrackerReact(Component){
  constructor(props){
    super(props);
    this.state = {
      'userDetails': {},
      "userRoleIn": Meteor.userId(),
      // "subscription" : {
      //   "singleTicket" : Meteor.subscribe("singleTicket"),    
      //   "userfunction" : Meteor.subscribe('userfunction'),
      //   "allTickets"   : Meteor.subscribe("allTickets"), 

      // } 
    }

    
  }


  // componentDidMount(){
  //   var id = this.props.params.id;
  //   this.userdata=Tracker.autorun(()=>{
  //     if((this.state.subscription.allTickets.ready())|| (this.state.subscription.userfunction.ready())){
  //         var getTicket = TicketMaster.findOne({"_id":id});        
  //         var user = Meteor.users.findOne({"_id": getTicket.userId});
  //         this.setState({
  //             'userDetails':user
  //         });
      
  //     }

  //   });
  
  // }

  componentWillReceiveProps(nextProps){

    if(!nextProps.loading){
      this.setState({
        'userDetails':nextProps.user,
      });
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
                          {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerDocumentStatus">
                            <DocumentStatus ticket={this.props.getTicket}/>
                          </div> */}
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                            <h3 className="ticketheadStyle col-lg-12">{this.props.getTicket.serviceName}/{this.props.getTicket.orderNo}</h3>
                          </div>
                          <div className="ticketPills col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noLRPad">
                              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                { this.props.userProfile.userProfile ?
                                  <img src={this.props.userProfile.userProfile } className="ticketUserImage" /> :
                                  <img src="/images/assureid/userIcon.png" className="ticketUserImage" /> 
                                }
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight assureidValue">
                                    <button type="button" className="btn viewbtn">View</button>
                                </div>
                              </div>
                              <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
                                  {/* <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-left userLabel">
                                  Name <span className="pull-right">:</span>
                                  </div>   */}
                                  <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-left userName">
                                    <h5>{this.props.userProfile.firstname} {this.props.userProfile.lastname}</h5>
                                  </div> 
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
                                  <div className="col-lg-5 col-md-5 col-sm-4 col-xs-4 text-left  userLabel">
                                  Assure ID <span className="pull-right">:</span>
                                  </div>  
                                  <div className="col-lg-7 col-md-7 col-sm-8 col-xs-8 text-left userValue">
                                   
                                    <p>IND-AAA-123456</p>
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
                                    <p>{this.props.userProfile.dateOfBirth}</p>
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
                         {/* <TicketDocumentDetails ticketId={this.props.params.id}/> */}
                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerShadow">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 activityDetails">                            
                                <h3> Activities</h3>
                            </div>
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">
                                  {/* <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noLRPad">
                                      <UserInformation ticketId={this.props.params.id} /> 
                                    </div> */}
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">
                                      <RoleTicketStatus ticketId={this.props.params.id}/>
                                  </div>
                                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad" id="AddImagesVideo" style={{"display" : "none"}}>
                                   <AddImagesVideo ticket={this.props.params.id}/>
                                  </div>
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
  var handleSinTick = Meteor.subscribe("singleTicket");
  var handleUseFunc = Meteor.subscribe('userfunction');
  var handleAllTick = Meteor.subscribe("allTickets");
  var handleUserProfile = Meteor.subscribe("userProfileData");
  var ticketId = props.params.id;
  var loading = !handleSinTick.ready() && !handleUseFunc.ready() && !handleAllTick.ready() && !handleUserProfile.ready();
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