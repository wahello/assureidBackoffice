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
class OpenTickets extends TrackerReact(Component){
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
                      <h2 className="box-title">Open Ticket</h2> 
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
                                              this.props.openTicketList.map((data, index)=>{
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
export default OpenTicketsContainer = withTracker(props => {
  
  var handleOpenTicketList = Meteor.subscribe("listTickets");
  var _id  = Meteor.userId();
  const userHandle  = Meteor.subscribe('userData',_id);
  const user        = Meteor.users.findOne({"_id" : _id});
  const loading    = !userHandle.ready() && !handleOpenTicketList.ready();

  if(user){
    var roleArr = user.roles;
    if(roleArr){
      var role = roleArr.find(function (obj) { return obj != 'backofficestaff' });
    }
    //Get all the Open Tickets
    var openTicketList = [];
    var openTicketDetails = TicketMaster.find({ticketElement: { $elemMatch: { allocatedToUserid: _id }}}).fetch();
    if(openTicketDetails){
      //find last status of the Tickets
      for(i=0;i< openTicketDetails.length; i++){
        var ticketElements = openTicketDetails[i].ticketElement;
        openTicketDetails[i].status = ticketElements[ticketElements.length - 1].roleStatus ;
        if(openTicketDetails[i].status != 'ReviewPass'){
          switch(role){
            case 'screening committee' : 
              switch (ticketElements[ticketElements.length - 1].roleStatus) {
                case 'NewScrAllocated':
                  openTicketDetails[i].status = 'New' ;  
                  openTicketDetails[i].bgClassName = 'btn-warning';    
                  break;
                case 'ScreenApproved' :
                  openTicketDetails[i].status = 'Approved' ; 
                  openTicketDetails[i].bgClassName = 'btn-success';
                  break;
                case 'ScreenRejected' :
                  openTicketDetails[i].status = 'Rejected' ;
                  openTicketDetails[i].bgClassName = 'btn-danger';
                  break;
                case 'ReviewPass' :
                  openTicketDetails[i].status = 'Completed' ;
                  openTicketDetails[i].bgClassName = 'btn-success';
                  break;
                default:
                  openTicketDetails[i].status = 'In Process' ;
                  openTicketDetails[i].bgClassName = 'btn-primary';
                  break;
              }
              break;
            case 'team leader' :
              switch (ticketElements[ticketElements.length - 1].roleStatus) {
                case 'screenTLAllocated':
                  openTicketDetails[i].status = 'New' ;      
                  openTicketDetails[i].bgClassName = 'btn-warning';
                  break;
                case 'AssignAccept' :
                  openTicketDetails[i].status = 'Allocated' ; 
                  openTicketDetails[i].bgClassName = 'btn-success';
                  break;
                case 'AssignReject' :
                  openTicketDetails[i].status = 'Re-Allocate' ;
                  openTicketDetails[i].bgClassName = 'btn-warning';
                  break;
                case 'ReviewPass' :
                  openTicketDetails[i].status = 'Completed' ;
                  openTicketDetails[i].bgClassName = 'btn-success';
                  break;
                default:
                  openTicketDetails[i].status = 'In Process' ;
                  openTicketDetails[i].bgClassName = 'btn-primary';
                  break;
              }
              break;
            case 'team member' :
              switch (ticketElements[ticketElements.length - 1].roleStatus) {
                case 'Assign':
                  openTicketDetails[i].status = 'New' ;      
                  openTicketDetails[i].bgClassName = 'btn-warning';
                  break;
                case 'QAFail':
                  openTicketDetails[i].status = 'Quality Rejected' ;      
                  openTicketDetails[i].bgClassName = 'btn-warning';
                  break;
                case 'AssignAccept' :
                  openTicketDetails[i].status = 'Accepted' ; 
                  openTicketDetails[i].bgClassName = 'btn-warning';
                  break;
                case 'AssignReject' :
                  openTicketDetails[i].status = 'Rejected' ;
                  openTicketDetails[i].bgClassName = 'btn-danger';
                  break;
                case 'SelfAllocated' :
                  openTicketDetails[i].status = 'Self Allocated' ; 
                  openTicketDetails[i].bgClassName = 'btn-warning';
                  break;
                case 'ProofSubmit' :
                  openTicketDetails[i].status = 'Proof Submitted' ;      
                  openTicketDetails[i].bgClassName = 'btn-warning';
                  break;
                case 'VerificationFail' :
                  openTicketDetails[i].status = 'Proof Re-Submit' ;      
                  openTicketDetails[i].bgClassName = 'btn-warning';
                  break;
                case 'ProofResubmitted' : 
                  openTicketDetails[i].status = 'Proof Re-Submitted' ;      
                  openTicketDetails[i].bgClassName = 'btn-warning';
                  break;
                case 'VerificationPass' : 
                  openTicketDetails[i].status = 'Submit Report' ;      
                  openTicketDetails[i].bgClassName = 'btn-warning';
                  break;
                case 'ReviewPass' :
                  openTicketDetails[i].status = 'Completed' ;
                  openTicketDetails[i].bgClassName = 'btn-success';
                  break;
                default:
                  openTicketDetails[i].status = 'In Process' ;
                  openTicketDetails[i].bgClassName = 'btn-primary';
                  break;
              }
              break;
            case 'quality team member' : 
              switch (ticketElements[ticketElements.length - 1].roleStatus) {
                case 'VerificationPassQTMAllocated':
                  openTicketDetails[i].status = 'New' ;      
                  openTicketDetails[i].bgClassName = 'btn-warning';
                  break;
                case 'ReviewFail':
                  openTicketDetails[i].status = 'Review Fail' ;      
                  openTicketDetails[i].bgClassName = 'btn-warning';
                  break;
                case 'QAPass' :
                  openTicketDetails[i].status = 'Approved' ; 
                  openTicketDetails[i].bgClassName = 'btn-success';
                  break;
                case 'QAFail' :
                  openTicketDetails[i].status = 'Rejected' ;
                  openTicketDetails[i].bgClassName = 'btn-danger';
                  break;
                case 'ReviewPass' :
                  openTicketDetails[i].status = 'Completed' ;
                  openTicketDetails[i].bgClassName = 'btn-success';
                  break;
                default:
                  openTicketDetails[i].status = 'In Process' ;
                  openTicketDetails[i].bgClassName = 'btn-primary';
                  break;
              }
              break;
            case 'quality team leader' :
              switch (ticketElements[ticketElements.length - 1].roleStatus) {
                case 'QAPassQTLAllocated':
                  openTicketDetails[i].status = 'New' ;      
                  openTicketDetails[i].bgClassName = 'btn-warning';
                  break;
                case 'ReviewPass' :
                  openTicketDetails[i].status = 'Approved' ; 
                  openTicketDetails[i].bgClassName = 'btn-success';
                  break;
                case 'ReiewFail' :
                  openTicketDetails[i].status = 'Rejected' ;
                  openTicketDetails[i].bgClassName = 'btn-danger';
                  break;
                case 'ReviewPass' :
                  openTicketDetails[i].status = 'Completed' ;
                  openTicketDetails[i].bgClassName = 'btn-success';
                  break;
                default:
                  openTicketDetails[i].status = 'In Process' ;
                  openTicketDetails[i].bgClassName = 'btn-primary';
                  break;
              }
              break;
            default : 
              openTicketDetails[i].status = 'In Process' ;
              openTicketDetails[i].bgClassName = 'btn-primary';
              break;
          }
          openTicketList.push(openTicketDetails[i]);
        }
      } 

      //Sorting the array according to the status depending upon the role
      var newTickets = [];
      var vFailTickets = [];
      var reviewFailTickets = [];
      var approvedTickets = [];
      var acceptedTickets = [];
      var allocatedTickets = [];
      var rejectedTickets = [];
      var completedTickets = [];
      var inProcessTickets = [];
      var selfAllocatedTickets = [];
      var proofSubmittedTickets = [];
      var proofReSubmittedTickets = [];
      var proofReSubmitTickets = [];
      var tmVerifiedTickets = [];
      var reAllocateTickets = [];
      var submitReportTickets = [];
      var qualityRejectedTickets = [];
      var selfAllocatedTickets = [];
      switch(role){
        case 'screening committee' :
          for(i=0; i < openTicketList.length;i++){
            if(openTicketList[i].status == 'New'){
              newTickets.push(openTicketList[i]);
            }else if(openTicketList[i].status == 'Approved'){
              approvedTickets.push(openTicketList[i]);
            }else if(openTicketList[i].status == 'Rejected'){
              rejectedTickets.push(openTicketList[i]);
            }else if(openTicketList[i].status == 'Completed'){
              completedTickets.push(openTicketList[i]);
            }else if(openTicketList[i].status == 'In Process'){
              inProcessTickets.push(openTicketList[i]);
            }
          }
          openTicketList = [];
          newTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          approvedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          rejectedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          completedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          inProcessTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          openTicketList = newTickets.concat(approvedTickets);
          openTicketList = openTicketList.concat(rejectedTickets);
          openTicketList = openTicketList.concat(completedTickets);
          openTicketList = openTicketList.concat(inProcessTickets);
          break;
        case 'team leader' :
          for(i=0; i < openTicketList.length;i++){
            if(openTicketList[i].status == 'New'){
              newTickets.push(openTicketList[i]);
            }else if(openTicketList[i].status == 'Allocated'){
              allocatedTickets.push(openTicketList[i]);
            }else if(openTicketList[i].status == 'Re-Allocate'){
              reAllocateTickets.push(openTicketList[i]);
            }else if(openTicketList[i].status == 'Completed'){
              completedTickets.push(openTicketList[i]);
            }else if(openTicketList[i].status == 'In Process'){
              inProcessTickets.push(openTicketList[i]);
            }
          }
          openTicketList = [];
          newTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          allocatedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          reAllocateTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          completedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          inProcessTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          openTicketList = newTickets.concat(reAllocateTickets);
          openTicketList = openTicketList.concat(allocatedTickets);
          openTicketList = openTicketList.concat(completedTickets);
          openTicketList = openTicketList.concat(inProcessTickets);
          break;
        case 'team member' :
          for(i=0; i < openTicketList.length;i++){
            if(openTicketList[i].status == 'Submit Report'){
              submitReportTickets.push(openTicketList[i]);
            }if(openTicketList[i].status == 'Proof Re-Submitted'){
              proofReSubmittedTickets.push(openTicketList[i]);
            }else if(openTicketList[i].status == 'Proof Re-Submit'){
              proofReSubmitTickets.push(openTicketList[i]);
            }else if(openTicketList[i].status == 'Proof Submitted'){
              proofSubmittedTickets.push(openTicketList[i]);
            }else if(openTicketList[i].status == 'Quality Rejected'){
              qualityRejectedTickets.push(openTicketList[i]);
            }else if(openTicketList[i].status == 'Self Allocated'){
              selfAllocatedTickets.push(openTicketList[i]);
            }else if(openTicketList[i].status == 'New'){
              newTickets.push(openTicketList[i]);
            }else if(openTicketList[i].status == 'Accepted'){
              acceptedTickets.push(openTicketList[i]);
            }else if(openTicketList[i].status == 'Rejected'){
              rejectedTickets.push(openTicketList[i]);
            }else if(openTicketList[i].status == 'Completed'){
              completedTickets.push(openTicketList[i]);
            }else if(openTicketList[i].status == 'In Process'){
              inProcessTickets.push(openTicketList[i]);
            }
          }
          openTicketList = [];
          submitReportTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          proofReSubmittedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          proofSubmittedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          proofReSubmitTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          qualityRejectedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          selfAllocatedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          newTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          acceptedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          rejectedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          completedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          inProcessTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          openTicketList = submitReportTickets.concat(proofReSubmittedTickets);
          openTicketList = openTicketList.concat(proofSubmittedTickets);
          openTicketList = openTicketList.concat(proofReSubmitTickets);
          openTicketList = openTicketList.concat(qualityRejectedTickets);
          openTicketList = openTicketList.concat(selfAllocatedTickets);
          openTicketList = openTicketList.concat(newTickets);
          openTicketList = openTicketList.concat(acceptedTickets);
          openTicketList = openTicketList.concat(rejectedTickets);
          openTicketList = openTicketList.concat(completedTickets);
          openTicketList = openTicketList.concat(inProcessTickets);
          break;
        case 'quality team member' :
          for(i=0; i < assignedTicketList.length;i++){
            if(assignedTicketList[i].status == 'Review Fail'){
              reviewFailTickets.push(assignedTicketList[i]);
            }if(assignedTicketList[i].status == 'New'){
              newTickets.push(assignedTicketList[i]);
            }else if(assignedTicketList[i].status == 'Approved'){
              approvedTickets.push(assignedTicketList[i]);
            }else if(assignedTicketList[i].status == 'Rejected'){
              rejectedTickets.push(assignedTicketList[i]);
            }else if(assignedTicketList[i].status == 'Completed'){
              completedTickets.push(assignedTicketList[i]);
            }else if(assignedTicketList[i].status == 'In Process'){
              inProcessTickets.push(assignedTicketList[i]);
            }
          }
          assignedTicketList = [];
          reviewFailTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          tmVerifiedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          proofSubmittedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          selfAllocatedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          newTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          approvedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          rejectedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          completedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          inProcessTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          assignedTicketList = reviewFailTickets.concat(newTickets);
          assignedTicketList = assignedTicketList.concat(approvedTickets);
          assignedTicketList = assignedTicketList.concat(rejectedTickets);
          assignedTicketList = assignedTicketList.concat(completedTickets);
          assignedTicketList = assignedTicketList.concat(inProcessTickets);
          break;
        case 'quality team leader' :
          for(i=0; i < openTicketList.length;i++){
            if(openTicketList[i].status == 'New'){
              newTickets.push(openTicketList[i]);
            }else if(openTicketList[i].status == 'Approved'){
              approvedTickets.push(openTicketList[i]);
            }else if(openTicketList[i].status == 'Rejected'){
              rejectedTickets.push(openTicketList[i]);
            }else if(openTicketList[i].status == 'Completed'){
              completedTickets.push(openTicketList[i]);
            }else if(openTicketList[i].status == 'In Process'){
              inProcessTickets.push(openTicketList[i]);
            }
          }
          assignedTicketList = [];
          newTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          approvedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          rejectedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          completedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          inProcessTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          assignedTicketList = newTickets.concat(approvedTickets);
          assignedTicketList = assignedTicketList.concat(rejectedTickets);
          assignedTicketList = assignedTicketList.concat(completedTickets);
          assignedTicketList = assignedTicketList.concat(inProcessTickets);
          break;
      }
    }
  }
  return {
    loading,
    openTicketList
  };
})(OpenTickets);