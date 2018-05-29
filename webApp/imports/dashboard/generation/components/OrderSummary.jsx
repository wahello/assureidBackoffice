import React, {Component} from 'react';
import {render} from 'react-dom';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import {Router, Route, browserHistory} from 'react-router';
import { TicketMaster } from '/imports/website/ServiceProcess/api/TicketMaster.js';



class OrderSummary extends TrackerReact(Component){
  constructor(props){
    super(props);
    this.state ={ 
      "subscription" : { 
      } 
    };
  }


  render(){
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">
          {/* <h3>EXECUTIVE SUMMARY</h3> */}
          <table className="table table-bordered generationTable">
            <thead>
              <tr>
                <th colSpan='3'>{this.props.getTicket ? this.props.getTicket.serviceName : " - "}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                    {
                        this.props.getTicket && this.props.getTicket.verificationType =="permanentAddress" ?
                            <div>
                            <span>Premanent Address</span>, &nbsp;
                            <span>{this.props.getTicket.verificationData.line1}</span>
                            <span>{this.props.getTicket.verificationData.line2}</span>
                            <span>{this.props.getTicket.verificationData.line3}</span><br/>
                            <span>{this.props.getTicket.verificationData.landmark}</span><br/>
                            <span>{this.props.getTicket.verificationData.city}</span>, &nbsp;
                            <span>{this.props.getTicket.verificationData.state}</span>, &nbsp;
                            <span>{this.props.getTicket.verificationData.country}</span>, &nbsp;
                            <span>{this.props.getTicket.verificationData.pincode}</span>, &nbsp;
                            <span>{this.props.getTicket.verificationData.residingFrom}</span>, &nbsp;
                            <span>{this.props.getTicket.verificationData.residingTo}</span>, &nbsp;
                            
                            </div>
                        :
                        this.props.getTicket && this.props.getTicket.verificationType == "currentAddress" ?
                        
                            <div>
                                <span>Current Address</span>                        
                                <span>{this.props.getTicket.verificationData.tempLine1}</span>
                                <span>{this.props.getTicket.verificationData.tempLine2}</span>
                                <span>{this.props.getTicket.verificationData.tempLine3}</span><br/>
                                <span>{this.props.getTicket.verificationData.tempLandmark}</span><br/>
                                <span>{this.props.getTicket.verificationData.tempCity}</span>, &nbsp;
                                <span>{this.props.getTicket.verificationData.tempState}</span>, &nbsp;
                                <span>{this.props.getTicket.verificationData.tempCountry}</span>, &nbsp;
                                <span>{this.props.getTicket.verificationData.tempPincode}</span>, &nbsp;
                                <span>{this.props.getTicket.verificationData.tempresidingFrom}</span>, &nbsp;
                                <span>{this.props.getTicket.verificationData.tempresidingTo}</span>, &nbsp;
                        
                            </div>

                        :
                        this.props.getTicket && this.props.getTicket.verificationType == "employement" ?
                            <div>
                                <span>{this.props.getTicket.verificationData.nameOfEmployer}</span>
                                <span>Pune</span>
                            </div>
                        :

                        null
                        
                    }
                </td>
                <td>Verified</td>
                <td>{this.props.getTicket ? this.props.finalStatus: "-"}</td>
              </tr>
              {/* <tr>
                <td>Segreto Technologies Pvt. Ltd, Pune</td>
                <td>Verified</td>
                <td>Inaccessible for Verification</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}export default OrderSummaryContainer = withTracker(props => {
  //Get id from the props
  var ticketId = props.ticketId;
  var handleSinTick = Meteor.subscribe("singleTicket",ticketId);
  var loading = !handleSinTick.ready();
  
  if(ticketId){
     var getTicket = TicketMaster.findOne({"_id":ticketId});
     console.log('getTicket: ', getTicket);
     if(getTicket){
     var statusName  =  getTicket.reportGenerated.documents.documents.status;
     var splitName   =  statusName.split('-');
     var finalStatus =  splitName[1]; 
        
     }
    //  if(ticketId.serviceName == "Address Verification"){
    //      if(ticketId.verificationType == "permanentAddress"){

    //      }
    //  }
    
  }

    return{
    getTicket,
    finalStatus
    }
})(OrderSummary);