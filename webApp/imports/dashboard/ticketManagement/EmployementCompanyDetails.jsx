import React, {Component} from 'react';
import {render} from 'react-dom';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import {Router, Route, browserHistory} from 'react-router';
// import { TicketMaster } from '../../../website/ServiceProcess/api/TicketMaster.js';
// import { UserProfile } from '../../../website/forms/api/userProfile.js';
 
export default class EmployementCompanyDetails extends TrackerReact(Component){
  constructor(props){
    super(props);
    this.state ={ 
      'typeOfOwnersip' : '',
      'cinNo'          : '',
      'registeringIn'  : '',
       'siteVisit'     : '',
       'currentStatus' : '',
       'pastAberrations' : '',

      "subscription" : { 
      } 
    };
    this.handleChange          = this.handleChange.bind(this);

  }
  componentDidMount(){      
  }
  handleChange(event){
    event.preventDefault();

    const target = event.target;
    const name   = target.name; 
    this.setState({
     [name]: event.target.value,
    });
  }
 getRole(role) {
      return role != "backofficestaff";
  }
  submitCompanyDetails(event){
    event.preventDefault()
    var companyDetails = {
       'typeOfOwnersip' : this.refs.typeOfOwnersip.value,
       'cinNo'          : this.refs.cinNo.value,
       'registeringIn'  : this.refs.registeringIn.value,
       'siteVisit'      : this.refs.siteVisit.value,
       'currentStatus'  : this.refs.currentStatus.value,
       'pastAberrations': this.refs.pastAberrations.value,
    };
    var insertData = {
      "userId"              : Meteor.userId(),
      "userName"            : Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname,
      "role"                : Meteor.user().roles.find(this.getRole),
      "roleStatus"          : 'VerificationPass-CompanyInfo',
      "msg"                 : 'Submited Company Details',
      "createdAt"           : new Date(),
      "allocatedToUserid"   : '',
      "allocatedToUserName"  : '',
      "companyDetails"      : companyDetails,
    };
    Meteor.call('genericUpdateTicketMasterElement',this.props.ticketId,insertData,function(error,result) {
      if (error) {
        console.log(error.reason);
      }else{
        console.log("added successfully");
      }
    });
  }
  render(){
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad">
         {/*http://localhost:3002/admin/ticket/qmQmswWSvrkxghXuM*/} 
          <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">Type of Ownership :</div>
              <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                <input type="text" name="typeOfOwnersip" ref="typeOfOwnersip" className="form-control" onChange={this.handleChange}/>
              </div>
          </div>
           <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">CIN No. :</div>
              <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                <input type="text" name="cinNo" ref="cinNo" className="form-control" onChange={this.handleChange}/>
              </div>
          </div>
           <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">Registration In. :</div>
              <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                <input type="text" name="registeringIn" ref="registeringIn" className="form-control" onChange={this.handleChange}/>
              </div>
          </div>
           <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">Site Visit :</div>
              <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                <input type="text" name="siteVisit" ref="siteVisit" className="form-control" onChange={this.handleChange}/>
              </div>
          </div>
           <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">Current Status :</div>
              <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                <input type="text" name="currentStatus" ref="currentStatus" className="form-control" onChange={this.handleChange}/>
              </div>
          </div>
           <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">Past Aberrations :</div>
              <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                <input type="text" name="pastAberrations" ref="pastAberrations" className="form-control" onChange={this.handleChange}/>
              </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
            <button type="button" className="btn btn-primary col-lg-2 col-lg-offset-5 col-md-2 col-md-offset-5 col-sm-12 col-xs-12" onClick={this.submitCompanyDetails.bind(this)}>Submit</button>
          </div>
      </div>
    );
  }
}
