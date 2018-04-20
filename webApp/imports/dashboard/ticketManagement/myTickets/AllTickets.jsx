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
class AllTickets extends TrackerReact(Component){
  constructor(props){
    super(props);
    this.state = {
      'userDetails': {},
      "userRoleIn": Meteor.userId(),
    }
  }
   render(){
      var ticketMasterData = [1, 2, 3, 4]
      return(            
        <div>
          <div className="content-wrapper">
            <section className="content">
              <div className="row">
                <div className="col-md-12">
                  <div className="box">
                    <div className="box-header with-border">
                      <h2 className="box-title"> All Tickets</h2> 
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
                                        this.props.alltickets.map((data, index)=>{
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
  var handleAllTickets = Meteor.subscribe("listTickets");
  var _id  = Meteor.userId();
  const userHandle  = Meteor.subscribe('userData',_id);
  const user        = Meteor.users.findOne({"_id" : _id});
  const loading    = !userHandle.ready() && !handleAllTickets.ready();
  var ticketAgeArray = [];
  if(user){
    var roleArr = user.roles;
    if(roleArr){
      var role = roleArr.find(function (obj) { return obj != 'backofficestaff' });
    }
    //Get all the Tickets
    var alltickets = TicketMaster.find({}).fetch();
    if(alltickets){
      //find last status of the Tickets
      for(i=0;i< alltickets.length; i++){
        var ticketElements = alltickets[i].ticketElement;
        switch(role){
          case 'screening committee' : 
            switch (ticketElements[ticketElements.length - 1].roleStatus) {
              case 'NewScrAllocated':
                alltickets[i].status = 'New' ;  
                alltickets[i].bgClassName = 'btn-warning';    
                break;
              case 'ScreenApproved' :
                alltickets[i].status = 'Approved' ; 
                alltickets[i].bgClassName = 'btn-success';
                break;
              case 'ScreenRejected' :
                alltickets[i].status = 'Rejected' ;
                alltickets[i].bgClassName = 'btn-danger';
                break;
              case 'ReviewPass' :
                alltickets[i].status = 'Completed' ;
                alltickets[i].bgClassName = 'btn-success';
                break;
              default:
                alltickets[i].status = 'In Process' ;
                alltickets[i].bgClassName = 'btn-primary';
                break;
            }
            break;
          case 'team leader' :
            switch (ticketElements[ticketElements.length - 1].roleStatus) {
              case 'screenTLAllocated':
                alltickets[i].status = 'New' ;      
                alltickets[i].bgClassName = 'btn-warning';
                break;
              case 'AssignAccept' :
                alltickets[i].status = 'In Process' ; 
                alltickets[i].bgClassName = 'btn-primary';
                break;
              case 'AssignReject' :
                alltickets[i].status = 'TM Rejected' ;
                alltickets[i].bgClassName = 'btn-warning';
                break;
              case 'ReviewPass' :
                alltickets[i].status = 'Completed' ;
                alltickets[i].bgClassName = 'btn-success';
                break;
              default:
                alltickets[i].status = 'In Process' ;
                alltickets[i].bgClassName = 'btn-primary';
                break;
            }
            break;
          case 'team member' :
            switch (ticketElements[ticketElements.length - 1].roleStatus) {
              case 'Assign':
                alltickets[i].status = 'New' ;      
                alltickets[i].bgClassName = 'btn-warning';
                break;
              case 'QAFail':
                alltickets[i].status = 'Quality Rejected' ;      
                alltickets[i].bgClassName = 'btn-warning';
                break;
              case 'SelfAllocated':
                alltickets[i].status = 'Self Allocated' ;      
                alltickets[i].bgClassName = 'btn-warning';
                break;
              case 'ProofSubmit':
                alltickets[i].status = 'Proof Submitted' ;      
                alltickets[i].bgClassName = 'btn-warning';
                break;
              case 'VerificationPass':
                alltickets[i].status = 'TM Verified' ;      
                alltickets[i].bgClassName = 'btn-warning';
                break;
              case 'AssignAccept' :
                alltickets[i].status = 'Accepted' ; 
                alltickets[i].bgClassName = 'btn-warning';
                break;
              case 'ReviewPass' :
                alltickets[i].status = 'Completed' ;
                alltickets[i].bgClassName = 'btn-success';
                break;
              default:
                alltickets[i].status = 'In Process' ;
                alltickets[i].bgClassName = 'btn-primary';
                break;
            }
            break;
          case 'quality team member' : 
            switch (ticketElements[ticketElements.length - 1].roleStatus) {
              case 'VerificationPassQTMAllocated':
                alltickets[i].status = 'New' ;      
                alltickets[i].bgClassName = 'btn-warning';
                break;
              case 'ReviewFail':
                alltickets[i].status = 'Review Fail' ;      
                alltickets[i].bgClassName = 'btn-warning';
                break;
              case 'QAPass' :
                alltickets[i].status = 'Approved' ; 
                alltickets[i].bgClassName = 'btn-success';
                break;
              case 'QAFail' :
                alltickets[i].status = 'Rejected' ;
                alltickets[i].bgClassName = 'btn-danger';
                break;
              case 'ReviewPass' :
                alltickets[i].status = 'Completed' ;
                alltickets[i].bgClassName = 'btn-success';
                break;
              default:
                alltickets[i].status = 'In Process' ;
                alltickets[i].bgClassName = 'btn-primary';
                break;
            }
            break;
          case 'quality team leader' :
            switch (ticketElements[ticketElements.length - 1].roleStatus) {
              case 'QAPassQTLAllocated':
                alltickets[i].status = 'New' ;      
                alltickets[i].bgClassName = 'btn-warning';
                break;
              case 'ReviewPass' :
                alltickets[i].status = 'Approved' ; 
                alltickets[i].bgClassName = 'btn-success';
                break;
              case 'ReiewFail' :
                alltickets[i].status = 'Rejected' ;
                alltickets[i].bgClassName = 'btn-danger';
                break;
              case 'ReviewPass' :
                alltickets[i].status = 'Completed' ;
                alltickets[i].bgClassName = 'btn-success';
                break;
              default:
                alltickets[i].status = 'In Process' ;
                alltickets[i].bgClassName = 'btn-primary';
                break;
            }
            break;
          default : 
            alltickets[i].status = 'In Process' ;
            alltickets[i].bgClassName = 'btn-primary';
            break;
        }
        // alltickets[i].status = ticketElements[ticketElements.length - 1].roleStatus ;
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
      var tmVerifiedTickets = [];
      switch(role){
        case 'screening committee' :
          for(i=0; i < alltickets.length;i++){
            if(alltickets[i].status == 'New'){
              newTickets.push(alltickets[i]);
            }else if(alltickets[i].status == 'Approved'){
              approvedTickets.push(alltickets[i]);
            }else if(alltickets[i].status == 'Rejected'){
              rejectedTickets.push(alltickets[i]);
            }else if(alltickets[i].status == 'Completed'){
              completedTickets.push(alltickets[i]);
            }else if(alltickets[i].status == 'In Process'){
              inProcessTickets.push(alltickets[i]);
            }
          }
          alltickets = [];
          newTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          approvedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          rejectedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          completedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          inProcessTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          alltickets = newTickets.concat(approvedTickets);
          alltickets = alltickets.concat(rejectedTickets);
          alltickets = alltickets.concat(completedTickets);
          alltickets = alltickets.concat(inProcessTickets);
          break;
        case 'team leader' :
          for(i=0; i < alltickets.length;i++){
            if(alltickets[i].status == 'New'){
              newTickets.push(alltickets[i]);
            }else if(alltickets[i].status == 'Allocated'){
              allocatedTickets.push(alltickets[i]);
            }else if(alltickets[i].status == 'TM Rejected'){
              rejectedTickets.push(alltickets[i]);
            }else if(alltickets[i].status == 'Completed'){
              completedTickets.push(alltickets[i]);
            }else if(alltickets[i].status == 'In Process'){
              inProcessTickets.push(alltickets[i]);
            }
          }
          alltickets = [];
          newTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          allocatedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          rejectedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          completedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          inProcessTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          alltickets = newTickets.concat(rejectedTickets);
          alltickets = alltickets.concat(allocatedTickets);
          alltickets = alltickets.concat(completedTickets);
          alltickets = alltickets.concat(inProcessTickets);
          break;
        case 'team member' :
          for(i=0; i < alltickets.length;i++){
            if(alltickets[i].status == 'Quality Rejected'){
              vFailTickets.push(alltickets[i]);
            }if(alltickets[i].status == 'New'){
              newTickets.push(alltickets[i]);
            }else if(alltickets[i].status == 'Self Allocated'){
              selfAllocatedTickets.push(alltickets[i]);
            }else if(alltickets[i].status == 'Proof Submitted'){
              proofSubmittedTickets.push(alltickets[i]);
            }else if(alltickets[i].status == 'TM Verified'){
              tmVerifiedTickets.push(alltickets[i]);
            }else if(alltickets[i].status == 'Accepted'){
              acceptedTickets.push(alltickets[i]);
            }else if(alltickets[i].status == 'Rejected'){
              rejectedTickets.push(alltickets[i]);
            }else if(alltickets[i].status == 'Completed'){
              completedTickets.push(alltickets[i]);
            }else if(alltickets[i].status == 'In Process'){
              inProcessTickets.push(alltickets[i]);
            }
          }
          alltickets = [];
          vFailTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          tmVerifiedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          proofSubmittedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          selfAllocatedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          newTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          acceptedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          rejectedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          completedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          inProcessTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          alltickets = vFailTickets.concat(newTickets);
          alltickets = alltickets.concat(tmVerifiedTickets);
          alltickets = alltickets.concat(proofSubmittedTickets);
          alltickets = alltickets.concat(selfAllocatedTickets);
          alltickets = alltickets.concat(acceptedTickets);
          alltickets = alltickets.concat(rejectedTickets);
          alltickets = alltickets.concat(completedTickets);
          alltickets = alltickets.concat(inProcessTickets);
          break;
        case 'quality team member' :
          for(i=0; i < alltickets.length;i++){
            if(alltickets[i].status == 'Review Fail'){
              reviewFailTickets.push(alltickets[i]);
            }if(alltickets[i].status == 'New'){
              newTickets.push(alltickets[i]);
            }else if(alltickets[i].status == 'Approved'){
              approvedTickets.push(alltickets[i]);
            }else if(alltickets[i].status == 'Rejected'){
              rejectedTickets.push(alltickets[i]);
            }else if(alltickets[i].status == 'Completed'){
              completedTickets.push(alltickets[i]);
            }else if(alltickets[i].status == 'In Process'){
              inProcessTickets.push(alltickets[i]);
            }
          }
          alltickets = [];
          reviewFailTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          tmVerifiedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          proofSubmittedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          selfAllocatedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          newTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          approvedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          rejectedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          completedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          inProcessTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          alltickets = reviewFailTickets.concat(newTickets);
          alltickets = alltickets.concat(approvedTickets);
          alltickets = alltickets.concat(rejectedTickets);
          alltickets = alltickets.concat(completedTickets);
          alltickets = alltickets.concat(inProcessTickets);
          break;
        case 'quality team leader' :
          for(i=0; i < alltickets.length;i++){
            if(alltickets[i].status == 'New'){
              newTickets.push(alltickets[i]);
            }else if(alltickets[i].status == 'Approved'){
              approvedTickets.push(alltickets[i]);
            }else if(alltickets[i].status == 'Rejected'){
              rejectedTickets.push(alltickets[i]);
            }else if(alltickets[i].status == 'Completed'){
              completedTickets.push(alltickets[i]);
            }else if(alltickets[i].status == 'In Process'){
              inProcessTickets.push(alltickets[i]);
            }
          }
          alltickets = [];
          newTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          approvedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          rejectedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          completedTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          inProcessTickets.sort(function(a,b){ return new Date(a.tatDate) - new Date(b.tatDate);});
          alltickets = newTickets.concat(approvedTickets);
          alltickets = alltickets.concat(rejectedTickets);
          alltickets = alltickets.concat(completedTickets);
          alltickets = alltickets.concat(inProcessTickets);
          break;
      } 
    }
  }
  return {
    loading,
    alltickets,
    ticketAgeArray
  };
})(AllTickets);