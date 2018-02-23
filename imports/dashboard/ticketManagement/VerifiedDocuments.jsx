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
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
             {this.props.getTicket.addressType === "both" ?
                <div>
                   {this.props.firstTicketElen.permanentAddress ?
                      this.props.firstTicketElen.permanentAddress.map((permanentAddrProof, index)=>{
                        return (
                           <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3" key={index}>
                             <img src={permanentAddrProof.proofOfPermanentAddr} className="img-responsive addressImage"/>
                           </div>
                          ); 
                      })
                      :
                      ""
                   }
                 
                   {this.props.firstTicketElen.currentAddress ?
                      this.props.firstTicketElen.currentAddress.map((currentAddrProof, index)=>{
                        return (
                           <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3" key={index}>
                            <img src={currentAddrProof.proofOfCurrentAddr} className="img-responsive addressImage"/>
                           </div>
                          );
                      })
                      :
                      ""
                   }
                 </div>
                :
                ""
             }
             {this.props.getTicket.addressType === "permanentAddress" ?
                <div>
                   {this.props.firstTicketElen.permanentAddress ?
                      this.props.firstTicketElen.permanentAddress.map((permanentAddrProof, index)=>{
                        return (
                           <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3" key={index}>
                            <img src={permanentAddrProof.proofOfPermanentAddr} className="img-responsive addressImage"/>
                           </div>
                          );
                      })
                      :
                      ""
                   }     
                 </div>
                :
                ""
             }
             {this.props.getTicket.addressType === "currentAddress" ?
                <div>
                   {this.props.firstTicketElen.currentAddress ?
                      this.props.firstTicketElen.currentAddress.map((currentAddrProof, index)=>{
                        return (
                           <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3" key={index}>
                            <img src={currentAddrProof.proofOfCurrentAddr} className="img-responsive addressImage"/>
                           </div>
                          );
                      })
                      :
                      ""
                   }
                 </div>
                :
                ""
             }

          </div>
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
    if (getTicket) {
      var ticketElement = getTicket.ticketElement;
      console.log("ticketElement",ticketElement);
      if (ticketElement) {
         var firstTicketElen = ticketElement[0];
        console.log("firstTicketElen",firstTicketElen);
      }
     
    }
    
    
    const loading = !postHandle.ready();

    // if(_id){
      return {
          loading  : loading,
          getTicket : getTicket,
          firstTicketElen : firstTicketElen,
      };
    // }
})(VerifiedDocuments);
export default verifiedDocumentsContainer;
