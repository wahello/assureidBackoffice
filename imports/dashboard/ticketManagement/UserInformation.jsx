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
  	// console.log("getTicket",getTicket);
  	if (getTicket) {
     	var user    = Meteor.users.findOne({"_id": getTicket.userId});
     	// console.log("user",user);
      return (
      	<div>
	      	<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
            { user.profile.userProfile ?
               <img src={user.profile.userProfile} className="ticketUserImage" /> :
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
                <p>{user.profile.firstname} {user.profile.lastname}</p>
              </div> 
	          </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-left userLabel">
               Email Id <span className="pull-right">:</span>
              </div>  
              <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-left userValue">
                <p>{user.emails[0].address}</p>
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
      	);

  	}
  }
 
	render(){
    return(            
      <div className="userInformationWrapper col-lg-6 col-md-6 col-sm-6 col-xs-6">
          {this.userData()}
      </div>    
    );
   }
}
