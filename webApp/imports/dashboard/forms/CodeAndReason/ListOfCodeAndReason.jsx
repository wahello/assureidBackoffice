import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { CodeAndReason } from '../api/CodeAndReason.js';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';

class ListOfCodeAndReason extends TrackerReact(Component) {
  constructor(props) {
    super(props); 
    this.state = {
         
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
     
  }
  renderTableRow(){
    return this.props.codeAndReason.map((codeAndReasonDetails,index) =>{

      return <tr key={index}>
              <td> {codeAndReasonDetails.code} </td>
              <td> {codeAndReasonDetails.reason} </td>
              <td>
                <Link to={'/admin/CodeAndReason/'+codeAndReasonDetails._id} className="editButton" title="Edit">
                  <i className = "fa fa-pencil"> </i>
                </Link>
                <a href="#" id={codeAndReasonDetails._id} onClick={this.delete.bind(this)} className="deleteButton" title="Delete">
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
        text: "You want to delete this field!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false,
        html: false
      }, function(){
        Meteor.call("deleteField",id,function(error,result){
            if(error){
                console.log(error.reason);
            }else{
                swal("Done","Field has been deleted!.", "success");
            }
        });

      });
    }

  render() {
       return (
        
                <div className="box-body ">  
                  <div className="dataTable tableBasicPage col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h4 className="">List Of Code and Reason</h4>  
                    <table className="display table table-bordered servicesTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th className="text-center">Code</th>
                                <th className="text-center">Reason</th>
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
ListOfCodeAndReasonContainer = withTracker(({props}) => {
    const postHandle = Meteor.subscribe('codeAndReason');
    // var editServices   = this.props.params.id;
    // console.log("Param" +editServices);
    const codeAndReason  = CodeAndReason.find({}).fetch() || [];
    const loading    = !postHandle.ready();
    
      return {
          loading,
          codeAndReason
      };
})(ListOfCodeAndReason);

export default ListOfCodeAndReasonContainer;
