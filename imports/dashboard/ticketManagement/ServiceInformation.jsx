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
// import { Services } from '../reactCMS/api/Services.js';

class ServiceInformation extends TrackerReact(Component){   
  constructor(props){
    super(props); 
    this.state = {
      "subscription" : {
        "allTickets" : Meteor.subscribe("allTickets"),  
        // "services" : Meteor.subscribe('services'),
      } 
    } 
  } 
  // serviceData(){
	 //  var getTicket = TicketMaster.findOne({"_id" : this.props.ticketId});
  // 	if (getTicket) {
  //      var service = Services.findOne({"_id" : getTicket.serviceId});
  //      return(
  //      	 <div>
  //         <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
	 //          <img src={service.image} className="ticketUserImage" />
	 //        </div>
	 //         <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 outerTickeBlock noPadLeftRight">
	 //          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
	 //            <div className="col-lg-5 col-md-4 col-sm-4 col-xs-4 text-left userLabel">
  //              Ticket #<span className="pull-right">:</span>
  //             </div>  
  //             <div className="col-lg-7 col-md-8 col-sm-8 col-xs-8 text-left userValue">
  //               <p>{getTicket.ticketNumber}</p>
  //             </div> 
	 //          </div>
  //           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
  //             <div className="col-lg-5 col-md-4 col-sm-4 col-xs-4 text-left userLabel">
  //              Service Name<span className="pull-right">:</span>
  //             </div>  
  //             <div className="col-lg-7 col-md-8 col-sm-8 col-xs-8 text-left userValue">
  //               <p>{getTicket.serviceName}</p>
  //             </div> 
  //           </div> 
  //           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
  //             <div className="col-lg-5 col-md-4 col-sm-4 col-xs-4 text-left userLabel">
  //             Date :<span className="pull-right">:</span>
  //             </div>  
  //             <div className="col-lg-7 col-md-8 col-sm-8 col-xs-8 text-left userValue">
  //               {/* <p>{getTicket.createdAt}</p> */}
  //               <p> - </p>
  //             </div>  
  //           </div>   
            
	 //        </div>
  //      	 </div>
  //      	);
  // 	}
  // } 
  render(){
    if (!this.props.loading) {
     return(            
        <div className="ticketServiceWrapper col-lg-12 col-md-6 col-sm-6 col-xs-6">
          {/* {this.serviceData()} */}
          <div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
              <img src={this.props.getTicket.serviceImage} className="ticketUserImage" />
            </div>
             <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 outerTickeBlock noPadLeftRight">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
                <div className="col-lg-5 col-md-4 col-sm-4 col-xs-4 text-left userLabel">
                 Ticket #<span className="pull-right">:</span>
                </div>  
                <div className="col-lg-7 col-md-8 col-sm-8 col-xs-8 text-left userValue">
                  <p>{this.props.getTicket.ticketNumber}</p>
                </div> 
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
                <div className="col-lg-5 col-md-4 col-sm-4 col-xs-4 text-left userLabel">
                 Service Name<span className="pull-right">:</span>
                </div>  
                <div className="col-lg-7 col-md-8 col-sm-8 col-xs-8 text-left userValue">
                  <p>{this.props.getTicket.serviceName}</p>
                </div> 
              </div> 
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadLeftRight">
                <div className="col-lg-5 col-md-4 col-sm-4 col-xs-4 text-left userLabel">
                Date :<span className="pull-right">:</span>
                </div>  
                <div className="col-lg-7 col-md-8 col-sm-8 col-xs-8 text-left userValue">
                  <p>{moment(this.props.getTicket.createdAt).format("DD/MM/YYYY")}</p> 
                {/*  <p> - </p>*/}
                </div>  
              </div>   
              
            </div>
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
serviceContainer = withTracker(props => {
  console.log('props: ',this.props);
    var _id = props.ticketId;
    // console.log("_id",_id);
    const postHandle = Meteor.subscribe('singleTicket',_id);
    const getTicket  = TicketMaster.findOne({"_id" : _id}) || {};  
    // console.log("getTicket",getTicket); 
   
    const loading = !postHandle.ready();

    // if(_id){
      return {
          loading  : loading,
          getTicket : getTicket,
      };
    // }
})(ServiceInformation);
export default serviceContainer;

