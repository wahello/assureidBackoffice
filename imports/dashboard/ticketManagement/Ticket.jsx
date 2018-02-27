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

class Ticket extends TrackerReact(Component){
  constructor(props){
    super(props);
    this.state = {
      'userDetails': {},
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
                          <div className="ticketHeader col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <img src="/images/assureid/Assure-ID-logo-Grey.png" className="assureidLogo" />
                            </div>
                           <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-right outerTicketIcons">
                              <i className="fa fa-print ticketIcons" title="Print"></i>  
                              <i className="fa fa-file-pdf-o ticketIcons"  title="pdf"></i>  
                           </div>
                          </div> 
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerDocumentStatus">
                            <DocumentStatus ticket={this.props.getTicket}/>
                          </div>
                          <div className="ticketPills col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                { this.state.userDetails.profile.userProfile ?
                                  <img src={this.state.userDetails.profile.userProfile} className="ticketUserImage" /> :
                                  <img src="/images/assureid/userIcon.png" className="ticketUserImage" /> 
                                }
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight assureidValue">
                                    <p>MHP1234567IN</p>
                                </div>
                              </div>
                              <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
                                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-left userLabel">
                                  Name <span className="pull-right">:</span>
                                  </div>  
                                  <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-left userValue">
                                    <p>{this.state.userDetails.profile.firstname} {this.state.userDetails.profile.lastname}</p>
                                  </div> 
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
                                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-left userLabel">
                                  Email Id <span className="pull-right">:</span>
                                  </div>  
                                  <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-left userValue">
                                    <p>{this.state.userDetails.emails[0].address}</p>
                                  </div> 
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
                                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-left userLabel">
                                  Gender <span className="pull-right">:</span>
                                  </div>  
                                  <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-left userValue">
                                    <p></p>
                                  </div> 
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
                                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-left userLabel">
                                  Age<span className="pull-right">:</span>
                                  </div>  
                                   <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-left userValue">
                                    <p></p>
                                  </div> 
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-right viewProfileLink noPadLeftRight">
                                <Link>View profile</Link>
                              </div>
                         </div>
                         <div className="col-lg-6">
                         <ServiceInformation ticketId={this.props.params.id}/>
                         </div>
                        </div>
  
                         
                         <VerifiedDocuments ticketId={this.props.params.id}/>
                         <TicketDocumentDetails ticketId={this.props.params.id}/>
                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                             <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <UserInformation ticketId={this.props.params.id} /> 
                              </div>
                             <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <RoleTicketStatus ticketId={this.props.params.id}/>
                             </div>
                         </div>
                         {/*<AddImagesVideo />*/}
                       </div> 
                    </div>
                  </div>
                </div>
              </div>
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
  var ticketId = props.params.id;
  var loading = !handleSinTick.ready() && !handleUseFunc.ready() && !handleAllTick.ready();
  // var categoryList = Category.find({}).fetch() || [];

  var getTicket = TicketMaster.findOne({"_id":ticketId}) || {};        
  var user = Meteor.users.findOne({"_id": getTicket.userId}) || {};
 
  return {
    loading,
    getTicket,
    user,
    ticketId,
  };
})(Ticket);