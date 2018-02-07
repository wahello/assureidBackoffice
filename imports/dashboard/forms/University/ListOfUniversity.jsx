import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { University } from '../api/University.js';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';

export default class ListOfUniversity extends TrackerReact(Component) {
	constructor(props) {
    super(props); 
    this.state = {
    	university : [],
      "subscription"  : {
        "university" : Meteor.subscribe("university"),
      }   
    }; 
  }
	componentDidMount() {
   $("html,body").scrollTop(0);
     if (!$("#adminLte").length>0 && !$('body').hasClass('adminLte')) {
     var adminLte = document.createElement("script");  
     adminLte.type="text/javascript";  
     adminLte.src = "/js/adminLte.js";  
     $("body").append(adminLte);  
    }
    this.universityTracker = Tracker.autorun( ()=> {
      Meteor.subscribe("university");
      const university = University.find().fetch();
      this.setState({university: university});
    });
    
	 }
  componentWillMount() {
    // if (!!!$("link[href='/css/dashboard.css']").length > 0) {
    //   var dashboardCss = document.createElement("link");
    //   dashboardCss.type = "text/css"; 
    //   dashboardCss.rel = "stylesheet";
    //   dashboardCss.href = "/css/dashboard.css"; 
    //   document.head.append(dashboardCss);
    // }
  }
  componentWillUnmount(){
     $("script[src='/js/adminLte.js']").remove(); 
     // $("link[href='/css/dashboard.css']").remove(); 
     if (this.universityTracker) {
      this.universityTracker.stop();
      }
  }
  renderTableRow(){
    return this.state.university.map((university,index) =>{

      return <tr key={index}>
              <td> {university.UniversityName} </td>
              <td> {university.UniversityStatus} </td>
              <td>
                <Link to={'/admin/University/'+university._id} className="editButton" title="Edit">
                  <i className = "fa fa-pencil"> </i>
                </Link>
                <a href="#" id={university._id} onClick={this.delete.bind(this)} className="deleteButton" title="Delete">
                  <i className="fa fa-trash-o"></i>  
                </a>
              </td>
            </tr>;
      });
    }
    delete(e){
     e.preventDefault();
	    let id = $(e.currentTarget).attr("id");
	    swal({
	      title: "Are you sure?",
	      text: "You want to delete this page!",
	      type: "warning",
	      showCancelButton: true,
	      confirmButtonColor: "#DD6B55",
	      confirmButtonText: "Yes, delete it!",
	      closeOnConfirm: false,
	      html: false
	    }, function(){
	      Meteor.call("deleteUniversity",id,function(error,result){
	          if(error){
	              console.log(error.reason);
	          }else{
	              swal("Done","Your news has been deleted!.", "success");
	          }
	      });

	    });
	  }

  render() {
       return (
        
                <div className="box-body ">  
                  <div className="dataTable tableBasicPage col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h4 className="">List Of university</h4>  
                    <table className="display table table-bordered servicesTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>University Name</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                       
                        <tbody>
                            {this.renderTableRow()}
                        </tbody>
                    </table>
                  </div>
                </div>
                 
        );
  } 

}
