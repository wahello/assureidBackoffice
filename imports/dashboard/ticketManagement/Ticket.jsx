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

export default class Ticket extends TrackerReact(Component){
  constructor(props){
    super(props);
    this.state = {
      "subscription" : {
        "singleTicket" : Meteor.subscribe("singleTicket"),      
      } 
    }
  }

	 render(){
    // console.log("id = ",this.props.params.id);
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
                       <div className="ticketPills col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     
                       </div>
                       <UserInformation ticketId={this.props.params.id}/>
                       <ServiceInformation ticketId={this.props.params.id}/>
                       <VerifiedDocuments ticketId={this.props.params.id}/>
                       <ScreeningCommittee />
                     </div> 
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>    
    );
   }
}
