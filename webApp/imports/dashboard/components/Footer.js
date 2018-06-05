import React from 'react';
import {Link} from 'react-router';

export default class Footer extends React.Component{
  componentDidMount() {
    // console.log("footer mounted");
    if (!!!$("link[href='/css/dashboard.css']").length > 0) {
      var dashboardCss = document.createElement("link");
      dashboardCss.type = "text/css";
      dashboardCss.rel = "stylesheet";
      dashboardCss.href = "/css/dashboard.css";
      document.head.append(dashboardCss);
    }
    // if (!$("#sidebar").length>0) {
    //   console.log("I am appended!");
    //   var adminLte = document.createElement("script");
    //   adminLte.type = "text/javascript";
    //   adminLte.src = "/js/sidebar.js";
    //   adminLte.setAttribute('id','sidebar');
    //   $("body").append(adminLte);
    // }
  }

  componentWillUnmount(){
    console.log('footer unmounted');

    $("link[href='/css/dashboard.css']").remove();
  }
  render(){
    return(
      <footer className="main-footer">
        <div className="pull-right hidden-xs">
        </div>
        <strong>Copyright © 2018 <a href="http://iassureit.com" target="_blank">iAssure International Technologies Pvt. Ltd.</a></strong> All rights
        reserved.
      </footer>
    );
  }
}
