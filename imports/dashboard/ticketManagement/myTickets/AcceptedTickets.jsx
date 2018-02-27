import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { createContainer } from 'meteor/react-meteor-data';
import Validation from 'react-validation';
import validator from 'validator';
import {Tracker} from 'meteor/tracker';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import {TicketMaster} from "/imports/website/ServiceProcess/api/TicketMaster.js";
import {Order} from "/imports/website/ServiceProcess/api/Order.js";


// import { UserSubscriptions } from '/imports/website/contactUs/api/SubscriptionMaster.js';


export default class AcceptedTickets extends TrackerReact(Component){
	constructor(props){
        super(props);
        this.state = {
            "tableListData":[],
            "tatDate": "",
            "subscribe": Meteor.subscribe("allTickets"),
            "subscribeOrder": Meteor.subscribe("allOrders"),
            "userSubscribe" : Meteor.subscribe("userData"),
        }
        
    }

    componentDidMount(){

            this.userTracker = Tracker.autorun(()=>{
                if(this.state.subscribe.ready()){
                    
                    // var allTickets = TicketMaster.find({"ticketElement.empid":Meteor.userId(),"ticketStatus.status":"Accepted"}).fetch();
                    // var allTickets = TicketMaster.find({"ticketElement.empid":Meteor.userId()}).fetch();
                    var allTickets = TicketMaster.find({"ticketElement.empid":Meteor.userId(),"ticketElement.status":"Accepted"}).fetch();
                    console.log(allTickets);
                    for(var i=0;i<allTickets.length;i++){
                        var allOrders = Order.findOne({"_id":allTickets[i].orderId});
                        
                        for(var j=0;j<allTickets[i].ticketStatus.length;j++){
                            var dateValue = allTickets[i].ticketStatus[0].createdAt;
                            var startdate = moment(dateValue).format('L');
                            var new_date  = moment(startdate, "MM-DD-YYYY").add(1, 'days');
                            var day       = new_date.format('DD');
                            var month     = new_date.format('MM');
                            var year      = new_date.format('YYYY');
                            var tatDate   = month  + '/' + day + '/' + year;
                            
                            
                        }
                        
                    }
                    // console.log("allTickets :"+JSON.stringify(allTickets));
                    
                    if(allTickets){
                        this.setState({
                            'tableListData' : allTickets,
                            'tatDate'       : tatDate,
                            'orderId'       : allOrders.orderNo,
                        })
                    }
                }
            });
    }
    changeStatus(event){
        event.preventDefault();
        var ticketId =  $(event.currentTarget).attr('data-id');
        // console.log("ticketId :"+ticketId);
        var userID = Meteor.userId();
        // console.log("userID :"+userID);
        var userData = Meteor.users.findOne({"_id":userID});
        // console.log("userData :"+JSON.stringify(userData));
        if(userData){
            
            var staffName = userData.profile.firstname +" "+ userData.profile.lastname;
            // console.log("staffName :"+staffName);
            var role = userData.roles;
            var ticketElem={
                 ticketid  : ticketId,
                 staffId   : userID,
                 staffname : staffName,
                 role      : userData.roles,
                 
            }
            Meteor.call('updateTicket',ticketElem,function(error,result){
                if(result){
                    swal('Ticket Accepted!');
                }
            });

        }
        


    }
    render(){
        return( 
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
           
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

                            {  this.state.tableListData.map((data, index)=>{
                                return(
                                    <tr key={index}>
                                        <td><Link to={"/admin/ticket/"+data._id}>{data.ticketNumber}</Link></td>
                                        <td>{data.state.orderId}</td>
                                        <td>{data.serviceName}</td>
                                        <td>{moment(data.ticketStatus[0].createdAt).format('L')}</td>
                                        <td> {data.state.tatDate}</td>
                                        <td><button type="button" data-id={data._id} onClick={this.changeStatus.bind(this)} className=" newOrderbtn btn btn-primary">New</button></td>                                    
                                    </tr>
                                );
                            })
                            }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
        );
    }
}