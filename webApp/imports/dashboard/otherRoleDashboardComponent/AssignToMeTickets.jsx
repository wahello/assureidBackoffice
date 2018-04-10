import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import {Link} from 'react-router';
import { TicketMaster } from '/imports/website/ServiceProcess/api/TicketMaster.js';
class AssignToMeTickets extends TrackerReact(Component){
	constructor(props){
        super(props);
        this.state = {
        } 
    }
    render(){
        return(    
            <div className="col-lg-12 col-md-3 col-sm-3 col-xs-3 noLRPad">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innerblock tableinnetWrap noLRPad">
                <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ticketTableLabel">Assign To Me Tickets                        
                    <span>
                        <Link to="/admin/assignedtickets" title="View All">
                            <i className="fa fa-arrow-right pull-right arrowcolor" aria-hidden="true"></i>
                        </Link>
                    </span>
                </label>
                    <table className="table">
                        <thead>
                            <tr className="tableHead">
                                <th>Ticket No.</th>
                                <th>Service Name</th>
                                <th>Arrival Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!this.props.loading ?
                                this.props.assignToMeTicketList.map((data, index)=>{
                                    return(
                                        <tr key={index}>                  
                                            <td><Link to={"/admin/ticket/"+data._id}>{data.ticketNumber}</Link></td>
                                            <td>{data.serviceName}</td>
                                            <td>{moment(data.createdAt).format('l')}</td>
                                            <td><lable className="bg-orange tdStatus"> {data.status} </lable> </td>       
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
        )
    }
}
AssignToMeTicketsContainer = withTracker(props => { 
    var handleAssignToMeTicketList = Meteor.subscribe("listTickets");
    var _id  = Meteor.userId();
    const userHandle  = Meteor.subscribe('userData',_id);
    const user        = Meteor.users.findOne({"_id" : _id});
    const loading    = !userHandle.ready() && !handleAssignToMeTicketList.ready();

    if(user){
        var roleArr = user.roles;
        if(roleArr){
        var role = roleArr.find(function (obj) { return obj != 'backofficestaff' });
        }
        //Get all the Tickets Assigned to Me 
        var assignToMeTicketList = TicketMaster.find({ticketElement: { $elemMatch: { allocatedToUserid: _id }}}).fetch();
        if(assignToMeTicketList){
        //find last status of the Tickets
        for(i=0;i< assignToMeTicketList.length; i++){
            var ticketElements = assignToMeTicketList[i].ticketElement;
            assignToMeTicketList[i].status = ticketElements[ticketElements.length - 1].roleStatus ;
        } 
        }
    }
    return {
        loading,
        assignToMeTicketList
    };
})(AssignToMeTickets);
export default AssignToMeTicketsContainer;
