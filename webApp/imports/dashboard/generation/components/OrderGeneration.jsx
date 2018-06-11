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
  downloadOrderaspdf(event){
    event.preventDefault();
    var doc = new jsPDF();
    // console.log("doc",doc);          
    var elementHandler = {
      '#orderGenerationwrap': function (element, renderer) {
        return true;
      }
    };
    // console.log("elementHandler",elementHandler);          

    doc.fromHTML($('#orderGenerationwrap').html(), 15, 15, {
              'width': 170,
            'elementHandlers': elementHandler
    });
    doc.save('Order.pdf');
    // html2canvas($("#outerInvoiceBlock"), {
    //     onrendered: function(canvas) {
    //         document.body.appendChild(canvas);
    //         var imgData = canvas.toDataURL("image/png");
    //         var doc     = new jsPDF('p', 'mm');
    //         doc.addImage = (imgData,'JPEG',20,20);
    //         doc.save('Invoice.pdf');
    //     }
    // });
  }
  componentDidMount(){      
  }
  render(){
    return (
      <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 orderGenerationwrap" id="orderGenerationwrap">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding generationHeader"> 
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 pull-left">
            <img src="../images/assureid/Assure-ID-logo-Grey.png" className="generationImg" />
          </div>
          <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
           <div className="col-lg-11 col-md-11 col-sm-12 col-xs-12">
             <h1 className="pull-right">FINAL SCREENING REPORT</h1>
           </div>
           <div className="col-lg-1 col-md-1 col-sm-12 col-xs-12 outerpdficonatorder">
              <i className="fa fa-file-pdf-o pull-right fa-2x pdf-icon" title="Download as pdf" onClick={this.downloadOrderaspdf.bind(this)}></i>
            </div>
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
                return(
                  <div key={index}>
                    <OrderSummary ticketId={ticketData.ticketId}/>
                  </div>
                )
             })
             :
             null
          }
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <h3 className="orderHeadStyle">SUMMARY OF FINDINGS</h3>
          <ul className="col-lg-12 orderHeadStyle">
          {
            this.props.summaryFinding ?
              this.props.summaryFinding.map((summary,index)=>{
                  return summary.text != undefined ? 
                    <li className= "showLi" key={index}>{summary.text}</li>
                  :
                    <div>hello</div>
              })
            :
            <div>hi</div>
          }
          </ul>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">
          
          { 
            this.props.getOrder ?
             this.props.getOrder.ticket.map((ticketData,index)=>{
                return(
                  <div key={index}>
                    <ReportGeneration ticketId={ticketData.ticketId}/>
                  </div>
                )
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
  var handleTick = Meteor.subscribe("allTickets");
  var loading = !handleSinTick.ready();
  var getOrder = Order.findOne({"_id":idValue});
  if(getOrder){
    //status of order
    var tempStatus = '' ; 
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
      }
    }else{
      getOrder.orderStatus = 'Inaccessible';
      var textColor = 'text-warning';
    }

    //Summary Findings of all the tickets
    var caseDrop = [];
    var cancelled = [];
    var unableToVerify = [];
    var inaccessible = [];
    var majorDiscrepancy = [];
    var minorDiscrepancy = [];
    var clear = [];

    for(i = 0 ; i < getOrder.ticket.length; i++ ){
      var ticketDetails = TicketMaster.findOne({"_id":getOrder.ticket[i].ticketId});
      if(ticketDetails){
        var data = {
          ticketNumber : ticketDetails.ticketNumber,
          ticketStatus : '-',
        };
        if(ticketDetails.verificationType == 'employement'){
          data.ticketInfo = ticketDetails.verificationData.nameOfEmployer;
          data.ticketVerification = 'Employement Verification';
        }else if(ticketDetails.verificationType == 'permanentAddress'){
          data.ticketInfo = ticketDetails.verificationData.line1 + ' , ' +ticketDetails.verificationData.line2 + ', ' + ticketDetails.verificationData.line3 + ' , ' + ticketDetails.verificationData.landmark + ' , ' + ticketDetails.verificationData.city + ' , ' + ticketDetails.verificationData.state + ' , ' + ticketDetails.verificationData.pincode;
          data.ticketVerification = 'Address Verification';
        }else if(ticketDetails.verificationType == 'currentAddress'){
          data.ticketInfo = ticketDetails.verificationData.templine1 + ' , ' +ticketDetails.verificationData.templine2 + ', ' + ticketDetails.verificationData.templine3 + ' , ' + ticketDetails.verificationData.templandmark + ' , ' + ticketDetails.verificationData.tempcity + ' , ' + ticketDetails.verificationData.tempstate + ' , ' + ticketDetails.verificationData.temppincode;
          data.ticketVerification = 'Address Verification';
        }else if(ticketDetails.verificationType == 'education'){
          data.ticketInfo = ticketDetails.verificationData.collegeName + ' - ' + ticketDetails.verificationData.university;
          data.ticketVerification = 'Education Verification';
        }

        var ticketStatus = ticketDetails.reportGenerated.documents.status.split('-');
        if(ticketStatus){
          data.ticketStatus = ticketStatus[1];
          switch(ticketStatus[1]){
            case 'Case Drop':
              caseDrop.push(data);
              break;
            case 'Cancelled' :
              cancelled.push(data);
              break;
            case 'Unable to Verify' : 
              unableToVerify.push(data);
              break;
            case 'Inaccessible' :
              inaccessible.push(data);
              break;
            case 'Major Discrepancy' :
              majorDiscrepancy.push(data);
              break;
            case 'Minor Discrepancy' :
              minorDiscrepancy.push(data);
              break;
            case 'Clear' :
              clear.push(data);
              break;
          }  //EOF switch 

          console.log('caseDrop ',caseDrop);
          var caseDropSummaryFinding = 'are dropped';
          var cancelledSummaryFinding = 'are cancelled';
          var unableToVerifiySummaryFinding = 'were unable to verify';
          var inaccessibleSummaryFinding = 'seems to be wrong. Either we could not find this address or the address was inaccessible to us.';
          var clearSummaryFinding = 'are clear and looking good to us.';
          var minorDiscrepancySummaryFinding = 'are clear with minor Discrepany.';
          var majorDiscrepancySummaryFinding = 'Were not cleared due to manjor discrepancy.';

          var summaryFinding = [];
          if(caseDrop.length != 0){
            console.log('caseDrop 0',caseDrop);
            if(caseDrop.length == 1){
              var text = caseDrop[0].ticketInfo + ' , ' + caseDrop[0].ticketVerification + caseDropSummaryFinding;
            }else{
              var text = '';
              for(j = 0 ; j < caseDrop.length; j++){
                var text = text + caseDrop[j].ticketInfo + ' , ' + caseDrop[j].ticketVerification + ' , '
              }
              text = text + caseDropSummaryFinding;
            }
            var summary = {
              text : text,
            }
            summaryFinding.push(summary);
          }//EOF Case Drop

          if(cancelled.length != 0){
            if(cancelled.length == 1){
              var text = cancelled[0].ticketInfo + ' , ' + cancelled[0].ticketVerification + cancelledSummaryFinding;
            }else{
              var text = '';
              for(j = 0 ; j < cancelled.length; j++){
                var text = text + cancelled[j].ticketInfo + ' , ' + cancelled[j].ticketVerification + ' , '
              }
              text = text + cancelledSummaryFinding;
            }
            var summary = {
              text : text,
            }
            summaryFinding.push(summary);
          }//EOF Cancelled

          if(unableToVerify.length != 0){
            if(unableToVerify.length == 1){
              var text = unableToVerify[0].ticketInfo + ' , ' + unableToVerify[0].ticketVerification + unableToVerifiySummaryFinding;
            }else{
              var text = '';
              for(j = 0 ; j < unableToVerify.length; j++){
                var text = text + unableToVerify[j].ticketInfo + ' , ' + unableToVerify[j].ticketVerification + ' , '
              }
              text = text + unableToVerifiySummaryFinding;
            }
            var summary = {
              text : text,
            }
            summaryFinding.push(summary);
          }//EOF Unable to verifiy

          if(inaccessible.length != 0){
            if(inaccessible.length == 1){
              var text = inaccessible[0].ticketInfo + ' , ' + inaccessible[0].ticketVerification + inaccessibleSummaryFinding;
            }else{
              var text = '';
              for(j = 0 ; j < inaccessible.length; j++){
                var text = text + inaccessible[j].ticketInfo + ' , ' + inaccessible[j].ticketVerification + ' , '
              }
              text = text + inaccessibleSummaryFinding;
            }
            var summary = {
              text : text,
            }
            summaryFinding.push(summary);
          }//EOF Inaccessible

          if(minorDiscrepancy.length != 0){
            if(minorDiscrepancy.length == 1){
              var text = minorDiscrepancy[0].ticketInfo + ' , ' + minorDiscrepancy[0].ticketVerification + minorDiscrepancySummaryFinding;
            }else{
              var text = '';
              for(j = 0 ; j < minorDiscrepancy.length; j++){
                var text = text + minorDiscrepancy[j].ticketInfo + ' , ' + minorDiscrepancy[j].ticketVerification + ' , '
              }
              text = text + minorDiscrepancySummaryFinding;
            }
            var summary = {
              text : text,
            }
            summaryFinding.push(summary);
          }//EOF minor Discrepancy

          if(majorDiscrepancy.length != 0){
            if(majorDiscrepancy.length == 1){
              var text = majorDiscrepancy[0].ticketInfo + ' , ' + majorDiscrepancy[0].ticketVerification + majorDiscrepancySummaryFinding;
            }else{
              var text = '';
              for(j = 0 ; j < majorDiscrepancy.length; j++){
                var text = text + majorDiscrepancy[j].ticketInfo + ' , ' + majorDiscrepancy[j].ticketVerification + ' , '
              }
              text = text + majorDiscrepancySummaryFinding;
            }
            var summary = {
              text : text,
            }
            summaryFinding.push(summary);
          }//EOF minor Discrepancy

          if(clear.length != 0){
            if(clear.length == 1){
              var text = clear[0].ticketInfo + ' , ' + clear[0].ticketVerification + clearSummaryFinding;
            }else{
              var text = '';
              for(j = 0 ; j < clear.length; j++){
                var text = text + clear[j].ticketInfo + ' , ' + clear[j].ticketVerification + ' , '
              }
              text = text + clearSummaryFinding;
            }
            var summary = {
              text : text,
            }
            summaryFinding.push(summary);
          }//EOF of clear

        }//EOF ticketStatus
      } 
    }
    getOrder.summaryFinding = summaryFinding;

  }
return{
  getOrder,
  textColor,
  summaryFinding,
}
})(OrderGeneration);