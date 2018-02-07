import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { createContainer } from 'meteor/react-meteor-data';
import Validation from 'react-validation';
import validator from 'validator';
import {Tracker} from 'meteor/tracker';
import { browserHistory } from 'react-router';
import NewTickets from "/imports/dashboard/ticketManagement/myTickets/NewTickets.jsx";
import AcceptedTickets from "/imports/dashboard/ticketManagement/myTickets/AcceptedTickets.jsx";
import ApprovedTickets from "/imports/dashboard/ticketManagement/myTickets/ApprovedTickets.jsx";
import RejectedTickets from "/imports/dashboard/ticketManagement/myTickets/RejectedTickets.jsx";
import EscalationTickets from "/imports/dashboard/ticketManagement/myTickets/EscalationTickets.jsx";


// import { UserSubscriptions } from '/imports/website/contactUs/api/SubscriptionMaster.js';
export default class MyTickets extends TrackerReact(Component){

    constructor(props){
      super(props);
      this.state = {
          'currentTabView': "New",
      }
    }

    changeReportComponent(event){
      var currentComp = $(event.currentTarget).attr('data-currentComp');

      this.setState({
        'currentTabView': currentComp,
      })
    }
   
    render(){
        return( 
            
            <div>
              {/* Content Wrapper. Contains page content */}
              <div className="content-wrapper">
                {/* Content Header (Page header) */}
               
                {/* Main content */}
                <section className="content">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="box">
                        <div className="box-header with-border">
                          {/* <h3 className="box-title">
                            Sales Report
                          </h3> */}
                        
                        </div>
                        {/* /.box-header */}
                        <div className="box-body">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <h1 className="reportTitleName"> My Tickets</h1>
                                <hr/>

                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="sales-report-main-class">
                                    <div className="sales-report-commonpre">
                                        <div onClick={this.changeReportComponent.bind(this)}  data-currentComp="New" className="sales-report-common sales-report-today">
                                        New
                                        </div>
                                        <div onClick={this.changeReportComponent.bind(this)}  data-currentComp="Accepted" className="sales-report-common sales-report-thisweek">
                                        Accepted
                                        </div>
                                        <div onClick={this.changeReportComponent.bind(this)}  data-currentComp="Approved" className="sales-report-common sales-report-thismonth">
                                        Approved
                                        </div>
                                        <div onClick={this.changeReportComponent.bind(this)}  data-currentComp="Rejected" className="sales-report-common sales-report-thisyear">
                                        Rejected
                                        </div>
                                        <div onClick={this.changeReportComponent.bind(this)}  data-currentComp="Escalation" className="sales-report-common sales-report-costomised">
                                        Escalation
                                        </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-lg-12">
                                  <table className="table table-bordered table-striped table-hover myTable dataTable no-footer">
                                    {/* <thead className="table-head umtblhdr">
                                      <tr className="hrTableHeader info UML-TableTr">
                                        <th className=""> Sr No.</th>
                                        <th className=""> Order ID </th>
                                        <th className=""> Service Name </th>
                                        <th className=""> Duration </th>
                                        <th className=""> Amount </th>
                                        <th className=""> Status </th>
                                        
                                      </tr>
                                    </thead> */}
                                    <tbody className="noLRPad">
                                      {/* { this.usersListData().map( (usersData)=>{
                                        return <UMUsers key={usersData._id} usersDataValues={usersData}/>
                                        }) 
                                      } */}
                                     
                                    </tbody>
                                  </table>
                                </div>
                              
                                {
                                  this.state.currentTabView == "New" ? <NewTickets /> : 
                                  this.state.currentTabView == "Accepted" ? <AcceptedTickets /> : 
                                  this.state.currentTabView == "Approved" ? <ApprovedTickets /> : 
                                  this.state.currentTabView == "Rejected" ? <RejectedTickets /> : 
                                  this.state.currentTabView == "Escalation" ? <EscalationTickets /> : 
                                  ""
                                  // <ReportsCustomisedList />  
                                } 
                                
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
      
              </div>
              {/* /.content-wrapper */}
            </div>
            
        );
    }
}