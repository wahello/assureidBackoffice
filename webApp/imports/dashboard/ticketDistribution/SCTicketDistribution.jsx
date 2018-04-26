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

class SCTicketDistribution extends TrackerReact(Component){
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
                      <h2 className="box-title">Screening Committee Ticket Details</h2> 
                    </div>
                      <div className="box-body">
                        <div className="ticketWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          {/* {this.props.ticketBucketData[0].orderId} */}
                            <div>
                              <div className="reports-table-main">
                                <table id="subscriber-list-outerTable" className="newOrderwrap subscriber-list-outerTable table table-bordered table-hover table-striped table-striped table-responsive table-condensed table-bordered">
                                  <thead className="table-head umtblhdr">
                                    <tr className="hrTableHeader info UML-TableTr">
                                      <th className=""> SC1</th>
                                      <th className=""> SC2</th>
                                      <th className=""> SC3</th>
                                      <th className=""> SC4</th>
                                                          
                                    </tr>
                                  </thead>
                                  <tbody>
                                  <tr>    
                                    <td>5/10</td>
                                    <td>5/10</td>
                                    <td>5/10</td>
                                    <td>5/10</td>     
                                 </tr>
                                 <tr>    
                                    <td>T0</td>
                                    <td>T1</td>
                                    <td>T2</td>
                                    <td>T3</td>     
                                 </tr>
                                 <tr>    
                                    <td>T0</td>
                                    <td>T1</td>
                                    <td>T2</td>
                                    <td>T3</td>     
                                 </tr>
                                 <tr>    
                                    <td>T0</td>
                                    <td>T1</td>
                                    <td>T2</td>
                                    <td>T3</td>     
                                 </tr>
                                    {/* {
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
                                      <tr>
                                          <td></td>
                                          <td></td>
                                          <td className ="nodata">Nothing To Dispaly</td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                      </tr>
                                    } */}
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
export default SCTicketDistributionContainer = withTracker(props => {
//   var handleAllSCUsers = Meteor.subscribe("listTickets");
var allUsers = Meteor.users.find({'roles':"screening committee"});
  var _id  = Meteor.userId();
  const userHandle  = Meteor.subscribe('userData',_id);
  const user        = Meteor.users.findOne({"_id" : _id});
  const loading    = !userHandle.ready() && !handleAllTickets.ready();
  return {
    loading,
    
  };
})(SCTicketDistribution);