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




class EscalatedTickets extends TrackerReact(Component){
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
                      <h2 className="box-title">My Esclated Cases</h2> 
                    </div>
                        <div className="box-body">
                            <div className="ticketWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                
                                <div>
                                <div className="reports-table-main">
                                    <table id="subscriber-list-outerTable" className="newOrderwrap subscriber-list-outerTable table table-bordered table-hover table-striped table-striped table-responsive table-condensed table-bordered">
                                    <thead className="table-head umtblhdr">
                                    <tr className="hrTableHeader UML-TableTr">
                                    <th className=""> Case No.</th>
                                    
                                    <th className=""> Service Name </th>
                                    <th className=""> Receive Date </th>
                                    <th className=""> Due Date  </th>
                                    <th className=""> Aging &nbsp;( In Days ) </th>   
                                    <th className=""> Status </th>
                                    
                                    </tr>
                                </thead>
                                        <tbody>

                                        {
                                          !this.props.loading ?
                                            this.props.TicketList.map((data, index)=>{
                                              return(
                                                  <tr key={index}>
                                                      <td><Link to={"/admin/ticket/"+data._id}>{data.ticketNumber}</Link> </td>                                                  
                                                      <td><Link to={"/admin/ticket/"+data._id}>{data.serviceName}</Link> </td>
                                                      <td><Link to={"/admin/ticket/"+data._id}>{moment(data.createdAt).format('DD MMM YYYY')}</Link></td>
                                                      <td><Link to={"/admin/ticket/"+data._id}>{moment(data.tatDate).format('DD MMM YYYY')}</Link></td> 
                                                      <td> <Link to={"/admin/ticket/"+data._id}>{Math.round(Math.abs((new Date().getTime() - data.createdAt.getTime())/(24*60*60*1000)))}</Link> </td>
                                                      <td className={data.bgClassName}><Link to={"/admin/ticket/"+data._id} className="statuswcolor">{data.status}</Link> </td>  
                                                          
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
export default EsclatedTicketsContainer = withTracker(props => {
  var handleTicketList = Meteor.subscribe("listTickets");
  var handleUseFunc = Meteor.subscribe('userfunction');

  var ticketId = props.params.id;
  var loading  = !handleTicketList.ready() && !handleUseFunc.ready();
  var TicketList = [];
  var duration
  var  _id     = Meteor.userId(); 
  const user        = Meteor.users.findOne({"_id" : _id});
  
  var assignedTicketList = TicketMaster.find({ticketElement: { $elemMatch: { allocatedToUserid: _id }}}).fetch();
  
  console.log("user");
  console.log(user);
  if(user){
    var roleArr = user.roles;
    if(roleArr){
      var role = roleArr.find(function (obj) { return obj != 'backofficestaff' });
    }
    var todaysDate = new Date();
    if(assignedTicketList){
    for(var i=0;i<assignedTicketList.length;i++){
        var ticketElemLength       = assignedTicketList[i].ticketElement.length ;      
        var ticketLastActionDate   = assignedTicketList[i].ticketElement[ticketElemLength-1].createdAt; 
        var formatLastDate = new Date(ticketLastActionDate);       
        var lastTimeStamp    = formatLastDate.getTime();
        var todaysTimeStamp  = todaysDate.getTime();
        var difference = todaysTimeStamp - lastTimeStamp;
        
        var hoursDifference = Math.floor(difference/1000/60/60);
        console.log('hoursDifference: ', hoursDifference);
        assignedTicketList[i].status = "Escalated";
        assignedTicketList[i].bgClassName = "btn-danger";

      
        switch(assignedTicketList[i].ticketElement[ticketElemLength - 1].roleStatus){

          case 'NewScrAllocated':
            console.log("Inside NewScrAllocated");
              if(hoursDifference > 48){
                TicketList.push(assignedTicketList[i]);
              }
          break;

          case 'screenTLAllocated':
            if(hoursDifference > 48){
              TicketList.push(assignedTicketList[i]);
            }
          break;
      
          case 'AssignAccept':
            if(hoursDifference > 48){
              TicketList.push(assignedTicketList[i]);
            }
          break;

          case 'SelfAllocated':
            if(hoursDifference > 48){
              TicketList.push(assignedTicketList[i]);
            }
          break;

          case 'VerificationPassQTMAllocated':
            if(hoursDifference > 48){
              TicketList.push(assignedTicketList[i]);
            }
          break;

          case 'QAPassQTLAllocated':
            if(hoursDifference > 48){
              TicketList.push(assignedTicketList[i]);
            }
          break;

          

        }

      }
  }
}
console.log("TicketList");
console.log(TicketList);
  
  
  
  return {
    loading,
    TicketList
  }
})(EscalatedTickets);