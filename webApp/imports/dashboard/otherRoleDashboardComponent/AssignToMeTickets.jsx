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
                switch(role){
                    case 'screening committee' : 
                        switch (ticketElements[ticketElements.length - 1].roleStatus) {
                        case 'NewScrAllocated':
                            assignToMeTicketList[i].status = 'New' ;  
                            assignToMeTicketList[i].bgClassName = 'btn-warning';    
                            break;
                        case 'ScreenApproved' :
                            assignToMeTicketList[i].status = 'Approved' ; 
                            assignToMeTicketList[i].bgClassName = 'btn-success';
                            break;
                        case 'ScreenRejected' :
                            assignToMeTicketList[i].status = 'Rejected' ;
                            assignToMeTicketList[i].bgClassName = 'btn-danger';
                            break;
                        case 'ReviewPass' :
                            assignToMeTicketList[i].status = 'Completed' ;
                            assignToMeTicketList[i].bgClassName = 'btn-success';
                            break;
                        default:
                            assignToMeTicketList[i].status = 'In Process' ;
                            assignToMeTicketList[i].bgClassName = 'btn-primary';
                            break;
                        }
                        break;
                    case 'team leader' :
                        switch (ticketElements[ticketElements.length - 1].roleStatus) {
                        case 'screenTLAllocated':
                            assignToMeTicketList[i].status = 'New' ;      
                            assignToMeTicketList[i].bgClassName = 'btn-warning';
                            break;
                        case 'AssignAccept' :
                            assignToMeTicketList[i].status = 'Allocated' ; 
                            assignToMeTicketList[i].bgClassName = 'btn-success';
                            break;
                        case 'AssignReject' :
                            assignToMeTicketList[i].status = 'Rejected' ;
                            assignToMeTicketList[i].bgClassName = 'btn-danger';
                            break;
                        case 'ReviewPass' :
                            assignToMeTicketList[i].status = 'Completed' ;
                            assignToMeTicketList[i].bgClassName = 'btn-success';
                            break;
                        default:
                            assignToMeTicketList[i].status = 'In Process' ;
                            assignToMeTicketList[i].bgClassName = 'btn-primary';
                            break;
                        }
                        break;
                    case 'team member' :
                        switch (ticketElements[ticketElements.length - 1].roleStatus) {
                            case 'Assign':
                                assignToMeTicketList[i].status = 'New' ;      
                                assignToMeTicketList[i].bgClassName = 'btn-warning';
                                break;
                            case 'QAFail':
                                assignToMeTicketList[i].status = 'New' ;      
                                assignToMeTicketList[i].bgClassName = 'btn-warning';
                                break;
                            case 'AssignAccept' :
                                assignToMeTicketList[i].status = 'Accepted' ; 
                                assignToMeTicketList[i].bgClassName = 'btn-success';
                                break;
                            case 'AssignReject' :
                                assignToMeTicketList[i].status = 'Rejected' ;
                                assignToMeTicketList[i].bgClassName = 'btn-danger';
                                break;
                            case 'ReviewPass' :
                                assignToMeTicketList[i].status = 'Completed' ;
                                assignToMeTicketList[i].bgClassName = 'btn-success';
                                break;
                            default:
                                assignToMeTicketList[i].status = 'In Process' ;
                                assignToMeTicketList[i].bgClassName = 'btn-primary';
                                break;
                        }
                        break;
                    case 'quality team member' : 
                        switch (ticketElements[ticketElements.length - 1].roleStatus) {
                        case 'VerificationPassQTMAllocated':
                            assignToMeTicketList[i].status = 'New' ;      
                            assignToMeTicketList[i].bgClassName = 'btn-warning';
                            break;
                        case 'ReviewFail':
                            assignToMeTicketList[i].status = 'New' ;      
                            assignToMeTicketList[i].bgClassName = 'btn-warning';
                            break;
                        case 'QAPass' :
                            assignToMeTicketList[i].status = 'Approved' ; 
                            assignToMeTicketList[i].bgClassName = 'btn-success';
                            break;
                        case 'QAFail' :
                            assignToMeTicketList[i].status = 'Rejected' ;
                            assignToMeTicketList[i].bgClassName = 'btn-danger';
                            break;
                        case 'ReviewPass' :
                            assignToMeTicketList[i].status = 'Completed' ;
                            assignToMeTicketList[i].bgClassName = 'btn-success';
                            break;
                        default:
                            assignToMeTicketList[i].status = 'In Process' ;
                            assignToMeTicketList[i].bgClassName = 'btn-primary';
                            break;
                        }
                        break;
                    case 'quality team leader' :
                        switch (ticketElements[ticketElements.length - 1].roleStatus) {
                        case 'QAPassQTLAllocated':
                            assignToMeTicketList[i].status = 'New' ;      
                            assignToMeTicketList[i].bgClassName = 'btn-warning';
                            break;
                        case 'ReviewPass' :
                            assignToMeTicketList[i].status = 'Approved' ; 
                            assignToMeTicketList[i].bgClassName = 'btn-success';
                            break;
                        case 'ReiewFail' :
                            assignToMeTicketList[i].status = 'Rejected' ;
                            assignToMeTicketList[i].bgClassName = 'btn-danger';
                            break;
                        case 'ReviewPass' :
                            assignToMeTicketList[i].status = 'Completed' ;
                            assignToMeTicketList[i].bgClassName = 'btn-success';
                            break;
                        default:
                            assignToMeTicketList[i].status = 'In Process' ;
                            assignToMeTicketList[i].bgClassName = 'btn-primary';
                            break;
                        }
                        break;
                    default : 
                        assignToMeTicketList[i].status = 'In Process' ;
                        assignToMeTicketList[i].bgClassName = 'btn-primary';
                        break;
                }
                // assignToMeTicketList[i].status = ticketElements[ticketElements.length - 1].roleStatus ;
            } 
        }
    }
    return {
        loading,
        assignToMeTicketList
    };
})(AssignToMeTickets);
export default AssignToMeTicketsContainer;
