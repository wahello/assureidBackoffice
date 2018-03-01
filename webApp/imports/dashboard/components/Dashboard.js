import React,{Component} from 'react';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { render } from 'react-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Content from './content/Content';


export default class Dashboard extends TrackerReact(Component){
  componentDidMount(){
    if (!$("#adminLte").length>0 && !$('body').hasClass('adminLte')) {
      // console.log("adminLte.js appended!");
      var adminLte = document.createElement("script");
      adminLte.type = "text/javascript";
      adminLte.src = "/js/adminLte.js";
      adminLte.setAttribute('id','adminLte');
      $("body").append(adminLte);
    }
  }
  componentWillMount() {
    if(!$("link[href='/css/dashboard.css']").length > 0){
      var dashboardCss = document.createElement("link");
      dashboardCss.type="text/css";
      dashboardCss.rel ="stylesheet";
      dashboardCss.href="/css/dashboard.css";
      document.head.append(dashboardCss);
    }
  }

  componentWillUnmount() {
    $("link[href='/css/dashboard.css']").remove();
    $("script[src='/js/adminLte.js']").remove();
  }
  render(){
    return(
      <div className="hold-transition skin-blue sidebar-mini">
        <div className="wrapper">
          <Header />
          <Sidebar />
          <Content />
          <Footer />
        </div>
      </div>
    );
  }
}
