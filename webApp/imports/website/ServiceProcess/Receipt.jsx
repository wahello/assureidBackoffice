import React,{Component} from 'react';
import {render} from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import { Order } from './api/Order.js';

class Receipt extends TrackerReact(Component){
  constructor(){
    super();
    this.state ={
      "subscription" : {
        "singleTempOrder" : Meteor.subscribe("singleTempOrder"),
      }
    };
  }
  componentWillMount(){
  }
  componentWillUnmount(){
  }
  componentDidMount(){ 
    $('html, body').scrollTop(0);
  }
  
  
  render(){
   if(!this.props.loading){
      if(this.props.order){ 
        return(
          <div className="outerServiceBlock col-lg-12 col-md-12 col-sm-12 col-xs-1">
            <div className="servieInnerBlock col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="col-lg-4 col-lg-offset-4 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                <h1 className="text-center">Receipt</h1>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerButtonDiv">
                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-left">
                          Order No <span className="pull-right">:</span>
                        </div>
                        
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-left">
                          <p>{this.props.order.orderNo}</p>
                        </div>     
                     </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerButtonDiv">
                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-left">
                          Transaction ID <span className="pull-right">:</span>
                        </div>
                        
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-left">
                          <p></p>
                        </div>     
                     </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerButtonDiv">
                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-left">
                         Service Name <span className="pull-right">:</span>
                        </div>
                        
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-left">
                          <p>{this.props.order.serviceName}</p>
                        </div>     
                     </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerButtonDiv">
                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-left">
                          Service Duration <span className="pull-right">:</span>
                        </div>
                        
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-left">
                          <p>{this.props.order.serviceDuration}</p>
                        </div>     
                     </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerButtonDiv">
                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-left">
                          Total Amount <span className="pull-right">:</span>
                        </div>
                        
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-left">
                          <p><i className="fa fa-rupee"></i>{this.props.order.totalAmount}</p>
                        </div>     
                     </div>
                  </div>

              </div>
            </div>
          </div>
        );
      }
    }else{
      return(<span>Data not available</span>);
    }
  }
}

ReceiptContainer = withTracker(({params}) => {
    var _id = params.id;
    // console.log("_id",_id);
    const postHandle = Meteor.subscribe('singleOrder',_id);
    // var editServices   = this.props.params.id;
    // console.log("Param" +editServices);
    const order = Order.findOne({"_id":_id});
    // console.log('invoice ', invoice);
    const loading = !postHandle.ready();
    
    if(_id){
      return {
          loading,
          order,
      };
    }
})(Receipt);
export default ReceiptContainer;
