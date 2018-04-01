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
class AllTickets extends TrackerReact(Component){
  constructor(props){
    super(props);
    this.state = {
      'userDetails': {},
      "userRoleIn": Meteor.userId(),
    }
  }
   render(){
      var ticketBucketDataa = [1, 2, 3, 4]
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
                                        this.props.dataDetails.map((data, index)=>{
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
export default AllTicketContainer = withTracker(props => {
  var handleAllBucketTick = Meteor.subscribe("allTicketBucket");
  var ticketArr = [];
  var dataDetails = [];
  var ticketId = props.params.id;
  var loading = !handleAllBucketTick.ready();
  var ticketBucketData = TicketBucket.find({}).fetch();
  if(ticketBucketData){
    for(var i=0;i<ticketBucketData.length;i++){
        ticketArr.push({ 'ticketId' : ticketBucketData[i].ticketid});
    }
    var pluckId = _.pluck(ticketArr,"ticketId");
    var uniqueId = _.uniq(pluckId);
    if(uniqueId.length >0){
      for(var j=0;j<uniqueId.length;j++){
        var singleDetails = TicketBucket.findOne({'ticketid':uniqueId[j]},{sort:{'createdAt':-1}});
             dataDetails.push(
              {
                  'ticketid'    : singleDetails.ticketid,
                  'ticketNumber': singleDetails.ticketNumber,
                  'orderId'     : singleDetails.orderId,
                  'orderNo'     : singleDetails.orderNo,
                  'serviceName' : singleDetails.serviceName,
                  'createdAt'   :  singleDetails.createdAt,
                  'tatDate'     :  singleDetails.tatDate,
                  'status'      : singleDetails.status,
              })        
      }
    }
  }
  return {
    loading,
    ticketBucketData,
    dataDetails
  };
})(AllTickets);