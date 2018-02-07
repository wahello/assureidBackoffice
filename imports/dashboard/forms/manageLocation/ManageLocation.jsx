import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Location } from '../api/ManageLocation.js';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import ListOfLocations from './ListOfLocations.jsx';

class ManageLocation extends TrackerReact(Component) {
  constructor(props) {
    super(props);  
    this.state = {
      country  : '',
      state    : '',
      city     : '',
      area     : '',
      pinCode  : '',
      button   : '',
      "subscription"  : {
        "singleLocation" : Meteor.subscribe("singleLocation"),
      }
    }; 
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(!nextProps.loading){
      if(nextProps.location){
         this.setState({
             country  : nextProps.location.country,
             state    : nextProps.location.state,
             city     : nextProps.location.city,
             area     : nextProps.location.area,
             pinCode  : nextProps.location.pinCode,
             id       : nextProps.location._id,
             button   : nextProps.button,
         });
      }
    }else{
      this.setState({
             country  : '',
             state    : '',
             city     : '',
             area     : '',
             pinCode  : '',
             id       : '',
             button   : '',
      });
    }

    this.handleChange = this.handleChange.bind(this);
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
 handleChange(event){
     const target = event.target;
     const name   = target.name;
     this.setState({
      [name]: event.target.value,
     });
  }
  handleSubmit(event){
    event.preventDefault();
    var country   = this.refs.country.value.charAt(0).toUpperCase() + this.refs.country.value.slice(1);
    var state     = this.refs.state.value.charAt(0).toUpperCase() + this.refs.state.value.slice(1);
    var city      = this.refs.city.value.charAt(0).toUpperCase() + this.refs.city.value.slice(1);
    var area      = this.refs.area.value.charAt(0).toUpperCase() + this.refs.area.value.slice(1);
    var pinCode   = this.refs.pinCode.value;
    var id        = this.props.params.id;
    if(id){
       Meteor.call('updateLocation',id,country,state,city,area,pinCode,(error,result)=>{
        if(error){
            console.log(error.reason);
        }else{                      
          swal("Done","Location has been Updated!.","success");  
          var path = "/admin/ManageLocation";
          browserHistory.replace(path);
        }            
      });

    }else{
      Meteor.call('addLocation',country,state,city,area,pinCode,(error,result)=>{
        if(error){
            console.log(error.reason);
        }else{                      
          swal("Done","Location has been Inserted!.","success");  
          $(".country").val("");
          $(".state").val("");
          $(".city").val("");
          $(".area").val("");
          $(".pinCode").val("");

        }            
      });
    }
  }
	render() {
   return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1> Master Data </h1>
        <ol className="breadcrumb">
          <li>
            <a href="#"><i className="fa fa-newspaper-o" />Master Data</a></li>
          <li className="active">Manage Location</li>
        </ol>
      </section>
      <section className="content">
         <div className="row">
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
             <div className="box box-primary">
                <div className="box-header with-border">
                 <h2 className="box-title">Manage Location</h2>  
                </div>
                <div className="box-body">                      
                  <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12"> 
                    <form id="add-book">
                       <div className="row inputrow">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group">
                             <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Country</label>
                               <input type="text" ref="country" id="country" name="country" value={this.state.country} className="templateName country col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid required" onChange={this.handleChange} />
                            </div>
                           </div>
                           <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                              <div className="form-group">
                               <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">State</label>
                                 <input type="text" ref="state" id="state" name="state" value={this.state.state} className="templateName state col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid" onChange={this.handleChange} />
                              </div>
                           </div>
                        </div>
                        <div className="row inputrow">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group">
                             <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">City</label>
                               <input type="text" ref="city" id="city" name="city" value={this.state.city} className="templateName city col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid required" onChange={this.handleChange} />
                            </div>
                           </div>
                           <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                              <div className="form-group">
                               <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Area</label>
                                 <input type="text" ref="area" id="area" name="area" value={this.state.area} className="templateName area col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid" onChange={this.handleChange} />
                              </div>
                           </div>
                        </div>
                        <div className="row inputrow">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group">
                             <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Pin Code</label>
                               <input type="text" ref="pinCode" id="pinCode" name="pinCode" value={this.state.pinCode} className="templateName pinCode col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid required" onChange={this.handleChange} />
                            </div>
                           </div>
                        </div>
                        <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12">
                          <button className="col-lg-3 col-md-4 col-xs-12 col-sm-12 col-xs-12 btn btn-primary pull-right" onClick={this.handleSubmit.bind(this)} type="submit" value="" >{this.state.button}</button>
                        </div> 
                    </form>
                  </div>
                  <ListOfLocations />
                </div>
             </div>
            </div>
         </div>
       </section>
    </div>
    );
  } 
}

EditPageContainer = withTracker(({params}) => {
    var _id          = params.id;
    const postHandle = Meteor.subscribe('singleLocation',_id);
    // var editServices   = this.props.params.id;
    // console.log("Param" +editServices);
    const location  = Location.findOne({"_id":_id})|| {};
    const loading   = !postHandle.ready();
    
    if(_id){
      var button = "UPDATE";
      return {
          loading,
          location,
          button,
      };
    }else{
       var button = "ADD";
      return {
          loading,
          location,
          button
      };
    }
})(ManageLocation);

export default EditPageContainer;
