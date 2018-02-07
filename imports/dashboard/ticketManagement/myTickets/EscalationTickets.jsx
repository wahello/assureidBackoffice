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

import {Order} from "/imports/website/ServiceProcess/api/Order.js";


// import { UserSubscriptions } from '/imports/website/contactUs/api/SubscriptionMaster.js';


export default class EscalationTickets extends TrackerReact(Component){
	constructor(props){
        super(props);
        // this.state = {
        //     "tableListData":[],
        //     "tatDate": "",
        //     "subscribe": Meteor.subscribe("allOrders"),
        // }
        
    }

    componentDidMount(){

            // this.userTracker = Tracker.autorun(()=>{
            //     if(this.state.subscribe.ready()){
            //         var allOrders = Order.find({"delieveryStatus.status":"New Order"}).fetch();
            //         for(var i=0;i<allOrders.length;i++){
            //             for(var j=0;j<allOrders[i].delieveryStatus.length;j++){
            //                 var dateValue = allOrders[i].delieveryStatus[0].createdAt;
            //                 var startdate = moment(dateValue).format('L');
            //                 var new_date  = moment(startdate, "MM-DD-YYYY").add(1, 'days');
            //                 var day       = new_date.format('DD');
            //                 var month     = new_date.format('MM');
            //                 var year      = new_date.format('YYYY');
            //                 var tatDate   = day + '/' + month + '/' + year
                          
                            
            //             }
                        
            //         }
                    
            //         if(allOrders){
            //             this.setState({
            //                 'tableListData' : allOrders,
            //                 'tatDate'       : tatDate
            //             })
            //         }
            //     }
            // });
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

                            {/* {  this.state.tableListData.map((data, index)=>{
                                return(
                                    <tr key={index}>
                                        <td></td>
                                        <td>{data.orderNo}</td>
                                        <td>{data.serviceName}</td>
                                        <td>{moment(data.delieveryStatus[0].createdAt).format('l')}</td>
                                        <td> {this.state.tatDate}</td>
                                        <td><button type="button" className=" newOrderbtn btn btn-primary">Escalation</button></td>                                    
                                    </tr>
                                );
                            })
                            } */}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
        );
    }
}