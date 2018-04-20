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
                                                  <td>{moment(data.createdAt).format('DD-MM-YYYY')}</td>
                                                  <td>{data.tatDate}</td> 
                                                  <td className={data.bgClassName}>{data.status}</td>       
                                              </tr>
                                          );
                                        })
                                      :
                                      <div>
                                          
                                          return(<span className ="nodata">Nothing To Dispaly</span>);

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
                assignedTicketList[i].bgClassName = 'btn-warning';
                break;
              case 'SelfAllocated' :
                assignedTicketList[i].status = 'Self Allocated' ; 
                assignedTicketList[i].bgClassName = 'btn-warning';
                break;
              case 'AssignReject' :
                assignedTicketList[i].status = 'Rejected' ;
                assignedTicketList[i].bgClassName = 'btn-danger';
                break;
              case 'ProofSubmit' :
                assignedTicketList[i].status = 'Proof Submitted' ;      
                assignedTicketList[i].bgClassName = 'btn-warning';
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
                assignedTicketList[i].status = 'Review Fail' ;      
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
          for(i=0; i < assignedTicketList.length;i++){
            if(assignedTicketList[i].status == 'New'){
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
        case 'team leader' :
          for(i=0; i < assignedTicketList.length;i++){
            if(assignedTicketList[i].status == 'New'){
              newTickets.push(assignedTicketList[i]);
            }else if(assignedTicketList[i].status == 'Allocated'){
              allocatedTickets.push(assignedTicketList[i]);
            }else if(assignedTicketList[i].status == 'Re-Allocate'){
              reAllocateTickets.push(assignedTicketList[i]);
            }else if(assignedTicketList[i].status == 'Completed'){
              completedTickets.push(assignedTicketList[i]);
            }else if(assignedTicketList[i].status == 'In Process'){
              inProcessTickets.push(assignedTicketList[i]);
            }
          }
          assignedTicketList = [];
          newTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          allocatedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          reAllocateTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          completedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          inProcessTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          assignedTicketList = newTickets.concat(reAllocateTickets);
          assignedTicketList = assignedTicketList.concat(allocatedTickets);
          assignedTicketList = assignedTicketList.concat(completedTickets);
          assignedTicketList = assignedTicketList.concat(inProcessTickets);
          break;
        case 'team member' :
          for(i=0; i < assignedTicketList.length;i++){
            if(assignedTicketList[i].status == 'Submit Report'){
              submitReportTickets.push(assignedTicketList[i]);
            }if(assignedTicketList[i].status == 'Proof Re-Submitted'){
              proofReSubmittedTickets.push(assignedTicketList[i]);
            }else if(assignedTicketList[i].status == 'Proof Re-Submit'){
              proofReSubmitTickets.push(assignedTicketList[i]);
            }else if(assignedTicketList[i].status == 'Proof Submitted'){
              proofSubmittedTickets.push(assignedTicketList[i]);
            }else if(assignedTicketList[i].status == 'Quality Rejected'){
              qualityRejectedTickets.push(assignedTicketList[i]);
            }else if(assignedTicketList[i].status == 'Self Allocated'){
              selfAllocatedTickets.push(assignedTicketList[i]);
            }else if(assignedTicketList[i].status == 'New'){
              newTickets.push(assignedTicketList[i]);
            }else if(assignedTicketList[i].status == 'Accepted'){
              acceptedTickets.push(assignedTicketList[i]);
            }else if(assignedTicketList[i].status == 'Rejected'){
              rejectedTickets.push(assignedTicketList[i]);
            }else if(assignedTicketList[i].status == 'Completed'){
              completedTickets.push(assignedTicketList[i]);
            }else if(assignedTicketList[i].status == 'In Process'){
              inProcessTickets.push(assignedTicketList[i]);
            }
          }
          assignedTicketList = [];
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
          assignedTicketList = submitReportTickets.concat(proofReSubmittedTickets);
          assignedTicketList = assignedTicketList.concat(proofSubmittedTickets);
          assignedTicketList = assignedTicketList.concat(proofReSubmitTickets);
          assignedTicketList = assignedTicketList.concat(qualityRejectedTickets);
          assignedTicketList = assignedTicketList.concat(selfAllocatedTickets);
          assignedTicketList = assignedTicketList.concat(newTickets);
          assignedTicketList = assignedTicketList.concat(acceptedTickets);
          assignedTicketList = assignedTicketList.concat(rejectedTickets);
          assignedTicketList = assignedTicketList.concat(completedTickets);
          assignedTicketList = assignedTicketList.concat(inProcessTickets);
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
          for(i=0; i < assignedTicketList.length;i++){
            if(assignedTicketList[i].status == 'New'){
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
    assignedTicketList
  };
})(AssignedTickets);
