import React, { Component }  from 'react';
import {render} from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Router, Route, browserHistory} from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';

import { UserProfile } from '../forms/api/userProfile.js';
// import BasicForm from '../forms/BasicForm.jsx';

export default class BasicInfoRequired extends TrackerReact(Component) {
  constructor(props){
    super(props); 
    this.state ={
      "subscription" : {
        // "userData" : Meteor.subscribe('userprofile',Meteor.userId()),    
        "userProfileData" : Meteor.subscribe("userProfileData"),
      } 
    }
  }
  render() {
    // if (!this.props.loading) {
      return (  
        <div>
	        {
	        	this.props.userData ?
	        	<div className="col-lg-12 col-md-12 col-sm-6 col-xs-6 outerProfileView">
	        	 <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 basicInfoOuter">
			          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 basicInfoInner noProfilePadding">
			            <p className="col-lg-5">Name</p>
			            <span className="col-lg-1">:</span>
			            <p className="col-lg-6">{this.props.userData.firstName} {this.props.userData.lastName}</p>
			          </div>  
			          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 basicInfoInner noProfilePadding">
			            <p className="col-lg-5">Date Of Birth</p>
			            <span className="col-lg-1">:</span>									
			            <p className="col-lg-6">{this.props.userData.dateOfBirth ? moment(this.props.userData.dateOfBirth).format("DD/MM/YYYY") : ""}</p>
			          </div>   
			          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 basicInfoInner noProfilePadding">
			            <p className="col-lg-5">Alternate Phone Number</p>
			            <span className="col-lg-1">:</span>																		
			            <p className="col-lg-6">{this.props.userData.altMobileNo ? this.props.userData.altMobileNo : "-"}</p>
			          </div>  
			        </div>
		          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 basicInfoOuter">
		            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 basicInfoInner noProfilePadding">
			            <h5 className="col-lg-5">Gender</h5>
			            <span className="col-lg-1">:</span>																											
			            <p className="col-lg-6">{this.props.userData.gender}</p>
			          </div>  
			          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 basicInfoInner noProfilePadding">
			            <h5 className="col-lg-5">Phone Number</h5>
			            <span className="col-lg-1">:</span>																											
			            <p className="col-lg-6">{this.props.userData.mobileNo}</p>
			          </div> 
			          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 basicInfoInner noProfilePadding">
			            <h5 className="col-lg-5">Email Id</h5>
			            <span className="col-lg-1">:</span>																											
			            <p className="col-lg-6">{this.props.userData.emailId}</p>
			          </div>  
			        </div>
		        </div>
	        	:
	        		""
	        }
         
        </div>
      );
    }
} 