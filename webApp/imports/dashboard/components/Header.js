import React,{Component} from 'react';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { render } from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { CompanySettings } from '/imports/dashboard/companySetting/api/CompanySettingMaster.js';
// import { console } from 'meteor/tools';


class Header extends TrackerReact(Component){
  constructor() { 
   super();
    this.state = {
      subscription :{
        "userData" : Meteor.subscribe("userData",Meteor.userId()), 
      }
    }
  }
 componentDidMount(){
   if (!$("#adminLte").length>0 && !$('body').hasClass('adminLte')) {
     var adminLte = document.createElement("script");  
     adminLte.type="text/javascript";  
     adminLte.src = "/js/adminLte.js";  
     $("body").append(adminLte);  
    }
 }
 componentWillMount() {
    if (!!!$("link[href='/css/dashboard.css']").length > 0) {
      var dashboardCss = document.createElement("link");
      dashboardCss.type = "text/css"; 
      dashboardCss.rel = "stylesheet";
      dashboardCss.href = "/css/dashboard.css"; 
      document.head.append(dashboardCss);
    }
  }
  componentWillUnmount(){  
   $("script[src='/js/adminLte.js']").remove(); 
   $("link[href='/css/dashboard.css']").remove(); 
  }
  handleClick(e) {
      e.preventDefault();
      Meteor.logout();
      var path = "/";
      browserHistory.replace(path);
  } 
 // currentUser(){
 //    // Meteor.subscribe('userData',Meteor.userId());
 //    var userData = {"userName" : '', "userProfile" : ''};
 //    // var userData = '';
 //    var id = Meteor.userId();
 //    var getUser = Meteor.users.findOne({"_id" : id});

 //    if (getUser) {

 //      if (getUser.roles[0] == "admin") {
 //        // var userName    = getUser.username;
 //        if (getUser.profile.firstname == '' && getUser.profile.lastname == '') {
 //          var userName = "Admin";
 //        }else if (getUser.profile.firstname != '' && getUser.profile.lastname == '') {
 //          var userName = getUser.profile.firstname;
 //        }else if (getUser.profile.firstname == '' && getUser.profile.lastname != '') {
 //          var userName = getUser.profile.lastname;
 //        }else{
 //           var userName = getUser.profile.firstname+' '+getUser.profile.lastname;
 //        }

 //        if (getUser.profile.userProfile == '') {
 //           var userProfile  = "../images/userIcon.png";
 //        }else{
 //          var userProfile  = getUser.profile.userProfile;
 //        }
 //        // userData = {"userName" : userName, "userProfile" : userProfile};
 //      }

 //      else{
 //        if (getUser.profile.firstname == '' && getUser.profile.lastname == '') {
 //          var userName = "User";
 //        }else if (getUser.profile.firstname != '' && getUser.profile.lastname == '') {
 //          var userName = getUser.profile.firstname;
 //        }else if (getUser.profile.firstname == '' && getUser.profile.lastname != '') {
 //          var userName = getUser.profile.lastname;
 //        }else{
 //           var userName = getUser.profile.firstname+' '+getUser.profile.lastname;
 //        }
 //        if (getUser.profile.userProfile == '') {
 //           var userProfile  = "../images/userIcon.png";
 //        }else{
 //          var userProfile  = getUser.profile.userProfile;
 //        }
 //        // userData = {"userName" : userName, "userProfile" : userProfile};
 //      }
 //      // console.log("userData",userData);
 //      userData = {"userName" : userName, "userProfile" : userProfile};
     
 //      }

 //       return userData;

 //    }

