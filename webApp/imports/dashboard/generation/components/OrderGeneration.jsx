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
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding orderinfodiv">
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">Name <span className="pull-right">:</span></div>
              <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">{this.props.getOrder ? this.props.getOrder.userName : "-"}</div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding orderinfodiv">
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">Order Reference <span className="pull-right">:</span></div>
              <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">{this.props.getOrder ? this.props.getOrder.orderNo : "-"}</div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding orderinfodiv">
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">Order Date <span className="pull-right">:</span></div>
              <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">{this.props.getOrder ? moment(this.props.getOrder.createdAt).format('DD-MM-YYYY') : "-"}</div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding orderinfodiv">
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">Report Level <span className="pull-right">:</span></div>
              <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">Standard</div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding orderinfodiv">
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">Account <span className="pull-right">:</span></div>
              <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">-</div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding orderinfodiv">
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">Client Reference <span className="pull-right">:</span></div>
              <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">-</div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding orderinfodiv">
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">Report Date <span className="pull-right">:</span></div>
              <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">{this.props.getOrder ? moment(this.props.getOrder.completedDate).format('DD-MM-YYYY') : "-"} </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding orderinfodiv">
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">Result <span className="pull-right">:</span></div>
              <div className={"col-lg-8 col-md-8 col-sm-8 col-xs-8 "+this.props.textColor}><b>{this.props.getOrder ? this.props.getOrder.orderStatus : "-"}</b></div>
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
          <h3>SUMMARY OF FINDINGS</h3>
          <ul>
          {
            this.props.getOrder ?
              this.props.getOrder.ticket.map((summary,index)=>{
                return(
                  <li key={index}>{summary.summeryFinding}</li>
                )
              })
            :
            null
          }
          </ul>
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
    var tempStatus = '' ; 
    // for(i= 0 ; i < getOrder.ticket.length ; i++){
    //   if(getOrder.ticket[i].status == 'Inaccessible'){
    //     var orderStatus = 'INACCESSIBLE';
    //     break;
    //   }else if(getOrder.ticket[i].status == 'Major Discrepancy'){
    //     var orderStatus = 'INACCESSIBLE';
    //     break;
    //   }
    // }
    var allTicketStatus = getOrder.ticket; 
    var orderStatus = allTicketStatus.find(function (obj) { return obj.status == 'Inaccessible' });
    if(!orderStatus){
      orderStatus = allTicketStatus.find(function (obj) { return obj.status == 'Major Discrepancy' });
      if(!orderStatus){
        orderStatus = allTicketStatus.find(function (obj) { return obj.status == 'Minor Discrepancy' });
        if(!orderStatus){
          orderStatus = allTicketStatus.find(function (obj) { return obj.status == 'Clear' });
          if(!orderStatus){
            getOrder.orderStatus = 'Not Verified';
            var textColor = 'text-danger';  
          }else{
            getOrder.orderStatus = 'Clear';    
            var textColor = 'text-success';
          }
        }else{
          getOrder.orderStatus = 'Minor Discrepancy';  
          var textColor = 'text-success';
        }
      }else{
        getOrder.orderStatus = 'Major Discrepancy';
        var textColor = 'text-warning';
        // var textColor = {
        //   background
        // };
      }
    }else{
      getOrder.orderStatus = 'Inaccessible';
      var textColor = 'text-warning';
    }
  }
  // console.log("")
  // console.log("textColor",textColor);
return{
  getOrder,
  textColor
}
})(OrderGeneration);