import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import { TicketMaster } from '/imports/website/ServiceProcess/api/TicketMaster.js';
class HeaderBlock extends TrackerReact(Component){
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
                                    <span className="col-lg-12">&nbsp; &nbsp; {this.props.allticketsCount}</span>
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
                                    <span className="col-lg-12">&nbsp; &nbsp; {this.props.assignedTicketCount}</span>
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
                                    <span className="col-lg-12">&nbsp; &nbsp; {this.props.rejectTicketCount}</span>
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
HeaderBlockContainer = withTracker(props => { 
    var handleAllTick = Meteor.subscribe("allTickets");
    var loading = !handleAllTick.ready();
    var _id  = Meteor.userId();
    const userHandle  = Meteor.subscribe('userData',_id);
    const user        = Meteor.users.findOne({"_id" : _id});
    const loading1    = !userHandle.ready();
    if(user){
      var roleArr = user.roles;
      if(roleArr){
        var role = roleArr.find(function (obj) { return obj != 'backofficestaff' });
      }
      var allticketsDetalis      = TicketMaster.find({}).fetch();
      if(allticketsDetalis){
        var allticketsCount      = TicketMaster.find({}).count();
        switch (role) {
          case 'screening committee':
            var assignedTicketList = TicketMaster.find({ticketElement: { $elemMatch: { allocatedToUserid: _id }}}).fetch();
            if(assignedTicketList){
              var assignedTicketCount = assignedTicketList.length;
              var approvedTicketCount = 0;
              var rejectTicketCount = 0 ;
              var openTicketCount = assignedTicketCount;
              
              for(i = 0 ; i < assignedTicketList.length; i++){
                var ticketElements = assignedTicketList[i].ticketElement;
                if(ticketElements.find(function (obj) { return obj.roleStatus == 'ScreenApproved'})){
                  approvedTicketCount++;
                }else if(ticketElements.find(function (obj) { return obj.roleStatus == 'ScreenRejected'})){
                  rejectTicketCount++;
                }
                if(ticketElements.find(function (obj) { return obj.roleStatus == 'ReviewPass'})){
                  openTicketCount--;
                }
              }
            }
            break;
          case 'team leader':
            var assignedTicketList = TicketMaster.find({ticketElement: { $elemMatch: { allocatedToUserid: _id }}}).fetch();
            if(assignedTicketList){
              var assignedTicketCount = assignedTicketList.length;
              var approvedTicketCount = 0;
              var rejectTicketCount = 0 ;
              var openTicketCount = assignedTicketCount;
              
              for(i = 0 ; i < assignedTicketList.length; i++){
                var ticketElements = assignedTicketList[i].ticketElement;
                if(ticketElements.find(function (obj) { return obj.roleStatus == 'AssignAccept'})){
                  approvedTicketCount++;
                }else if(ticketElements.find(function (obj) { return obj.roleStatus == 'AssignReject'})){
                  rejectTicketCount++;
                }
                if(ticketElements.find(function (obj) { return obj.roleStatus == 'ReviewPass'})){
                  openTicketCount--;
                }
              }
            }
            break;
          case 'team member':
            var assignedTicketList = TicketMaster.find({ticketElement: { $elemMatch: { allocatedToUserid: _id }}}).fetch();
            if(assignedTicketList){
              var assignedTicketCount = assignedTicketList.length;
              var approvedTicketCount = 0;
              var rejectTicketCount = 0 ;
              var openTicketCount = assignedTicketCount;
              
              for(i = 0 ; i < assignedTicketList.length; i++){
                var ticketElements = assignedTicketList[i].ticketElement;
                if(ticketElements.find(function (obj) { return obj.roleStatus == 'AssignAccept'})){
                  approvedTicketCount++;
                }else if(ticketElements.find(function (obj) { return obj.roleStatus == 'AssignReject'})){
                  rejectTicketCount++;
                }
                if(ticketElements.find(function (obj) { return obj.roleStatus == 'ReviewPass'})){
                  openTicketCount--;
                }
              }
            }
            break;
          case 'quality team member':
            var assignedTicketList = TicketMaster.find({ticketElement: { $elemMatch: { allocatedToUserid: _id }}}).fetch();
            if(assignedTicketList){
              var assignedTicketCount = assignedTicketList.length;
              var approvedTicketCount = 0;
              var rejectTicketCount = 0 ;
              var openTicketCount = assignedTicketCount;
              
              for(i = 0 ; i < assignedTicketList.length; i++){
                var ticketElements = assignedTicketList[i].ticketElement;
                if(ticketElements.find(function (obj) { return obj.roleStatus == 'QAPass'})){
                  approvedTicketCount++;
                }else if(ticketElements.find(function (obj) { return obj.roleStatus == 'QAFail'})){
                  rejectTicketCount++;
                }
                if(ticketElements.find(function (obj) { return obj.roleStatus == 'ReviewPass'})){
                  openTicketCount--;
                }
              }
            }
            break;
          case 'quality team leader':
            var assignedTicketList = TicketMaster.find({ticketElement: { $elemMatch: { allocatedToUserid: _id }}}).fetch();
            if(assignedTicketList){
              var assignedTicketCount = assignedTicketList.length;
              var approvedTicketCount = 0;
              var rejectTicketCount = 0 ;
              var openTicketCount = assignedTicketCount;
              
              for(i = 0 ; i < assignedTicketList.length; i++){
                var ticketElements = assignedTicketList[i].ticketElement;
                if(ticketElements.find(function (obj) { return obj.roleStatus == 'ReviewPass'})){
                  approvedTicketCount++;
                }else if(ticketElements.find(function (obj) { return obj.roleStatus == 'ReviewFail'})){
                  rejectTicketCount++;
                }
                if(ticketElements.find(function (obj) { return obj.roleStatus == 'ReviewPass'})){
                  openTicketCount--;
                }
              }
            }
            break;
          default:
            break;
        }
      }
    }

    return {
        loading,
        loading1,
        allticketsCount,
        assignedTicketCount,
        openTicketCount,
        approvedTicketCount,
        rejectTicketCount,
        // esclationTicketCount,
        user,
        role,
    };
})(HeaderBlock);
export default HeaderBlockContainer;
