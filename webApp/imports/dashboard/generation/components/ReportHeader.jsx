import React, {Component} from 'react';
import {render} from 'react-dom';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import {Router, Route, browserHistory} from 'react-router';
import { TicketMaster } from '../../../website/ServiceProcess/api/TicketMaster.js';
import { UserProfile } from '../../../website/forms/api/userProfile.js';
import ReportGeneration from './ReportGeneration.jsx';

class ReportHeader extends TrackerReact(Component){
  constructor(props){
    super(props);
    this.state ={ 
      "subscription" : { 
      } 
    };
  }
  componentDidMount(){      
  }

  render(){
    if (!this.props.loading) {
      return (
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding generationHeader"> 
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 pull-left">
              <img src="../images/assureid/Assure-ID-logo-Grey.png" className="generationImg" />
            </div>
            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
            </div>
          </div>
           <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 outerUserData">
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                  { this.props.userProfile.userProfile ?
                    <img src={this.props.userProfile.userProfile } className="reportUserImage" /> :
                    <img src="/images/assureid/userIcon.png" className="reportUserImage" />
                  }               
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
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
          <ReportGeneration ticketId={this.props.ticketId} />
          </div>
        </div>
      );
    }else{
      return(
        <span>loading</span>
        );
    }
  }
}
export default ReportHeaderContainer = withTracker(({params}) => {
  var handleSinTick = Meteor.subscribe("singleTicket",params.id);
  var handleUseFunc = Meteor.subscribe('userfunction');
  var handleUserProfile = Meteor.subscribe("userProfileData");
  // var handleReport    = Meteor.subscribe("allTicketReport");
  // const postHandle2  = Meteor.subscribe('checklistFieldExpert');
  var ticketId = params.id;
  // console.log("ticketId",ticketId);
  var loading = !handleSinTick.ready() && !handleUseFunc.ready() && !handleUserProfile.ready();
  var getTicket = TicketMaster.findOne({"_id":ticketId});
  // console.log("getTicket",getTicket);
  if(getTicket){
    var user = Meteor.users.findOne({"_id": getTicket.userId}) || {};
      // console.log("user",user);

    if(user){
      var userProfile = UserProfile.findOne({"userId": getTicket.userId}) || {};
      // console.log("userProfile",userProfile);
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
    //------------------------------------------------------------------------------
  }   

  return {
    loading,
    getTicket,
    user,
    userProfile,
    ticketId,
  };
})(ReportHeader);