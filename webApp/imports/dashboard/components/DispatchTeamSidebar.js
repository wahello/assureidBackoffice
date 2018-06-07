import React,{Component} from 'react';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { render } from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import {Order} from '/imports/website/ServiceProcess/api/Order.js';

class DispatchTeamSidebar extends TrackerReact(Component){
  constructor() {
   super();
    this.state = {
      subscription :{
        "userData" : Meteor.subscribe("userData",Meteor.userId()), 
      }
    }
  }
  removePersistantSessions(){
      UserSession.delete("progressbarSession", Meteor.userId());
      UserSession.delete("allProgressbarSession", Meteor.userId());
  }
  currentUser(){
    // Meteor.subscribe('userData',Meteor.userId());
    var userData = {"userName" : '', "userProfile" : ''};
    var id = Meteor.userId();
    var getUser = Meteor.users.findOne({"_id" : id});
    if (getUser) {
      if (getUser.roles[0] == "admin") {
        // var userName    = getUser.username;
        if (getUser.profile.firstname == '' && getUser.profile.lastname == '') {
          var userName = "Admin";
        }else if (getUser.profile.firstname != '' && getUser.profile.lastname == '') {
          var userName = getUser.profile.firstname;
        }else if (getUser.profile.firstname == '' && getUser.profile.lastname != '') {
          var userName = getUser.profile.lastname;
        }else{
           var userName = getUser.profile.firstname+' '+getUser.profile.lastname;
        }
        if (getUser.profile.userProfile == '') {
           var userProfile  = "/images/userIcon.png";
        }else{
          var userProfile  = getUser.profile.userProfile;
        }
        userData = {"userName" : userName, "userProfile" : userProfile};
      }else if((getUser.roles[0] != "admin") && (getUser.roles[0] != "user") ){
        if (getUser.profile.firstname == '' && getUser.profile.lastname == '') {
          var userName = "User";
        }else if (getUser.profile.firstname != '' && getUser.profile.lastname == '') {
          var userName = getUser.profile.firstname;
          var role = getUser.roles[1];
          
        }else if (getUser.profile.firstname == '' && getUser.profile.lastname != '') {
          var userName = getUser.profile.lastname;
          var role = getUser.roles[1];
          
        }else{
           var userName = getUser.profile.firstname+' '+getUser.profile.lastname;
           var role = getUser.roles[1];
        }
        if (getUser.profile.userProfile == '') {
           var userProfile  = "/images/userIcon.png";
        }else{
          var userProfile  = getUser.profile.userProfile;
          var role = getUser.roles[1];
          
        }
        userData = {"userName" : userName, "userProfile" : userProfile,"role":role};
      }
    }
    return userData;

  }
  render(){
      return(
          <aside className="main-sidebar">
            {/* sidebar: style can be found in sidebar.less */}
            <section className="sidebar">
              {/* Sidebar user panel */}
              <div className="user-panel">
              {!this.props.loading1 ?
                <div className="pull-left image">
                { this.props.user.profile.userProfile ?
                    <img src={this.props.user.profile.userProfile} className="img-circle" alt="User Image" />
                    :
                    <img src="/images/userIcon.png" className="img-circle" alt="User Image" />
                }              
                </div>
                :
                ""
              }
              {!this.props.loading1 ?
                  this.props.user.profile ? 
                  <div className="pull-left info">
                    <p> {this.props.user.profile.firstname} {this.props.user.profile.lastname}</p>
                    <Link to="javascript:void(0)"><i className="fa fa-circle text-success" />{this.props.role}</Link>
                  </div>
                  :
                  ""
                :
                ""
                }
              </div>
              <ul className="sidebar-menu otherRoleSidebarMenu" data-widget="tree">
                <li className="header">MAIN NAVIGATION</li>
                <li className="">
                  <Link to="backoffice/dispactteamdashboard" activeClassName="active">
                    <i className="fa fa-dashboard" />
                      <span>Dashboard</span> 
                  </Link>
                </li>
                <li className="">
                  <Link to="/admin/allorders" activeClassName="active">
                    <i className="fa fa-ticket" />
                      <span>All Orders({this.props.allOrderCount})</span>
                  </Link>
                </li> 
                <li className="">
                  <Link to="/admin/orderAllocatedToDispatchTeam" activeClassName="active">
                  <i className="fa fa-ticket"/>
                      <span>Orders Allocted To Me({this.props.allocateOrderCount ? this.props.allocateOrderCount : 0 })</span>
                  </Link>
                </li>
                <li className="">
                  <Link to="/admin/openOrdersForDispatchTeam" activeClassName="active">
                  <i className="fa fa-ticket" />
                      <span>My Open Orders({this.props.openOrderCount ? this.props.openOrderCount : 0})</span>
                  </Link>
                </li>
              
                <li className="">
                  <Link to="/admin/completedOrdersForDispatchTeam" activeClassName="active">
                  <i className="fa fa-ticket" />
                      <span>My Completed Orders({this.props.completedOrderCount ? this.props.completedOrderCount : 0 })</span>
                  </Link>
                </li>
                <li className="">
                  <Link to="/admin/escalatedOrdersForDispatchTeam" activeClassName="active">
                  <i className="fa fa-ticket" />
                      <span>My Escalated Orders({this.props.escalatedOrderCount ? this.props.escalatedOrderCount : 0 })</span>
                  </Link>
                </li>
              </ul>
            </section>
            {/* /.sidebar */}
          </aside>
      ); 
  }
}
export default dispatchTeamSidebarContainer = withTracker(props => {
  var handleAllOrder = Meteor.subscribe("allOrders");
  var loading = !handleAllOrder.ready();
  var allOrder = Order.find({}).fetch() || [];
  var _id  = Meteor.userId();
  const userHandle  = Meteor.subscribe('userData',_id);
  const user        = Meteor.users.findOne({"_id" : _id});
  const loading1    = !userHandle.ready();
  var allOrderCount = Order.find({}).count() || [];
  var allocateOrderCount = Order.find({"allocatedToUserid":Meteor.userId()}).count();
  var openOrderCount= Order.find({"allocatedToUserid":Meteor.userId(),"orderStatus":"Order Completed - Generating Report"},{sort:{createdAt: 1}}).count();
  var completedOrderCount= Order.find({"allocatedToUserid":Meteor.userId(),"orderStatus":"Order Completed - Report Completed"},{sort:{createdAt: 1}}).count();
  var escalatedOrderCount= 0;
  if(user){
    var roleArr = user.roles;
    if(roleArr){
      var role = roleArr.find(function (obj) { return obj != 'backofficestaff' });
    }
  }

  return {
      loading,
      loading1,
      allOrderCount,
      allocateOrderCount,
      openOrderCount,
      completedOrderCount,
      escalatedOrderCount,
      user,
      role
  };
  
})(DispatchTeamSidebar);
