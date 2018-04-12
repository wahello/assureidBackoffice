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
class AssignedTickets extends TrackerReact(Component){
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
                      <h2 className="box-title"> Tickets Assigned to Me</h2> 
                    </div>
                      <div className="box-body">
                        <div className="ticketWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          {/* {this.props.ticketBucketData[0].orderId} */}
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
                                        this.props.assignedTicketList.map((data, index)=>{
                                          return(
                                              <tr key={index}>
                                                  
                                                  <td><Link to={"/admin/ticket/"+data._id}>{data.ticketNumber}</Link></td>
                                                  <td>{data.orderNo}</td>
                                                  <td>{data.serviceName}</td>
                                                  <td>{moment(data.createdAt).format('l')}</td>
                                                  <td>{data.tatDate}</td> 
                                                  <td className={data.bgClassName}>{data.status}</td>       
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
export default AllTicketContainer = withTracker(props => {
  var handleAssignedTicketList = Meteor.subscribe("listTickets");
  var _id  = Meteor.userId();
  const userHandle  = Meteor.subscribe('userData',_id);
  const user        = Meteor.users.findOne({"_id" : _id});
  const loading    = !userHandle.ready() && !handleAssignedTicketList.ready();

  if(user){
    var roleArr = user.roles;
    if(roleArr){
      var role = roleArr.find(function (obj) { return obj != 'backofficestaff' });
    }
    //Get all the Tickets Assigned to Me
    var assignedTicketList = TicketMaster.find({ticketElement: { $elemMatch: { allocatedToUserid: _id }}}).fetch();
    if(assignedTicketList){
      //find last status of the Tickets
      for(i=0;i< assignedTicketList.length; i++){
        var ticketElements = assignedTicketList[i].ticketElement;
        switch(role){
          case 'screening committee' : 
            switch (ticketElements[ticketElements.length - 1].roleStatus) {
              case 'NewScrAllocated':
                assignedTicketList[i].status = 'New' ;  
                assignedTicketList[i].bgClassName = 'btn-warning';    
                break;
              case 'ScreenApproved' :
                assignedTicketList[i].status = 'Approved' ; 
                assignedTicketList[i].bgClassName = 'btn-success';
                break;
              case 'ScreenRejected' :
                assignedTicketList[i].status = 'Rejected' ;
                assignedTicketList[i].bgClassName = 'btn-danger';
                break;
              case 'ReviewPass' :
                assignedTicketList[i].status = 'Completed' ;
                assignedTicketList[i].bgClassName = 'btn-success';
                break;
              default:
                assignedTicketList[i].status = 'In Process' ;
                assignedTicketList[i].bgClassName = 'btn-primary';
                break;
            }
            break;
          case 'team leader' :
            switch (ticketElements[ticketElements.length - 1].roleStatus) {
              case 'screenTLAllocated':
                assignedTicketList[i].status = 'New' ;      
                assignedTicketList[i].bgClassName = 'btn-warning';
                break;
              case 'AssignAccept' :
                assignedTicketList[i].status = 'Allocated' ; 
                assignedTicketList[i].bgClassName = 'btn-success';
                break;
              case 'AssignReject' :
                assignedTicketList[i].status = 'Re-Allocate' ;
                assignedTicketList[i].bgClassName = 'btn-warning';
                break;
              case 'ReviewPass' :
                assignedTicketList[i].status = 'Completed' ;
                assignedTicketList[i].bgClassName = 'btn-success';
                break;
              default:
                assignedTicketList[i].status = 'In Process' ;
                assignedTicketList[i].bgClassName = 'btn-primary';
                break;
            }
            break;
          case 'team member' :
            switch (ticketElements[ticketElements.length - 1].roleStatus) {
              case 'Assign':
                assignedTicketList[i].status = 'New' ;      
                assignedTicketList[i].bgClassName = 'btn-warning';
                break;
              case 'QAFail':
                assignedTicketList[i].status = 'Quality Rejected' ;      
                assignedTicketList[i].bgClassName = 'btn-warning';
                break;
              case 'AssignAccept' :
                assignedTicketList[i].status = 'Accepted' ; 
                assignedTicketList[i].bgClassName = 'btn-success';
                break;
              case 'AssignReject' :
                assignedTicketList[i].status = 'Rejected' ;
                assignedTicketList[i].bgClassName = 'btn-danger';
                break;
              case 'ProofSubmit' :
                openTicketDetails[i].status = 'Proof Submitted' ;      
                openTicketDetails[i].bgClassName = 'btn-warning';
                break;
              case 'VerificationFail' :
                assignedTicketList[i].status = 'Proof Re-Submit' ;      
                assignedTicketList[i].bgClassName = 'btn-warning';
                break;
              case 'ProofResubmitted' : 
                assignedTicketList[i].status = 'Proof Re-Submitted' ;      
                assignedTicketList[i].bgClassName = 'btn-warning';
                break;
              case 'VerificationPass' : 
                assignedTicketList[i].status = 'Submit Report' ;      
                assignedTicketList[i].bgClassName = 'btn-warning';
                break;
              case 'ReviewPass' :
                assignedTicketList[i].status = 'Completed' ;
                assignedTicketList[i].bgClassName = 'btn-success';
                break;
              default:
                assignedTicketList[i].status = 'In Process' ;
                assignedTicketList[i].bgClassName = 'btn-primary';
                break;
            }
            break;
          case 'quality team member' : 
            switch (ticketElements[ticketElements.length - 1].roleStatus) {
              case 'VerificationPassQTMAllocated':
                assignedTicketList[i].status = 'New' ;      
                assignedTicketList[i].bgClassName = 'btn-warning';
                break;
              case 'ReviewFail':
                assignedTicketList[i].status = 'New' ;      
                assignedTicketList[i].bgClassName = 'btn-warning';
                break;
              case 'QAPass' :
                assignedTicketList[i].status = 'Approved' ; 
                assignedTicketList[i].bgClassName = 'btn-success';
                break;
              case 'QAFail' :
                assignedTicketList[i].status = 'Rejected' ;
                assignedTicketList[i].bgClassName = 'btn-danger';
                break;
              case 'ReviewPass' :
                assignedTicketList[i].status = 'Completed' ;
                assignedTicketList[i].bgClassName = 'btn-success';
                break;
              default:
                assignedTicketList[i].status = 'In Process' ;
                assignedTicketList[i].bgClassName = 'btn-primary';
                break;
            }
            break;
          case 'quality team leader' :
            switch (ticketElements[ticketElements.length - 1].roleStatus) {
              case 'QAPassQTLAllocated':
                assignedTicketList[i].status = 'New' ;      
                assignedTicketList[i].bgClassName = 'btn-warning';
                break;
              case 'ReiewFail' :
                assignedTicketList[i].status = 'Rejected' ;
                assignedTicketList[i].bgClassName = 'btn-danger';
                break;
              case 'ReviewPass' :
                assignedTicketList[i].status = 'Completed' ;
                assignedTicketList[i].bgClassName = 'btn-success';
                break;
              default:
                assignedTicketList[i].status = 'In Process' ;
                assignedTicketList[i].bgClassName = 'btn-primary';
                break;
            }
            break;
          default : 
            assignedTicketList[i].status = 'In Process' ;
            assignedTicketList[i].bgClassName = 'btn-primary';
            break;
        }
        // assignedTicketList[i].status = ticketElements[ticketElements.length - 1].roleStatus ;
      } 
    }
  }
  return {
    loading,
    assignedTicketList
  };
})(AssignedTickets);
