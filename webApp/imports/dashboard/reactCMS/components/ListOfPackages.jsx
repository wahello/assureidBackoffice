import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Packages} from '../api/Package.js';
import { withTracker } from 'meteor/react-meteor-data';
import { createContainer } from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';

class ListOfPackages extends TrackerReact(Component) {
	constructor(props) {
    super(props); 
    this.state = {
      "subscription"  : {
      
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

	 }
  componentWillMount() {
  
  }
  componentWillUnmount(){
    $("script[src='/js/adminLte.js']").remove(); 
     // $("link[href='/css/dashboard.css']").remove();
  }
  renderTableRow(){
    return this.props.packages.map((packages,index) =>{
      return <tr key={index}>
              <td> {packages.packageName} </td>
              <td> {packages.packageDuration} Days </td> 
              <td>
                {packages.packageDiscount}
              </td>
              <td><img src={packages.image} className="img-responsive serviceLogo" /></td>
              <td>
                <Link to={'/admin/manageservicepackage/'+packages._id} className="editButton" title="Edit">
                  <i className = "fa fa-pencil"> </i>
                </Link>
             
                <a href="#" id={packages._id} onClick={this.delete.bind(this)} className="deleteButton" title="Delete">
                  <i className="fa fa-trash-o"></i>  
                </a>
              </td>
            </tr>;
      });
  }
  
  delete(e){
    e.preventDefault();
    var id = $(e.currentTarget).attr("id");
    // var getBlogPages = BlogPages.findOne({"_id": id});
    // if (getBlogPages) {
      // var getblogImage = getBlogPages.blogImage;
      swal({
        title: "Are you sure?",
        text: "You want to delete this blog!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false,
        html: false
      }, function(){
        Meteor.call("deletePackage",id,function(error,result){
            if(error){
                console.log(error.reason);
            }else{
                // Bert.alert("Successfully Deleted..!!");
                swal("Done","Your package has been deleted!.", "success");
            }
        });
      });
    // }
  }
  
  render() {
   return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1> Package Management </h1>
        <ol className="breadcrumb">
          <li>
            <a href="#"><i className="fa fa-files-o"/> Package Management</a></li>
          <li className="active">List Of Packages</li>
        </ol>
      </section>
       <section className="content">
         <div className="row">
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
             <div className="box box-primary">
                <div className="box-header with-border">
                 <h2 className="box-title">List Of Packages</h2>  
                </div>
                <div className="box-body">  
                  <div className="dataTable tableBasicPage col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <table className="display table table-bordered servicesTable" width="100%" cellSpacing="0">
                      <thead>
                          <tr>
                              <th>Package Name</th>
                              <th>Package Duration</th>
                              <th>Package Discount</th>
                              <th>Image</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                       
                      <tbody>
                        {this.renderTableRow()}
                      </tbody>
                    </table>
                  </div>
                </div>
             </div>
            </div>
         </div>
       </section>
    </div>
    );
  } 
}
ListOfPackagesContainer = withTracker(({props}) => {
    const postHandle    = Meteor.subscribe("packages");
    const packages      = Packages.find({}).fetch()||[];
    // console.log("AllServices",AllServices);
    const loading       = !postHandle.ready();
    return {
      loading,
      packages,
    };
})(ListOfPackages);
export default ListOfPackagesContainer;