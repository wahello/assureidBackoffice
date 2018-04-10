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
import { TicketBucket } from '/imports/website/ServiceProcess/api/TicketMaster.js';
class RejectedTickets extends TrackerReact(Component){
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
                      <h2 className="box-title">Rejected Ticket</h2> 
                    </div>
                        <div className="box-body">
                            <div className="ticketWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                
                                <div>
                                <div className="reports-table-main">
                                    <table id="subscriber-list-outerTable" className="newOrderwrap subscriber-list-outerTable table table-bordered table-hover table-striped table-striped table-responsive table-condensed table-bordered">
                                    <thead className="table-head umtblhdr">
                                    <tr className="hrTableHeader info UML-TableTr">
                                    <th className=""> Ticket No.</th>
                                    <th className=""> Order ID </th>
                                    <th className=""> Service Name </th>
                                    <th className=""> Arrival Date </th>
                                    <th className=""> TAT(Date) </th>
                                    <th className=""> Status </th>                        
                                    </tr>
                                </thead>
                                        <tbody>
                                        {
                                                !this.props.loading ?
                                                  this.props.ticketBucketData.map((data, index)=>{
                                                    return(
                                                        <tr key={index}>
                                                             <td><Link to={"/admin/ticket/"+data.ticketid}>{data.ticketNumber}</Link></td>
                                                             <td>{data.orderNo}</td>
                                                             <td>{data.serviceName}</td>
                                                             <td>{moment(data.createdAt).format('l')}</td>
                                                             <td>{data.tatDate}</td> 
                                                             <td>{data.status}</td>
                                                        </tr>
                                                    );
                                                  })
                                            
                                                :
                                                <div>
                                                    return(<span>loading...</span>);
                                                </div>
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
export default RejectedTicketsContainer = withTracker(props => {
  var handleRejectedTicketList = Meteor.subscribe("listTickets");
  var _id  = Meteor.userId();
  const userHandle  = Meteor.subscribe('userData',_id);
  const user        = Meteor.users.findOne({"_id" : _id});
  const loading    = !userHandle.ready() && !handleRejectedTicketList.ready();

  if(user){
    var roleArr = user.roles;
    if(roleArr){
      var role = roleArr.find(function (obj) { return obj != 'backofficestaff' });
    }
    var roleStatus = '';
    switch (role) {
      case 'screening committee':
        roleStatus = 'ScreenRejected';
        break;
      case 'team leader':
        roleStatus = 'AssignReject';
        break;
      case 'team member':
        roleStatus = 'VerificationFail';
        break;
      case 'quality team leader':
        roleStatus = 'ReviewFail';
        break;
      case 'quality team member':
        roleStatus = 'QAFail';
        break;
    
      default:
        break;
    }
    //Get all the Rejected Tickets
    var rejectedTicketList = [];
    var rejectedTicketDetails = TicketMaster.find({ticketElement: { $elemMatch: { allocatedToUserid: _id }}}).fetch();
    if(rejectedTicketDetails){
      //find last status of the Tickets
      for(i=0;i< rejectedTicketDetails.length; i++){
        var ticketElements = rejectedTicketDetails[i].ticketElement;
        rejectedTicketDetails[i].status = ticketElements[ticketElements.length - 1].roleStatus ;
        if(ticketElements.find(function (obj) { return obj.roleStatus == roleStatus})){
          rejectedTicketList.push(rejectedTicketDetails[i]);
        }
      } 
    }
  }
  return {
    loading,
    rejectedTicketList
  };
})(RejectedTickets);