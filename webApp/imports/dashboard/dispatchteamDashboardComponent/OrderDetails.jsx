
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

import { Order } from '/imports/website/ServiceProcess/api/Order.js'; 
import { TicketMaster } from '/imports/website/ServiceProcess/api/TicketMaster.js';
import  ServiceInformation from '/imports/dashboard/ticketManagement/ServiceInformation.jsx';
import VerifiedDocuments from '/imports/dashboard/ticketManagement/VerifiedDocuments.jsx';
import VerificationDataSubmit from '/imports/dashboard/ticketManagement/VerificationDataSubmit.jsx';
import VerifyDetailsDocument from '/imports/dashboard/ticketManagement/VerifyDetailsDocument.jsx';
import { UserProfile } from '/imports/website/forms/api/userProfile.js';
import { ChecklistFieldExpert } from '/imports/dashboard/reactCMS/api/Services.js';

import ReportGeneration from '/imports/dashboard/generation/components/ReportGeneration.jsx';


class OrderDetails extends TrackerReact(Component){
  constructor(props){
    super(props);
    this.state = {
      'userDetails': {},
      "userRoleIn": Meteor.userId(),
      "showRejectBox" : 'N',
      "radioState":'',
      "showRadiobtn": 'N',
      "verifiedInfo":[],
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
  generateOrder(event){
    event.preventDefault();
    // console.log('generateOrder orderid');
    var path = '/orderGeneration';
        window.open(path);
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
                        <h2 className="box-title">Order</h2>
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
                                  <i className="fa fa-file-pdf-o ticketIcons"  title="PDF"></i>
                                  <i className="fa fa-download ticketIcons" title="Download"></i>
                              </div>
                              </div>
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                              <h3 className="ticketheadStyle col-lg-12">{this.props.orderDetails.serviceName}/{this.props.orderDetails.orderNo}</h3>
                            </div>
                            <div className="ticketPills col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 noLRPad">
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                  { this.props.userProfile.userProfile ?
                                    <img src={this.props.userProfile.userProfile } className="ticketUserImage" /> :
                                    <img src="/images/assureid/userIcon.png" className="ticketUserImage" />
                                  }
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight assureidValue">
                                      <button type="button" className="btn viewbtn" data-userid={this.props.user._id} onClick= {this.viewprofile.bind(this)}>View Profile</button>
                                  </div>
                                </div>
                                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
                                    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-left userName">
                                      <h5>{this.props.userProfile.firstName} {this.props.userProfile.lastName}</h5>
                                    </div>
                                  </div>
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
                                    <div className="col-lg-5 col-md-5 col-sm-4 col-xs-4 text-left  userLabel">
                                    Assure ID <span className="pull-right">:</span>
                                    </div> 
                                    <div className="col-lg-7 col-md-7 col-sm-8 col-xs-8 text-left userValue">
                                      <p>&nbsp;{this.props.userProfile.assureId ? this.props.userProfile.assureId : "-"}</p>
                                    </div>
                                  </div>
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
                                    <div className="col-lg-5 col-md-5 col-sm-4 col-xs-4 text-left userLabel">
                                   Mobile <span className="pull-right">:</span>
                                    </div> 
                                    <div className="col-lg-7 col-md-7 col-sm-8 col-xs-8 text-left userValue">
                                    {/* <p>{this.state.userDetails.emails[0].address}</p> */}
                                      <p>{this.props.userProfile.mobileNo ? "+91"+this.props.userProfile.mobileNo : "-"}</p>
                                    </div>
                                  </div>

                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
                                    <div className="col-lg-5 col-md-5 col-sm-4 col-xs-4 text-left userLabel">
                                    Email Id <span className="pull-right">:</span>
                                    </div> 
                                    <div className="col-lg-7 col-md-7 col-sm-8 col-xs-8 text-left userValue">
                                      <p>{this.props.userProfile.emailId ? this.props.userProfile.emailId : "-"}</p>
                                    </div>
                                  </div>
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
                                    <div className="col-lg-5 col-md-5 col-sm-4 col-xs-4 text-left userLabel">
                                    Age<span className="pull-right">:</span>
                                    </div> 
                                     <div className="col-lg-7 col-md-7 col-sm-8 col-xs-8 text-left userValue">
                                      <p>{this.props.userProfile.dateOfBirth ? this.props.userProfile.dateOfBirth +" Years" : "-"}</p>
                                      
                                    </div>
                                  </div>
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
                                    <div className="col-lg-5 col-md-5 col-sm-4 col-xs-4 text-left userLabel">
                                    Gender <span className="pull-right">:</span>
                                    </div> 
                                    <div className="col-lg-7 col-md-7 col-sm-8 col-xs-8 text-left userValue">
                                      <p className="genName">{this.props.userProfile.gender ? this.props.userProfile.gender : ""}</p>
                                    </div>
                                  </div>
                                
                                </div>
                           </div>
                           <div className="col-lg-6">
                             <ServiceInformation ticketId={this.props.params.id}/>
                           </div>
                           {/*Show all the tickets*/}
                          </div>
                           <div id="SubmittedDocuments" >
                             {this.props.orderDetails.ticket ?
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outeReportBlock">
                                    <h6 className="dataDetails col-lg-3 col-md-3 col-sm-1 col-xs-1">Details of Tickets</h6> 
                                      {this.props.orderDetails.ticket.map((ticketReport,i)=>{
                                        return(
                                          <div key={i} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tickStatWrapper">
                                            <ReportGeneration ticketId={ticketReport.ticketId}/>            
                                          </div>
                                        )
                                      })}
                                      
                                  </div>   
                                </div>                       
                                :
                                null
                              }
                          </div>

                          <div className="col-lg-6 col-lg-offset-3 outerGenrateOrder">
                             <button type="button" className="btn btn-success col-lg-4 col-lg-offset-4" onClick={this.generateOrder.bind(this)}>Generate Order</button>
                          </div>
                         </div>
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
        return(<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noData"> No Data Available</div>);
      }

     }
  }

export default UserDetailsContainer = withTracker(props => {
  var handleSinTick = Meteor.subscribe("singleOrder",props.params.id);
  var handleUseFunc = Meteor.subscribe('userfunction');
  var handleUserProfile = Meteor.subscribe("userProfileData");
  // var handleReport    = Meteor.subscribe("allTicketReport");
  var orderId = props.params.id;
  console.log('orderId: ', orderId);
  var loading = !handleSinTick.ready() && !handleUseFunc.ready() && !handleUserProfile.ready();
  var orderDetails = Order.findOne({"_id":orderId}) ;
  console.log('orderDetails: ', orderDetails);
  if(orderDetails){
    var user = Meteor.users.findOne({"_id": orderDetails.userId}) || {};
    if(user){
      var userProfile = UserProfile.findOne({"userId": orderDetails.userId}) || {};
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
    }
  }   
  var ticketMasterID = 'CZyMpqbZRvFbywEXa';
  return {
    loading,
    orderDetails,
    user,
    userProfile,
    orderId,
    ticketMasterID,
  };
})(OrderDetails);
