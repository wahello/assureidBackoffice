import React,{Component} from 'react';
import {render} from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import { TempOrder } from './api/Order.js';

class PaymentGateway extends TrackerReact(Component){
  constructor(){
    super();
    this.state ={
      "subscription" : {
        "singleTempOrder" : Meteor.subscribe("singleTempOrder"),
      }
    };
    // this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount(){
  }
  componentWillUnmount(){
  }
  componentDidMount(){ 
    $('html, body').scrollTop(0);
  }
  confirmPayment(event){ 
    event.preventDefault();
    // var path = "/PaymentGateway";
    // browserHistory.replace(path);
    var invoiceDate      = this.props.tempOrder.createdAt
    var invoiceNo        = this.props.tempOrder.invoiceNo;
    var serviceId        = this.props.tempOrder.serviceId;
    var serviceName      = this.props.tempOrder.serviceName;
    var serviceRate      = this.props.tempOrder.serviceRate;
    var serviceDuration  = this.props.tempOrder.serviceDuration;
    var userId           = this.props.tempOrder.userId;
    var userName         = this.props.tempOrder.userName;
    var totalAmount      = this.props.tempOrder.totalAmount;
    var delieveryStatus  = {
      "status" : "New Order",
      "createdAt" : new Date(),
    };

      Meteor.call("insertOrder",invoiceDate,invoiceNo,serviceId,serviceName,serviceRate,serviceDuration,userId,userName,totalAmount,delieveryStatus,function(error,result){
       if (error) {
        console.log("error",error.reason);
       }else{
        swal("Done");  
        var path = "/Receipt/"+result;
        browserHistory.replace(path);
       }
      });
  }
  
  render(){
    return(
      <div className="outerServiceBlock col-lg-12 col-md-12 col-sm-12 col-xs-1">
        <div className="servieInnerBlock col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
            <h1 className="text-center">Payment Gateway</h1>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerButtonDiv">
                <button  type="submit" className="col-lg-3 col-md-4 col-xs-12 col-sm-12 col-xs-12 btn ServiceProcessButtons pull-right" onClick={this.confirmPayment.bind(this)}>Confirm Payment</button>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

PaymentGatewayContainer = withTracker(({params}) => {
    var _id = params.id;
    // console.log("_id",_id);
    const postHandle = Meteor.subscribe('singleTempOrder',_id);
    // var editServices   = this.props.params.id;
    // console.log("Param" +editServices);
    const tempOrder = TempOrder.findOne({"_id":_id});
    // console.log('tempOrder ', tempOrder);
    const loading = !postHandle.ready();
    
    if(_id){
      return {
          loading,
          tempOrder,
      };
    }
})(PaymentGateway);
export default PaymentGatewayContainer;
