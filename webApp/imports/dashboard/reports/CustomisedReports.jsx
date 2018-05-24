import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { createContainer } from 'meteor/react-meteor-data';
import Validation from 'react-validation';
import validator from 'validator';
import {Tracker} from 'meteor/tracker';
import { withTracker } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Order } from "/imports/website/ServiceProcess/api/Order.js";



// import { UserSubscriptions } from '/imports/website/contactUs/api/SubscriptionMaster.js';

class CustomisedReports extends TrackerReact(Component){
	constructor(props){
        super(props);
        this.state = {
            "subscribe": Meteor.subscribe("OrdersData"),
            
        }
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        
    }

    componentDidMount(){
        this.contactTracker = Tracker.autorun(()=>{
       
        });
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        
    }

    handleFromChange(event){
        event.preventDefault();
       const target = event.target;
       const name = target.name;

       this.setState({
           [name] : event.target.value,
       });

       var dateVal = event.target.value;
       var dateUpdate = new Date(dateVal);
       Session.set('newFromDate',dateUpdate);
    }
    handleToChange(event){
        event.preventDefault();
       const target = event.target;
       const name = target.name;

       this.setState({
           [name] : event.target.value,
       });

       var dateVal = event.target.value;
       var dateUpdate = new Date(dateVal);
       Session.set('newToDate',dateUpdate);
    }

    currentFromDate(){
        if(Session.get('newFromDate')){
            var today = Session.get('newFromDate');
        } else {
            var today = new Date();
        }
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        }
        if(mm<10){
            mm='0'+mm;
        }
        var today = yyyy+'-'+mm+'-'+dd;
        var today = yyyy+'-'+mm+'-'+dd;

        return today;
    }

    currentToDate(){
        if(Session.get('newToDate')){
            var today = Session.get('newToDate');
        } else {
            var today = new Date();
        }
        // var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        }
        if(mm<10){
            mm='0'+mm;
        }
        var today = yyyy+'-'+mm+'-'+dd;
        var today = yyyy+'-'+mm+'-'+dd;

        return today;
    }

    dataTableList(){
		
        
        var selectedDateFrom = Session.get('newFromDate');
		if(selectedDateFrom){
			var newDateFrom  = new Date(selectedDateFrom);
		}else{
			var newDateFrom  = new Date();
		}

        var selectedDateTo = Session.get('newToDate');
		if(selectedDateTo){
			var newDateTo  = new Date(selectedDateTo);
		}else{
			var newDateTo  = new Date();
        }
        
		var reportData =  Order.find({'createdAt':{$gte : newDateFrom, $lte : newDateTo },'paymentStatus': 'paid'}, {sort: {'createdAt': -1}}).fetch();
        var reportDataArr = [];
        var total = 0;
		if(reportData.length>0){
			for(i=0;i<reportData.length;i++){
                total = total+(parseInt(reportData[i].totalAmount));
				reportDataArr.push(
					<tr key={reportData[i]._id}>
						 <td>{reportData[i].orderNo}</td>
                         <td>{reportData[i].serviceName}</td>
                         <td>{moment(reportData[i].createdAt).format('DD-MM-YYYY')}</td>
                         {/* <td>{reportData[i].paymentMethod}</td> */}
                         {/* <td>{reportData[i].productLength}</td> */}
                         {/* <td>{reportData[i].totalQuantity}</td> */}
                         <td><i className="fa fa-rupee"></i> {(parseInt(reportData[i].totalAmount)).toFixed(2)}</td>
					</tr>
				);
			}
        }
        if(reportData.length>0){
            reportDataArr.push(
                <tr key={1}>
                    <td></td>
                    <td></td>
                    <td className="totalTitle">Total</td>
                    <td className="totalTitle"><i className="fa fa-rupee"></i>&nbsp;{(total).toFixed(2)}</td>
                </tr>
            )
        }
		return reportDataArr;
    }
   
    render(){
        if(!this.props.loading){
            return( 
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="sales-report-main-class">
                        <div className="reports-select-date-boxmain">
                            <div className="reports-select-date-boxsec">
                                <div className="reports-select-date-Title">Customized Sales Report</div>
                                <div className="reports-select-date-fromto">
                                    <div className="reports-select-date-from1">
                                        <div className="reports-select-date-from2">
                                            From
                                        </div>
                                        <div className="reports-select-date-from3">
                                            <input onChange={this.handleFromChange} name="fromDateCustomised" ref="fromDateCustomised" value={this.currentFromDate()} type="date" className="reportsDateRef form-control" placeholder=""  />
                                        </div>
                                    </div>
                                    <div className="reports-select-date-to1">
                                        <div className="reports-select-date-to2">
                                            To
                                        </div>
                                        <div className="reports-select-date-to3">
                                            <input onChange={this.handleToChange} name="toDateCustomised" ref="toDateCustomised" value={this.currentToDate()} type="date" className="reportsDateRef form-control" placeholder=""   />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="report-list-downloadMain">
                            {/* <div className="report-list-downloadPdf">
                                <i className="fa fa-file-pdf-o" aria-hidden="true"></i>PDF
                            </div>
                            <div className="report-list-downloadPrint">
                                <i className="fa fa-print" aria-hidden="true"></i>Print
                            </div> */}
                            <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="download-table-xls-button btn report-list-downloadXLXS"
                                table="subscriber-list-outerTable"
                                filename="tablexls"
                                sheet="tablexls"
                                buttonText="Download as XLS"/>
                        </div>
                    </div>
                
                    <div>
                        <div className="reports-table-main">
                            <table  id="subscriber-list-outerTable" className="subscriber-list-outerTable table table-bordered table-hover table-striped table-striped table-responsive table-condensed table-bordered">
                                <thead>
                                <tr className="table-head  reports-list-outerTR">
                                    <th className=" reports-list-outerTableth">Order No.</th>
                                    <th className=" reports-list-outerTableth">Service Name</th> 
                                    <th className=" reports-list-outerTableth">Date</th>
                                    {/* <th className=" reports-list-outerTableth">Transaction Type</th>
                                    <th className=" reports-list-outerTableth">Product Count</th>
                                    <th className=" reports-list-outerTableth">Quantity</th> */}
                                    <th className=" reports-list-outerTableth">Amount</th>
                                </tr>
                                </thead>
                                <tbody>
                                
                                    {this.dataTableList()}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }else{
            return(<span>loading...</span>);
        }
    }
}export default CustomisedReportsContainer = withTracker((props) => { 
    const postHandle   = Meteor.subscribe('allOrders');
    var loading = !postHandle.ready();
    return{
        loading:loading,
    }

   
})(CustomisedReports);