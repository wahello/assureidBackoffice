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
import { TicketMaster } from '/imports/website/ServiceProcess/api/TicketMaster.js';

class ApprovedTickets extends TrackerReact(Component){
  constructor(props){
    super(props);
    this.state = {
      'userDetails': {},
      "userRoleIn": Meteor.userId(),
    }
  }
   render(){
      return(            
        <div>
          <div className="content-wrapper">
            <section className="content">
              <div className="row">
                <div className="col-md-12">
                  <div className="box">
                    <div className="box-header with-border">
                      <h2 className="box-title">My Approved Tickets</h2> 
                    </div>
                    <div className="box-body">
                      <div className="ticketWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">                           
                        <div>
                          <div className="reports-table-main">
                              <table id="subscriber-list-outerTable" className="newOrderwrap subscriber-list-outerTable table table-bordered table-hover table-striped table-striped table-responsive table-condensed table-bordered">
                                <thead className="table-head umtblhdr">
                                  <tr className="hrTableHeader info UML-TableTr">
                                    <th className=""> Ticket No.</th>
                                    <th className=""> Service Name </th>
                                    <th className=""> Arrival Date </th>
                                    <th className=""> TAT(Date) </th>
                                    <th className=""> Ticket age(In Days) </th>                                      
                                    <th className=""> Status </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                      !this.props.loading ?
                                        this.props.approvedTicketList.map((data, index)=>{
                                          return(
                                              <tr key={index}>
                                                  <td><Link to={"/admin/ticket/"+data._id}>{data.ticketNumber}</Link></td>
                                                  <td><Link to={"/admin/ticket/"+data._id}>{data.serviceName}</Link></td>
                                                  <td><Link to={"/admin/ticket/"+data._id}>{moment(data.createdAt).format('DD-MM-YYYY')}</Link></td>
                                                  <td><Link to={"/admin/ticket/"+data._id}>{data.tatDate}</Link></td> 
                                                  <td><Link to={"/admin/ticket/"+data._id}>{Math.round(Math.abs((new Date().getTime() - data.createdAt.getTime())/(24*60*60*1000)))}</Link></td>
                                                  <td className={data.bgClassName}><Link to={"/admin/ticket/"+data._id} className="statuswcolor">{data.status}</Link></td>
                                              </tr>
                                          );
                                        })  
                                      :
                                      <tr>
                                          <td></td>
                                          <td></td>
                                          <td className ="nodata">Nothing To Dispaly</td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                      </tr>
                                  }
                                </tbody>
                              </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 
              </div>
            </section>
          </div>
        </div>    
      );
    }
}
export default ApprovedTicketsContainer = withTracker(props => {
  var handleApprovedTicketList = Meteor.subscribe("listTickets");
  var _id  = Meteor.userId();
  const userHandle  = Meteor.subscribe('userData',_id);
  const user        = Meteor.users.findOne({"_id" : _id});
  const loading    = !userHandle.ready() && !handleApprovedTicketList.ready();

  if(user){
    var roleArr = user.roles;
    if(roleArr){
      var role = roleArr.find(function (obj) { return obj != 'backofficestaff' });
    }
    var roleStatus = '';
    switch (role) {
      case 'screening committee':
        roleStatus = 'ScreenApproved';
        break;
      case 'team leader':
        roleStatus = 'AssignAccept';
        break;
      case 'team member':
        roleStatus = 'AssignAccept';
        break;
      case 'quality team leader':
        roleStatus = 'ReviewPass';
        break;
      case 'quality team member':
        roleStatus = 'QAPass';
        break;
    
      default:
        break;
    }
    //Get all the Open Tickets
    var approvedTicketList = [];
    var approvedTicketDetails = TicketMaster.find({ticketElement: { $elemMatch: { allocatedToUserid: _id }}}).fetch();
    if(approvedTicketDetails){
      //find last status of the Tickets
      for(i=0;i< approvedTicketDetails.length; i++){
        var ticketElements = approvedTicketDetails[i].ticketElement;
        approvedTicketDetails[i].status = ticketElements[ticketElements.length - 1].roleStatus ;
        if(ticketElements.find(function (obj) { return obj.roleStatus == roleStatus})){
          approvedTicketList.push(approvedTicketDetails[i]);
        }
      }

      for(i=0;i< approvedTicketList.length; i++){
        var ticketElements = approvedTicketList[i].ticketElement;
        switch(role){
          case 'screening committee' : 
            switch (ticketElements[ticketElements.length - 1].roleStatus) {
              case 'NewScrAllocated':
                approvedTicketList[i].status = 'New' ;  
                approvedTicketList[i].bgClassName = 'btn-warning';    
                break;
              case 'ScreenApproved' :
                approvedTicketList[i].status = 'Approved' ; 
                approvedTicketList[i].bgClassName = 'btn-success';
                break;
              case 'ScreenRejected' :
                approvedTicketList[i].status = 'Rejected' ;
                approvedTicketList[i].bgClassName = 'btn-danger';
                break;
              case 'ReviewPass' :
                approvedTicketList[i].status = 'Completed' ;
                approvedTicketList[i].bgClassName = 'btn-success';
                break;
              default:
                approvedTicketList[i].status = 'In Process' ;
                approvedTicketList[i].bgClassName = 'btn-primary';
                break;
            }
            break;
          case 'team leader' :
            switch (ticketElements[ticketElements.length - 1].roleStatus) {
              case 'screenTLAllocated':
                approvedTicketList[i].status = 'New' ;      
                approvedTicketList[i].bgClassName = 'btn-warning';
                break;
              case 'AssignAccept' :
                approvedTicketList[i].status = 'Allocated' ; 
                approvedTicketList[i].bgClassName = 'btn-success';
                break;
              case 'AssignReject' :
                approvedTicketList[i].status = 'Rejected' ;
                approvedTicketList[i].bgClassName = 'btn-danger';
                break;
              case 'ReviewPass' :
                approvedTicketList[i].status = 'Completed' ;
                approvedTicketList[i].bgClassName = 'btn-success';
                break;
              default:
                approvedTicketList[i].status = 'In Process' ;
                approvedTicketList[i].bgClassName = 'btn-primary';
                break;
            }
            break;
          case 'team member' :
            switch (ticketElements[ticketElements.length - 1].roleStatus) {
              case 'Assign':
                approvedTicketList[i].status = 'New' ;      
                approvedTicketList[i].bgClassName = 'btn-warning';
                break;
              case 'QAFail':
                approvedTicketList[i].status = 'New' ;      
                approvedTicketList[i].bgClassName = 'btn-warning';
                break;
              case 'AssignAccept' :
                approvedTicketList[i].status = 'Accepted' ; 
                approvedTicketList[i].bgClassName = 'btn-success';
                break;
              case 'AssignReject' :
                approvedTicketList[i].status = 'Rejected' ;
                approvedTicketList[i].bgClassName = 'btn-danger';
                break;
              case 'ReviewPass' :
                approvedTicketList[i].status = 'Completed' ;
                approvedTicketList[i].bgClassName = 'btn-success';
                break;
              default:
                approvedTicketList[i].status = 'In Process' ;
                approvedTicketList[i].bgClassName = 'btn-primary';
                break;
            }
            break;
          case 'quality team member' : 
            switch (ticketElements[ticketElements.length - 1].roleStatus) {
              case 'VerificationPassQTMAllocated':
                approvedTicketList[i].status = 'New' ;      
                approvedTicketList[i].bgClassName = 'btn-warning';
                break;
              case 'ReviewFail':
                approvedTicketList[i].status = 'New' ;      
                approvedTicketList[i].bgClassName = 'btn-warning';
                break;
              case 'QAPass' :
                approvedTicketList[i].status = 'Approved' ; 
                approvedTicketList[i].bgClassName = 'btn-success';
                break;
              case 'QAFail' :
                approvedTicketList[i].status = 'Rejected' ;
                approvedTicketList[i].bgClassName = 'btn-danger';
                break;
              case 'ReviewPass' :
                approvedTicketList[i].status = 'Completed' ;
                approvedTicketList[i].bgClassName = 'btn-success';
                break;
              default:
                approvedTicketList[i].status = 'In Process' ;
                approvedTicketList[i].bgClassName = 'btn-primary';
                break;
            }
            break;
          case 'quality team leader' :
            switch (ticketElements[ticketElements.length - 1].roleStatus) {
              case 'QAPassQTLAllocated':
                approvedTicketList[i].status = 'New' ;      
                approvedTicketList[i].bgClassName = 'btn-warning';
                break;
              case 'ReiewFail' :
                approvedTicketList[i].status = 'Rejected' ;
                approvedTicketList[i].bgClassName = 'btn-danger';
                break;
              case 'ReviewPass' :
                approvedTicketList[i].status = 'Completed' ;
                approvedTicketList[i].bgClassName = 'btn-success';
                break;
              default:
                approvedTicketList[i].status = 'In Process' ;
                approvedTicketList[i].bgClassName = 'btn-primary';
                break;
            }
            break;
          default : 
            approvedTicketList[i].status = 'In Process' ;
            approvedTicketList[i].bgClassName = 'btn-primary';
            break;
        }
        // assignedTicketList[i].status = ticketElements[ticketElements.length - 1].roleStatus ;
      } 
    }
  }
  return {
    loading,
    approvedTicketList
  };
})(ApprovedTickets);