  render(){
    return(
    <div>
      <header className="main-header">
          {/* Logo */}
          <Link to="javascript:void(0)" className="logo">
            {/* mini logo for sidebar mini 50x50 pixels */}
            <span className="logo-mini"><b>A</b>LT</span>
            {/* logo for regular state and mobile devices */}
            <Link to="/admin/Dashboard">
              <span className="logo-lg">
                  <b>Assure</b>ID
              </span>
            </Link>

          </Link>
          {/* Header Navbar: style can be found in header.less */}
          <nav className="navbar navbar-static-top">
            {/* Sidebar toggle button*/}
            <Link to="javascript:void(0)" className="sidebar-toggle" data-toggle="push-menu" role="button">
              <span className="sr-only">
                Toggle navigation
              </span>
            </Link>
            {/* Navbar Right Menu */}
            <div className="navbar-custom-menu">
              <ul className="nav navbar-nav">
              {Roles.userIsInRole(Meteor.userId(),['screening committee','team leader','quality team member','quality team leader'])?
        
                <li className="allocatedtitle">
                  <span className ="allocatedtitlevalue">Current Allocated Ticket </span><br/>
                  <label className="col-lg-12 allocatedtitlevalue">{this.props.count ? this.props.count +'/'+this.props.MaxallocatedTickets : this.props.count/this.props.MaxallocatedTickets}</label>
                </li>
                :
                ""
              }

                {/* Notifications: style can be found in dropdown.less */}
                <li className="dropdown notifications-menu">
                  <Link to="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown">
                    <i className="fa fa-bell-o" />
                    <span className="label label-warning">0</span>
                  </Link>
                  <ul className="dropdown-menu">
                    <li className="header">You have 10 notifications</li>
                    <li>
                      {/* inner menu: contains the actual data */}
                      <ul className="menu">
                        <li>
                          <Link to="javascript:void(0)">
                            <i className="fa fa-users text-aqua" /> 5 new members joined today
                          </Link>
                        </li>
                        <li>
                          <Link to="javascript:void(0)">
                            <i className="fa fa-warning text-yellow" /> Very long description here that may not fit into the
                            page and may cause design problems
                          </Link>
                        </li>
                        <li>
                          <Link to="javascript:void(0)">
                            <i className="fa fa-users text-red" /> 5 new members joined
                          </Link>
                        </li>
                        <li>
                          <Link to="javascript:void(0)">
                            <i className="fa fa-shopping-cart text-green" /> 25 sales made
                          </Link>
                        </li>
                        <li>
                          <Link to="javascript:void(0)">
                            <i className="fa fa-user text-red" /> You changed your username
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="footer">
                      <Link to="javascript:void(0)">View all</Link>
                    </li>
                  </ul>
                </li>
                {/* Tasks: style can be found in dropdown.less */}
                
                {/* User Account: style can be found in dropdown.less */}
                <li className="dropdown user user-menu">
                  <Link to="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown">
                    {/* <img src={this.currentUser().userProfile} className="user-image" alt="User Image" />
                    <span className="hidden-xs"> {this.currentUser().userName} </span> */}
                   {!this.props.loading ? 
                    <span className="hidden-xs">  {this.props.user.profile.firstname} {this.props.user.profile.lastname} </span>
                   :
                   ""
                  } 
                 </Link>
                  <ul className="dropdown-menu">
                    {/* User image */}
                    {/* <li className="user-header">
                      <img src={this.currentUser().userProfile} className="img-circle" alt="User Image" />
                      <p>
                        {this.currentUser().userName}
                      </p>
                    </li> */}
                    {/* Menu Body */}
                    
                    {/* Menu Footer*/}
                    <li className="user-footer">
                      {/* <div className="pull-left">
                        <Link to={`/admin/editProfile/${Meteor.userId()}`} className="btn btn-default btn-flat">Profile</Link>
                      </div> */}
                      <div className="">
                        <Link to="javascript:void(0)" className="btn btn-default btn-flat" onClick={this.handleClick.bind(this)}>
                          Logout
                        </Link>
                      </div>
                    </li>
                  </ul>
                </li>
                {/* Control Sidebar Toggle Button */}
                {Roles.userIsInRole(Meteor.userId(),['screening committee','team leader','team member','field expert','quality team member','quality team leader'])?
                  <li>
                    <Link to="/backofficeadmin/company-info" data-toggle="control-sidebar">
                      <i className="fa fa-gears" />
                    </Link>
                  </li>
                :
                  <li>
                    <Link to="/admin/company-info" data-toggle="control-sidebar">
                      <i className="fa fa-gears" />
                    </Link>
                  </li>
                }
              </ul>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}
headerContainer = withTracker(props => { 
    var _id  = Meteor.userId();

    const userHandle  = Meteor.subscribe('userData',_id);
    const companyData = Meteor.subscribe('companyData');
    const user        = Meteor.users.findOne({"_id" : _id}) || {};
    const loading     = !userHandle.ready();
    if(Meteor.user().count){
      var count = Meteor.user().count;
    }else{
      var count = 0;
    }
   
    var loginrole = Meteor.user().roles;
   
     var companyDetails =  CompanySettings.findOne({'companyId':1});
     if(companyDetails){
      console.log(companyDetails);
      var maxallocatedArr  = companyDetails.maxnoOfTicketAllocate;
      var singleObj  =  maxallocatedArr.find(o=>o.role === "screening committee");
     console.log(singleObj);
     var MaxallocatedTickets = singleObj.maxTicketAllocate;
     }else{
      var MaxallocatedTickets = "";
     }
   
    //  for(i=0;i<companyDetails.maxnoOfTicketAllocate.length;i++){
    //     if(companyDetails.maxnoOfTicketAllocate[i].role ==){

    //     }
    //  }


    console.log("loginrole :");
    console.log(loginrole);
    return {
        loading  : loading,
        user     : user,
        MaxallocatedTickets : MaxallocatedTickets,
        count    : count
    };
})(Header);
export default headerContainer;
