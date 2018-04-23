import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import {Link} from 'react-router';

export default class TopStates extends TrackerReact(Component){
	constructor(props){
        super(props);
        this.state = {
        } 
    }
    render(){
        return(    
            <div className="col-lg-12 col-md-3 col-sm-3 col-xs-3 noLRPad">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 innerblock innerblock1 tableinnetWrap tableinnetWrap1 noLRPad">
                    <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ticketTableLabel">Top States                    
                        <span>
                            <Link to="/admin/assignedtickets" title="View All">
                                {/* <i className="fa fa-arrow-right pull-right arrowcolor" aria-hidden="true"></i> */}
                            </Link>
                        </span>
                    </label>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="col-lg-8 col-lg-offset-2 col-md-8 col-sm-12 col-xs-12 horizontalwrap">
                            <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12">Maharashtra</label>                                 
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 statediv bg-warning"></div>
                            <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12">Gujrat</label>                                 
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 statediv bg-primary"></div>
                            <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12">Delhi</label>                                 
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 statediv bg-success"></div>
                            <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12">Kerala</label>                                 
                             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 statediv bg-info"></div>
                           {/* <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12">Kokan</label>                                 
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 statediv bg-secondary"></div>
                            <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12">Aurangabad</label>                                 
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 statediv bg-warning"></div> */}
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}
