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

export default class UserInformation extends TrackerReact(Component){
  
  constructor(props){
    super(props);
    this.state = {

      "subscription" : {
        "allTickets" : Meteor.subscribe("allTickets"), 
        "userfunction" : Meteor.subscribe('userfunction'),
      } 
    }
  }
  userData(){
  	var getTicket = TicketMaster.findOne({"_id" : this.props.ticketId});
    if (getTicket){
      var newCommeeteeArr = [];

      for(var i=0;i<getTicket.ticketElement.length;i++){

        var roleDetails = Meteor.users.findOne({"_id":getTicket.ticketElement[i].empid});
        if (roleDetails) {
          newCommeeteeArr.push(
            <div key = {i} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 borderBottomBlock noLRPad">

              <h5 className="col-lg-9 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 noLRPad roleName">
                {getTicket.ticketElement[i].role}
              </h5>
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                { roleDetails.profile.userProfile ?
                   <img src={roleDetails.profile.userProfile} className="ticketUserImage" /> :
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
                    <p>{roleDetails.profile.firstname} {roleDetails.profile.lastname}</p>
                  </div> 
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-left userLabel">
                   Email Id <span className="pull-right">:</span>
                  </div>  
                  <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-left userValue">
                    <p>{roleDetails.emails[0].address}</p>
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
              {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-right viewProfileLink noPadLeftRight">
                <Link>View profile</Link>
              </div> */}
            </div>
          );
        }
          
      }
      return newCommeeteeArr;
    
    }
  }
 
	render(){
    return(
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad committeeOuterWrap">
         {/* <div className="userInformationWrapper col-lg-6 col-md-6 col-sm-6 col-xs-6"> */}
            {this.userData()}
          {/* </div>     */}
      </div>    
    );
   }
}
