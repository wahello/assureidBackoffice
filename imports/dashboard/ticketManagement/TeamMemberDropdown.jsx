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

export default class TeamMemberDropdown extends TrackerReact(Component){
	constructor(props){
    super(props);
    this.state = {

      "subscription" : {
        "allTickets" : Meteor.subscribe("allTickets"), 
        "userfunction" : Meteor.subscribe('userfunction'),
      } 
    }
  }
  acceptTicket(event){
    $(event.target).css({'backgroundColor':'#00b8ff','color':'#fff'});
    $(event.target).siblings().css({'backgroundColor':'#fff','color':'#00b8ff'});
    var path = "/admin/ticketdocumentdetails";
    browserHistory.replace(path);

  }
  rejectTicket(event){
    event.preventDefault();
    $(event.target).parent().parent().siblings('.otherInfoFormGroup').slideUp();
    $(event.target).css({'backgroundColor':'#00b8ff','color':'#fff'});
    $(event.target).siblings().css({'backgroundColor':'#fff','color':'#00b8ff'});
    // $(event.target).parent().parent().siblings().children().find('textarea').attr('disabled','disabled');
  }
  
  render(){
    return(            
      <div className="verifiedDocumentsWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="verifiedDocumentsHeader text-left col-lg-3 col-md-12 col-sm-12 col-xs-12">
           <h5>Accept Or Reject</h5>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 otherInfoForm">
          <div className="col-lg-7 col-md-4 col-sm-6 col-xs-6">
              <button type="button" className="btn btn-info acceptreject" onClick={this.acceptTicket.bind(this)}>Accept</button>
              <button type="button" className="btn btn-info acceptreject" onClick={this.rejectTicket.bind(this)}>Reject</button>
          </div>
        </div>
      </div>    
    );
  }
}