import React,{Component} from 'react';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { render } from 'react-dom';

export default class OtherRoleSidebar extends TrackerReact(Component){
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
              <div className="pull-left image">
                <img src={this.currentUser().userProfile} className="img-circle" alt="User Image" />
              </div>
              <div className="pull-left info">
                {/* <p> {this.currentUser().userName}</p> */}
                <Link to="javascript:void(0)"><i className="fa fa-circle text-success" /> {this.currentUser().role}</Link>
              </div>
            </div>
            <ul className="sidebar-menu" data-widget="tree">
              <li className="header">MAIN NAVIGATION</li>
              <li className="">
                <Link to="/admin/alltickets" activeClassName="active">
                  <i className="fa fa-ticket" />
                    <span>All Tickets(60)</span>
                </Link>
              </li>
              <li className="">
                <Link to="/admin/assignedtickets" activeClassName="active">
                <i className="fa fa-ticket" />
                    <span>Ticket Assigned To Me(30)</span>
                </Link>
              </li>
              <li className="">
                <Link to="/admin/opentickets" activeClassName="active">
                <i className="fa fa-ticket" />
                    <span>My Open Tickets(30)</span>
                </Link>
              </li>
            
              <li className="">
                <Link to="/admin/approvedtickets" activeClassName="active">
                <i className="fa fa-ticket" />
                    <span>My Approved Tickets(20)</span>
                </Link>
              </li>
              <li className="">
                <Link to="/admin/rejectedtickets" activeClassName="active">
                <i className="fa fa-ticket" />
                    <span>My Rejected Tickets(10)</span>
                </Link>
              </li>
              <li className="">
                <Link to="/admin/escalatedtickets" activeClassName="active">
                <i className="fa fa-ticket" />
                    <span>My Escalated Tickets(30)</span>
                </Link>
              </li>
            </ul>
          </section>
          {/* /.sidebar */}
        </aside>
    );
  }
}
