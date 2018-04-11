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
                      <h2 className="box-title"> All Ticket</h2> 
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
                                        this.props.alltickets.map((data, index)=>{
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
  var handleAllTickets = Meteor.subscribe("listTickets");
  var _id  = Meteor.userId();
  const userHandle  = Meteor.subscribe('userData',_id);
  const user        = Meteor.users.findOne({"_id" : _id});
  const loading    = !userHandle.ready() && !handleAllTickets.ready();

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
                alltickets[i].status = 'Allocated' ; 
                alltickets[i].bgClassName = 'btn-success';
                break;
              case 'AssignReject' :
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
          case 'team member' :
            switch (ticketElements[ticketElements.length - 1].roleStatus) {
              case 'Assign':
                alltickets[i].status = 'New' ;      
                alltickets[i].bgClassName = 'btn-warning';
                break;
              case 'QAFail':
                alltickets[i].status = 'New' ;      
                alltickets[i].bgClassName = 'btn-warning';
                break;
              case 'AssignAccept' :
                alltickets[i].status = 'Accepted' ; 
                alltickets[i].bgClassName = 'btn-success';
                break;
              case 'AssignReject' :
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
          case 'quality team member' : 
            switch (ticketElements[ticketElements.length - 1].roleStatus) {
              case 'VerificationPassQTMAllocated':
                alltickets[i].status = 'New' ;      
                alltickets[i].bgClassName = 'btn-warning';
                break;
              case 'ReviewFail':
                alltickets[i].status = 'New' ;      
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
    }
  }
  return {
    loading,
    alltickets
  };
})(AllTickets);