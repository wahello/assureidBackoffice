import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';



export default class HeaderBlock extends TrackerReact(Component){
	constructor(props){
        super(props);
        this.state = {
        } 
    }


    render(){
        return(
            <div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 headerBlockWrap">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 ">
                        <div className="col-lg-12 innerblock noLRPad">
                            <span className="col-lg-4 noLRPad">
                                <i className="fa fa-ticket iconStyle bg-blue" aria-hidden="true"></i>
                            </span>
                            <div className="col-lg-6 noLRPad">
                                <div className="col-lg-12 innerboxtext">
                                    <span className="col-lg-12"> &nbsp; &nbsp; All Tickets</span>
                                    <span className="col-lg-12">&nbsp; &nbsp; 665</span>
                                </div>
                                {/* <span className="col-lg-12 innerboxtext"> &nbsp; &nbsp; Quantity</span>
                                <span className="col-lg-12 innerboxtext">&nbsp; &nbsp;11,998</span> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                        <div className="col-lg-12 innerblock noLRPad">                        
                            <span className="col-lg-4 noLRPad">
                                <i className="fa fa-ticket iconStyle bg-green" aria-hidden="true"></i>
                            </span>
                            <div className="col-lg-6 noLRPad">
                                <div className="col-lg-12 innerboxtext">
                                    <span className="col-lg-12"> &nbsp; &nbsp; Allocated Tickets</span>
                                    <span className="col-lg-12">&nbsp; &nbsp; 500</span>
                                </div>
                                {/* <span className="col-lg-12 innerboxtext"> &nbsp; &nbsp; Quantity</span>
                                <span className="col-lg-12 innerboxtext">&nbsp; &nbsp;11,998</span> */}
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                        <div className="col-lg-12 innerblock noLRPad">
                            <span className="col-lg-4 noLRPad">
                                <i className="fa fa-ticket iconStyle bg-orange" aria-hidden="true"></i>
                            </span>
                            <div className="col-lg-6 noLRPad">
                                <div className="col-lg-12 innerboxtext">
                                    <span className="col-lg-12"> &nbsp; &nbsp;Assign To Me </span>
                                    <span className="col-lg-12">&nbsp; &nbsp; 20</span>
                                </div>
                                {/* <span className="col-lg-12 innerboxtext"> &nbsp; &nbsp; Quantity</span>
                                <span className="col-lg-12 innerboxtext">&nbsp; &nbsp;11,998</span> */}
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                        <div className="col-lg-12 innerblock noLRPad">                        
                            <span className="col-lg-4 noLRPad ">
                                <i className="fa fa-ticket iconStyle bg-red" aria-hidden="true"></i>
                            </span>
                            <div className="col-lg-6 noLRPad">
                                <div className="col-lg-12 innerboxtext">
                                    <span className="col-lg-12"> &nbsp; &nbsp;Rejected Tickets </span>
                                    <span className="col-lg-12">&nbsp; &nbsp; 3</span>
                                </div>
                                {/* <span className="col-lg-12 innerboxtext"> &nbsp; &nbsp; Quantity</span>
                                <span className="col-lg-12 innerboxtext">&nbsp; &nbsp;11,998</span> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
// HeaderBlockContainer = withTracker(props => { 
   
// })(HeaderBlock);
// export default HeaderBlockContainer;
