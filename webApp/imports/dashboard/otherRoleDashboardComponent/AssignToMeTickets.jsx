import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import {Link} from 'react-router';

export default class AssignToMeTickets extends TrackerReact(Component){
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
                            <tr>
                                <td>1</td>
                                <td>Address Verification</td>
                                <td>1/2/2018</td>
                                <td><lable className="bg-orange tdStatus">Assign</lable></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Address Verification</td>
                                <td>1/2/2018</td>
                                <td><lable className="bg-orange tdStatus">Assign</lable></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Address Verification</td>
                                <td>1/2/2018</td>
                                <td><lable className="bg-orange tdStatus">Assign</lable></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
// AlllocatedTicketsContainer = withTracker(props => { 
   
// })(AlllocatedTickets);
// export default AlllocatedTicketsContainer;
