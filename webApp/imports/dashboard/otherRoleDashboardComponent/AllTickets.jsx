import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';



export default class AllTickets extends TrackerReact(Component){
	constructor(props){
        super(props);
        this.state = {
        } 
    }


    render(){
        return(
            <div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 headerBlockWrap">
                    <div className="col-lg-4 col-md-3 col-sm-3 col-xs-3 ">
                        <div className="col-lg-12 innerblock tableHead noLRPad">
                        <label>All Tickets</label>                        
                        <table className="table table-hover table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>John</td>
                                    <td>Doe</td>
                                    <td>john@example.com</td>
                                </tr>
                                <tr>
                                    <td>Mary</td>
                                    <td>Moe</td>
                                    <td>mary@example.com</td>
                                </tr>
                                <tr>
                                    <td>July</td>
                                    <td>Dooley</td>
                                    <td>july@example.com</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}
// AllTicketsContainer = withTracker(props => { 
   
// })(AllTickets);
// export default AllTicketsContainer;
