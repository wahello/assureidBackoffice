import React, {Component} from 'react';
import {render} from 'react-dom';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import {Router, Route, browserHistory} from 'react-router';
import { TicketMaster } from '/imports/website/ServiceProcess/api/TicketMaster.js';
import { Order} from '/imports/website/ServiceProcess/api/Order.js';
import OrderSummary from '/imports/dashboard/generation/components/OrderSummary.jsx';
import ReportGeneration from '/imports/dashboard/generation/components/ReportGeneration.jsx';


class OrderGeneration extends TrackerReact(Component){
  constructor(props){
    super(props);
    this.state ={ 
      "subscription" : { 
      } 
    };
  }
  componentDidMount(){      
  }

  render(){
    return (
      <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 orderGenerationwrap">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding generationHeader"> 
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 pull-left">
            <img src="../images/assureid/Assure-ID-logo-Grey.png" className="generationImg" />
          </div>
          <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
            <h1 className="pull-right">FINAL SCREENING REPORT</h1>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 generationInfo">
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <div>
              <p className="col-lg-4 col-md-4 col-sm-4 col-xs-4">Name :</p>
              <p className="col-lg-8 col-md-8 col-sm-8 col-xs-8">{this.props.getOrder ? this.props.getOrder.userName : "-"}</p>
            </div>
            <div>
              <p className="col-lg-4 col-md-4 col-sm-4 col-xs-4">Order Reference :</p>
              <p className="col-lg-8 col-md-8 col-sm-8 col-xs-8">{this.props.getOrder ? this.props.getOrder.orderNo : "-"}</p>
            </div>
            <div>
              <p className="col-lg-4 col-md-4 col-sm-4 col-xs-4">Order Date :</p>
              <p className="col-lg-8 col-md-8 col-sm-8 col-xs-8">{this.props.getOrder ? moment(this.props.getOrder.createdAt).format('DD-MM-YYYY') : "-"}</p>
            </div>
            <div>
              <p className="col-lg-4 col-md-4 col-sm-4 col-xs-4">Report Level :</p>
              <p className="col-lg-8 col-md-8 col-sm-8 col-xs-8">Standard</p>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <div>
              <p className="col-lg-4 col-md-4 col-sm-4 col-xs-4">Account :</p>
              <p className="col-lg-8 col-md-8 col-sm-8 col-xs-8">-</p>
            </div>
            <div>
              <p className="col-lg-4 col-md-4 col-sm-4 col-xs-4">Client Reference :</p>
              <p className="col-lg-8 col-md-8 col-sm-8 col-xs-8">-</p>
            </div>
            <div>
              <p className="col-lg-4 col-md-4 col-sm-4 col-xs-4">Report Date :</p>
              <p className="col-lg-8 col-md-8 col-sm-8 col-xs-8">{this.props.getOrder ? moment(this.props.getOrder.completedDate).format('DD-MM-YYYY') : "-"} </p>
            </div>
            <div>
              <p className="col-lg-4 col-md-4 col-sm-4 col-xs-4">Result :</p>
              <p className="col-lg-8 col-md-8 col-sm-8 col-xs-8">{this.props.getOrder ? this.props.getOrder.orderStatus : "-"}</p>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">
          <h3>EXECUTIVE SUMMARY</h3>
          { 
            this.props.getOrder ?
             this.props.getOrder.ticket.map((ticketData,index)=>{
                // ticketData.report !="" ?
                return(
                  <div key={index}>
                    <OrderSummary ticketId={ticketData.ticketId}/>
                  </div>
                )
                // :
                // null
              
             })
             :
             null
          }
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">
          
          { 
            this.props.getOrder ?
             this.props.getOrder.ticket.map((ticketData,index)=>{
                // ticketData.report !="" ?
                return(
                  <div key={index}>
                    <ReportGeneration ticketId={ticketData.ticketId}/>
                  </div>
                )
                // :
                // null
              
             })
             :
             null
          }
        </div>
      </div>
    );
  }
}export default OrderGenerationContainer = withTracker(props => {
  //Get id from the props
  var idValue = props.ticketId;
  if(!idValue){
    //Get the ticket id from the url
    var currentLocation = browserHistory.getCurrentLocation();
    if(currentLocation){
      var splitUrl = currentLocation.pathname.split('/');
      var url = splitUrl[2]; 
      
      idValue= url;
    }
  }
  var handleSinTick = Meteor.subscribe("singleOrder",idValue);
  var loading = !handleSinTick.ready();
  var getOrder = Order.findOne({"_id":idValue});
  if(getOrder){
  }

return{
  getOrder
}
})(OrderGeneration);