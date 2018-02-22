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

class VerifiedDocuments extends TrackerReact(Component){
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
    if (!this.props.loading) {
     return(            
        <div className="verifiedDocumentsWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="verifiedDocumentsHeader text-left col-lg-12 col-md-12 col-sm-12 col-xs-12">
             <h5>Verify Documents :</h5>
          </div>
          {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
             {this.getTicket.addressType === "both" ?
                <div className="col-lg-3 col-md-3 col-sm- col-xs-12" style={{height: "200"+"px"}}>
                  <a href="" data-toggle="modal" data-target="#proofModals"><img src={this.props.basicValues.proofOfDOB} style={{maxWidth: "100"+"%",maxHeight: "100"+"%"}} /></a>
                  <i className="fa fa-times-circle timeCircle" onClick={this.removeProofDocs.bind(this)} data-value={this.props.basicValues.proofOfDOB}></i>
                </div> 
             }
          </div>*/}
        </div>    
      );  
   }else{
    return(
       <span>Loading</span>
      );
   }
   
  }
}
verifiedDocumentsContainer = withTracker(props => {
  console.log('props: ',this.props);
    var _id = props.ticketId;
    console.log("_id",_id);
    const postHandle = Meteor.subscribe('singleTicket',_id);
    const getTicket  = TicketMaster.findOne({"_id" : _id}) || {};  
    console.log("getTicket",getTicket); 
    
    const loading = !postHandle.ready();

    // if(_id){
      return {
          loading  : loading,
          getTicket : getTicket,
      };
    // }
})(VerifiedDocuments);
export default verifiedDocumentsContainer;
