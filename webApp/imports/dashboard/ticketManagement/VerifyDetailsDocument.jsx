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

class VerifyDetailsDocument extends TrackerReact(Component){
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
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singledocwrp">     
            {/* <h5 className="h5Style">Verify Document:</h5> */}
                 
        {
            this.props.getTicket.addressType == "currentAddress" ?
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 ">
                       <h5 className="dataDetails"> Current Address</h5>
                       
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad addressdetails">
                        {this.props.getTicket.ticketElement[0].currentAddress[0].tempLine1}
                        {this.props.getTicket.ticketElement[0].currentAddress[0].tempLine2}
                        {this.props.getTicket.ticketElement[0].currentAddress[0].tempLine3}
                        {this.props.getTicket.ticketElement[0].currentAddress[0].tempLandmark}
                        {this.props.getTicket.ticketElement[0].currentAddress[0].tempCity},{this.props.getTicket.ticketElement[0].currentAddress[0].tempState},{this.props.getTicket.ticketElement[0].currentAddress[0].tempPincode},
                      

                          
                        </div>
                    </div>                
                </div>
            :
            ""
        }
        {  this.props.getTicket.addressType == "permanentAddress" ?
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h5 className="dataDetails">Permanent Address</h5>
                
                <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noLRPad addressdetails">
                    {this.props.getTicket.ticketElement[0].permanentAddress[0].line1}
                    {this.props.getTicket.ticketElement[0].permanentAddress[0].line2}
                    {this.props.getTicket.ticketElement[0].permanentAddress[0].line3},&nbsp;
                    {this.props.getTicket.ticketElement[0].permanentAddress[0].landmark}
                    {this.props.getTicket.ticketElement[0].permanentAddress[0].city},{this.props.getTicket.ticketElement[0].permanentAddress[0].state},{this.props.getTicket.ticketElement[0].permanentAddress[0].country},{this.props.getTicket.ticketElement[0].permanentAddress[0].pincode}
                    </div>
                </div>       
            </div>
            :
            ""
        }
        </div>
      );  
   }else{
    return(
       <span>Loading</span>
      );
   }
   
  }
}
verifyDetailsDocumentsContainer = withTracker(props => {  
    var _id = props.ticketId;
    const postHandle = Meteor.subscribe('singleTicket',_id);
    const getTicket  = TicketMaster.findOne({"_id" : _id}) || {}; 
    const loading = !postHandle.ready();

    // if(_id){
      return {
          loading  : loading,
          getTicket : getTicket,
        //   firstTicketElen : firstTicketElen,
      };
})(VerifyDetailsDocument);
export default verifyDetailsDocumentsContainer;
