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
                      <h2 className="box-title">My {this.props.header4}</h2> 
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
                                    <th className=""> TAT &nbsp;( Date ) </th>
                                    <th className=""> Ticket age &nbsp;( In Days ) </th>      
                                    <th className=""> Status </th>                        
                                    </tr>
                                </thead>
                                        <tbody>
                                        {
                                                !this.props.loading && this.props.rejectedTicketList.length>0 ?
                                                  this.props.rejectedTicketList.map((data, index)=>{
                                                    return(
                                                        <tr key={index}>
                                                             <td><Link to={"/admin/ticket/"+data._id}>{data.ticketNumber}</Link></td>                                                             
                                                             <td><Link to={"/admin/ticket/"+data._id}>{data.serviceName}</Link></td>
                                                             <td><Link to={"/admin/ticket/"+data._id}>{moment(data.createdAt).format('DD-MM-YYYY')}</Link></td>
                                                             <td><Link to={"/admin/ticket/"+data._id}>{moment(data.tatDate).format('DD-MM-YYYY')}</Link></td> 
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
export default RejectedTicketsContainer = withTracker(props => {
  var handleRejectedTicketList = Meteor.subscribe("listTickets");
  var _id  = Meteor.userId();
  const userHandle  = Meteor.subscribe('userData',_id);
  const user        = Meteor.users.findOne({"_id" : _id});
  const loading    = !userHandle.ready() && !handleRejectedTicketList.ready();
  var header4 = '';

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
        roleStatus = 'AssignReject';
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

        // rejectedTicketDetails[i].status = ticketElements[ticketElements.length - 1].roleStatus ;
        if(ticketElements.find(function (obj) { return obj.roleStatus == roleStatus})){
          switch(role){
            case 'screening committee' : 
            header4 = 'Rejected Tickets';
              switch (ticketElements[ticketElements.length - 1].roleStatus) {
                case 'NewScrAllocated':
                  rejectedTicketDetails[i].status = 'New' ;  
                  rejectedTicketDetails[i].bgClassName = 'btn-warning';    
                  break;
                case 'ScreenApproved' :
                  rejectedTicketDetails[i].status = 'Approved' ; 
                  rejectedTicketDetails[i].bgClassName = 'btn-success';
                  break;
                case 'ScreenRejected' :
                  rejectedTicketDetails[i].status = 'Rejected' ;
                  rejectedTicketDetails[i].bgClassName = 'btn-danger';
                  break;
                case 'ReviewPass' :
                  rejectedTicketDetails[i].status = 'Completed' ;
                  rejectedTicketDetails[i].bgClassName = 'btn-success';
                  break;
                default:
                  rejectedTicketDetails[i].status = 'In Process' ;
                  rejectedTicketDetails[i].bgClassName = 'btn-primary';
                  break;
              }
              break;
            case 'team leader' :
            header4 = 'Reassigned Tickets';
              switch (ticketElements[ticketElements.length - 1].roleStatus) {
                case 'screenTLAllocated':
                  rejectedTicketDetails[i].status = 'New' ;      
                  rejectedTicketDetails[i].bgClassName = 'btn-warning';
                  break;
                case 'AssignAccept' :
                  rejectedTicketDetails[i].status = 'Allocated' ; 
                  rejectedTicketDetails[i].bgClassName = 'btn-success';
                  break;
                case 'AssignReject' :
                  rejectedTicketDetails[i].status = 'Rejected' ;
                  rejectedTicketDetails[i].bgClassName = 'btn-danger';
                  break;
                case 'ReviewPass' :
                  rejectedTicketDetails[i].status = 'Completed' ;
                  rejectedTicketDetails[i].bgClassName = 'btn-success';
                  break;
                default:
                  rejectedTicketDetails[i].status = 'In Process' ;
                  rejectedTicketDetails[i].bgClassName = 'btn-primary';
                  break;
              }
              break;
            case 'team member' :
            header4 = 'Reopen Tickets';
              switch (ticketElements[ticketElements.length - 1].roleStatus) {
                case 'Assign':
                  rejectedTicketDetails[i].status = 'New' ;      
                  rejectedTicketDetails[i].bgClassName = 'btn-warning';
                  break;
                case 'QAFail':
                  rejectedTicketDetails[i].status = 'New' ;      
                  rejectedTicketDetails[i].bgClassName = 'btn-warning';
                  break;
                case 'AssignAccept' :
                  rejectedTicketDetails[i].status = 'Accepted' ; 
                  rejectedTicketDetails[i].bgClassName = 'btn-success';
                  break;
                case 'AssignReject' :
                  rejectedTicketDetails[i].status = 'Rejected' ;
                  rejectedTicketDetails[i].bgClassName = 'btn-danger';
                  break;
                case 'ReviewPass' :
                  rejectedTicketDetails[i].status = 'Completed' ;
                  rejectedTicketDetails[i].bgClassName = 'btn-success';
                  break;
                default:
                  rejectedTicketDetails[i].status = 'In Process' ;
                  rejectedTicketDetails[i].bgClassName = 'btn-primary';
                  break;
              }
              break;
            case 'quality team member' : 
            header4 = 'Reopen Tickets';
              switch (ticketElements[ticketElements.length - 1].roleStatus) {
                case 'VerificationPassQTMAllocated':
                  rejectedTicketDetails[i].status = 'New' ;      
                  rejectedTicketDetails[i].bgClassName = 'btn-warning';
                  break;
                case 'ReviewFail':
                  rejectedTicketDetails[i].status = 'New' ;      
                  rejectedTicketDetails[i].bgClassName = 'btn-warning';
                  break;
                case 'QAPass' :
                  rejectedTicketDetails[i].status = 'Approved' ; 
                  rejectedTicketDetails[i].bgClassName = 'btn-success';
                  break;
                case 'QAFail' :
                  rejectedTicketDetails[i].status = 'Rejected' ;
                  rejectedTicketDetails[i].bgClassName = 'btn-danger';
                  break;
                case 'ReviewPass' :
                  rejectedTicketDetails[i].status = 'Completed' ;
                  rejectedTicketDetails[i].bgClassName = 'btn-success';
                  break;
                default:
                  rejectedTicketDetails[i].status = 'In Process' ;
                  rejectedTicketDetails[i].bgClassName = 'btn-primary';
                  break;
              }
              break;
            case 'quality team leader' :
            header4 = 'Reopen Tickets';
              switch (ticketElements[ticketElements.length - 1].roleStatus) {
                case 'QAPassQTLAllocated':
                  rejectedTicketDetails[i].status = 'New' ;      
                  rejectedTicketDetails[i].bgClassName = 'btn-warning';
                  break;
                case 'ReiewFail' :
                  rejectedTicketDetails[i].status = 'Rejected' ;
                  rejectedTicketDetails[i].bgClassName = 'btn-danger';
                  break;
                case 'ReviewPass' :
                  rejectedTicketDetails[i].status = 'Completed' ;
                  rejectedTicketDetails[i].bgClassName = 'btn-success';
                  break;
                default:
                  rejectedTicketDetails[i].status = 'In Process' ;
                  rejectedTicketDetails[i].bgClassName = 'btn-primary';
                  break;
              }
              break;
            default : 
              rejectedTicketDetails[i].status = 'In Process' ;
              rejectedTicketDetails[i].bgClassName = 'btn-primary';
              break;
          }
          rejectedTicketList.push(rejectedTicketDetails[i]);
        }
      } 
    }
  }
  return {
    loading,
    rejectedTicketList,
    header4,
  };
})(RejectedTickets);