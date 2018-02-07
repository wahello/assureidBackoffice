import React,{Component}  from 'react';
import {render} from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import { Invoice } from './api/Invoice.js';

class ServiceInvoice extends TrackerReact(Component){
  constructor(){
    super();
    this.state ={
      invoiceNo       : '',
      serviceId       : '',
      serviceName     : '',
      serviceRate     : '',
      serviceDuration : '',
      userName        : '',
      userId          : '',
      companyName     : '',
      companyAddress  : '',
      companyCity     : '',
      companyState    : '',
      companyCountry  : '',
      companyPincode  : '',
      id              : '', 
      date            : '',
      invoice         : [],
      tax             : [],
      "subscription" : {
        "singleInvoice" : Meteor.subscribe("singleInvoice"),   
      }
    };
  }
  componentWillMount(){
  }
  componentWillUnmount(){
  }
  componentDidMount(){ 
  }
  confirm(event){ 
    event.preventDefault();
    // var path = "/PaymentGateway";
    // browserHistory.replace(path);
    var invoiceDate      = this.props.invoice.createdAt
    var invoiceNo        = this.props.invoice.invoiceNo;
    var serviceId        = this.props.invoice.serviceId;
    var serviceName      = this.props.invoice.serviceName;
    var serviceRate      = this.props.invoice.serviceRate;
    var serviceDuration  = this.props.invoice.serviceDuration;
    var userId           = this.props.invoice.userId;
    var userName         = this.props.invoice.userName;
    var totalAmount      = this.refs.totalAmount.value;    
      Meteor.call("insertTempPayment",invoiceDate,invoiceNo,serviceId,serviceName,serviceRate,serviceDuration,userId,userName,totalAmount,function(error,result){
       if (error) {
        console.log("error",error.reason);
       }else{
        swal("Done");  
        var path = "/PaymentGateway/"+result;
        browserHistory.replace(path);
       }
      });
  }
  totalAmount(){
     var totalTax = 0;
     var rate = parseFloat(this.props.invoice.serviceRate);
     var tax  = this.props.invoice.tax;
     for (var i = 0; i < tax.length; i++){
       totalTax += parseFloat(tax[i].applicableTax);
     }
     var totalAmount = rate + totalTax;
     return totalAmount;
  }invoice
  taxes(){
    return this.props.invoice.tax.map((tax,index) =>{
      return( 
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 invoiceValue" key={index}>
          <span className="pull-left">{tax.taxType}</span>
          <span className="pull-right"><i className="fa fa-rupee"></i> {tax.applicableTax}</span>
        </div>
      );

    });

  }
  render(){
    if(!this.props.loading){
      if(this.props.invoice){ 
      return(
        <div className="outerServiceBlock col-lg-12 col-md-12 col-sm-12 col-xs-1">
          <div className="servieInnerBlock col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
             <h1 className="text-center">Invoice</h1>
               <div className="manageRowAds">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 invoiceCompanyName">
                          <h3>{this.props.invoice.companyName}</h3> 
                        <hr className="horizontalLine" />
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="pull-right bannerInvDate">
                          <div className="bannerTextFont">Date: <span className="bannerSpanTextFont">{moment(this.props.invoice.createdAt).format("DD/MM/YYYY")}</span></div>
                          <div className="bannerTextFont">Invoice Number: <span className="bannerSpanTextFont">{this.props.invoice.invoiceNo}</span></div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 bannerDataTextFont">
                        <div className="bannerTextFont">From,</div>
                        <div className="bannerTextFont">{this.props.invoice.userName}</div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 bannerDataTextFont">
                        <div className="bannerTextFont">To,</div>
                        <div className="bannerTextFont">{this.props.invoice.companyName}</div>
                        <div>{this.props.invoice.companyAddress} ,</div>
                        <div> {this.props.invoice.companyCity} , {this.props.invoice.companyState} ,{this.props.invoice.companyCountry}  -{this.props.invoice.companyPincode}</div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bannerInvMar">
                        <div className="col-lg-4 col-md-4 col-sm-3 col-xs-3 noPadLeftRight">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 invoicetitleHeader">
                            <span>Service Name</span>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 invoiceValue">
                            <span>{this.props.invoice.serviceName}</span>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 noPadLeftRight">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 invoicetitleHeader">
                            <span>Service Duration</span>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 invoiceValue">
                            <span>{this.props.invoice.serviceDuration}</span>
                          </div>
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-6 col-xs-6 noPadLeftRight">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  invoicetitleHeader">
                            <span className="pull-left">Total Amount</span>
                            <span className="pull-right"><i className="fa fa-rupee"></i> {this.totalAmount()}</span>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 invoiceValue">
                            <span className="pull-left">Service Rate</span>
                            <span className="pull-right"><i className="fa fa-rupee"></i> {this.props.invoice.serviceRate}</span>
                          </div>
                          {this.taxes()}
                           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 invoicetitleHeader">
                            <span className="pull-left">Total Amount</span>
                            <span className="pull-right"><i className="fa fa-rupee"></i> {this.totalAmount()}</span>
                            <input type="hiddden" value={this.totalAmount()} ref="totalAmount" name="totalAmount" className="notDisplay" />
                          </div>
                        </div>
                         {/*<table className="table table-bordered">
                           <thead>
                             <tr>
                               <th>Service Name</th>
                               <th>Service Rate</th>
                               <th>Service Duration</th>
                               <th>Total Amount</th>
                             </tr>
                           </thead>
                           <tbody>
                             <tr> 
                               <td>{this.props.invoice.serviceName}</td>
                               <td><i className="fa fa-rupee"></i> {this.props.invoice.serviceRate}</td>
                               <td>{this.props.invoice.serviceDuration}</td>
                               <td><i className="fa fa-rupee"></i> {this.totalAmount()} </td>
                             </tr>
                           </tbody>
                         </table>*/}
                      </div>

                    </div>
                  </div>  
               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerButtonDiv">
                <button  type="submit" className="col-lg-3 col-md-4 col-xs-12 col-sm-12 col-xs-12 btn ServiceProcessButtons pull-right" onClick={this.confirm.bind(this)}>Make Payment</button>
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
 
EditPageContainer = withTracker(({params}) => {
    var _id = params.id;
    // console.log("_id",_id);
    const postHandle = Meteor.subscribe('singleInvoice',_id);
    // var editServices   = this.props.params.id;
    // console.log("Param" +editServices);
    const invoice = Invoice.findOne({"_id":_id});
    // console.log('invoice ', invoice);
    const loading = !postHandle.ready();
    
    if(_id){
      return {
          loading,
          invoice,
      };
    }
})(ServiceInvoice);
export default EditPageContainer;
