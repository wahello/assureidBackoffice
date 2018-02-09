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

export default class ScreeningCommittee extends TrackerReact(Component){
	constructor(props){
    super(props);
    this.state = {

      "subscription" : {
        "allTickets" : Meteor.subscribe("allTickets"), 
        "userfunction" : Meteor.subscribe('userfunction'),
      } 
    }
  }
  render(){
    return(            
      <div className="verifiedDocumentsWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="verifiedDocumentsHeader text-left col-lg-12 col-md-12 col-sm-12 col-xs-12">
           <h5>Accept Or Rejected</h5>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
              <button type="button" className="btn btn-info" onClick={this.yesReason.bind(this)}>Yes</button>
              <button type="button" className="btn btn-info" onClick={this.noReason.bind(this)}>No</button>
        </div>
        </div>
      </div>    
    );
  }
}