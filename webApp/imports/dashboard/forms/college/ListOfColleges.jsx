import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { College } from '../api/College.js';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';

export default class ListOfColleges extends TrackerReact(Component) {
  constructor(props) {
    super(props); 
    this.state = {
      college : [],
      "subscription"  : {
        "college" : Meteor.subscribe("college"),
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
    this.collegeTracker = Tracker.autorun( ()=> {
      Meteor.subscribe("college");
      const college = College.find({},{sort :{createdAt : -1}}).fetch();
      this.setState({college: college});
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
     if (this.collegeTracker) {
      this.collegeTracker.stop();
      }
  }
  renderTableRow(){
    return this.state.college.map((college,index) =>{

      return <tr key={index}>
              <td> {college.collegeName} </td>
              <td> {college.universityName} </td>
              <td> {college.collegeStatus} </td>
              <td>
                <Link to={'/admin/College/'+college._id} className="editButton" title="Edit">
                  <i className = "fa fa-pencil"> </i>
                </Link>
                <a href="#" id={college._id} onClick={this.delete.bind(this)} className="deleteButton" title="Delete">
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
        text: "You want to delete this college data!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false,
        html: false
      }, function(){
        Meteor.call("deleteCollege",id,function(error,result){
            if(error){
                console.log(error.reason);
            }else{
                swal("Done","College Data has been deleted!.", "success");
            }
        });

      });
    }

  render() {
       return (
        
                <div className="box-body ">  
                  <div className="dataTable tableBasicPage col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h4 className="">List Of Colleges</h4>  
                    <table className="display table table-bordered servicesTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th className="text-center">College Name</th>
                                <th className="text-center">University Name</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Actions</th>
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
