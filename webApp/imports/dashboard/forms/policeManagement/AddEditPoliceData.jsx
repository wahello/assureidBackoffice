import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { PoliceStation } from '../api/PoliceStation.js';
import { withTracker } from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';
import ListOfPoliceStation from './ListOfPoliceData.jsx';


class AddEditPoliceData extends TrackerReact(Component) {
   constructor(props) {
    super(props);  
    this.state = {
      policeStationName         : '',
      policeStationAddressLine1 : '',
      policeStationAddressLine2 : '',
      policeStationAddressLine3 : '',
      country                   : '',
      state                     : '',
      city                      : '',
      area                      : '',
      pinCode                   : '',
      // button : 'ADD',
      "subscription"  : {
        "policeStation" : Meteor.subscribe("policeStation"),
      }  
    }; 
     this.handleChange = this.handleChange.bind(this);
  }
   componentWillReceiveProps(nextProps) {
    if(!nextProps.loading){
      if(nextProps.policeStation){
         this.setState({
             policeStationName         : nextProps.policeStation.policeStationName,
             policeStationAddressLine1 : nextProps.policeStation.policeStationAddressLine1,
             policeStationAddressLine2 : nextProps.policeStation.policeStationAddressLine2,
             policeStationAddressLine3 : nextProps.policeStation.policeStationAddressLine3,
             country                   : nextProps.policeStation.country,
             state                     : nextProps.policeStation.state,
             city                      : nextProps.policeStation.city,
             area                      : nextProps.policeStation.area,
             pinCode                   : nextProps.policeStation.pinCode, 
             id                        : nextProps.policeStation._id,
             button                    : nextProps.button,
         });
      }
    }else{
      this.setState({
             policeStationName          : '',
             policeStationAddressLine1  : '',
             policeStationAddressLine2  : '',
             policeStationAddressLine3  : '',
             country                    : '',
             state                      : '',
             city                       : '',
             area                       : '',
             pinCode                    : '', 
             id                         : '',
             button                     : ''
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
    $("#policeValid").validate({
        rules: {
          policeStationName: {
            required: true,
          },
          policeStationAddressLine1: {
            required: true,
          },
          country: {
            required: true,
          },
          state: {
            required: true,
          },
          city: {
            required: true,
          },
          area: {
            required: true,
          },
          pinCode: {
            required: true,
          },

        },
        messages: {
          policeStationName: {
            required: "Please enter policeStationName!",
          },
          policeStationAddressLine1: {
            required: "Please enter policeStationAddressLine!",
          },
          country: {
            required: "Please enter country!",
          },
          state: {
            required: "Please enter state!",
          },
          city: {
            required: "Please enter city!",
          },
          area: {
            required: "Please enter area!",
          },
          pinCode: {
            required: "Please enter pinCode!",
          },
          
        }
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
   }
  handleChange(event){
     const target = event.target;
     const name   = target.name;
     this.setState({
      [name]: event.target.value,
     });
  }
  uppercase(str){
    var array1 = str.split(' ');
    var newarray1 = [];
      
    for(var x = 0; x < array1.length; x++){
        newarray1.push(array1[x].charAt(0).toUpperCase()+array1[x].slice(1));
    }
    return newarray1.join(' ');
  } 
  handleSubmit(event){
    event.preventDefault();
    if($("#policeValid").valid()){
      var policeStationName            = this.uppercase(this.refs.policeStationName.value);
      var policeStationAddressLine1    = this.refs.policeStationAddressLine1.value;
      var policeStationAddressLine2    = this.refs.policeStationAddressLine2.value;
      var policeStationAddressLine3    = this.refs.policeStationAddressLine3.value;
      var country                      = this.refs.country.value;
      var state                        = this.refs.state.value;
      var city                         = this.refs.city.value;
      var area                         = this.refs.area.value;
      var pinCode                      = this.refs.pinCode.value;
      var id = this.props.params.id;
      if(id){
        Meteor.call('updatePoliceStation',id,policeStationName,policeStationAddressLine1,policeStationAddressLine2,policeStationAddressLine3,country,state,city,area,pinCode,(error,result)=>{
          if(error){
              console.log(error.reason);
          }else{                      
            swal("Done","Palice Station Data has been Updated!.","success"); 
            var path = "/admin/PoliceStation";
            browserHistory.replace(path);
          }            
        });
      }else{
        Meteor.call('createPoliceStation',policeStationName,policeStationAddressLine1,policeStationAddressLine2,policeStationAddressLine3,country,state,city,area,pinCode,(error,result)=>{
          if(error){
              console.log(error.reason);
          }else{                      
            swal("Done","Palice Station Data has been Inserted!.","success");  
            $(".policeStationName").val("");
            $(".policeStationAddressLine1").val("");
            $(".policeStationAddressLine2").val("");
            $(".policeStationAddressLine3").val("");
            $(".country").val("");
            $(".state").val("");
            $(".city").val("");
            $(".area").val("");
            $(".pinCode").val("");
          }            
        });   
      }
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
          <li className="active">Manage Police Stations</li>
        </ol>
      </section>
      <section className="content">
         <div className="row">
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
             <div className="box box-primary">
                <div className="box-header with-border">
                 <h2 className="box-title">Manage Police Stations</h2>  
                </div>
                <div className="box-body">                      
                  <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
                    <form id="policeValid">
                       <div className="row inputrow">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="form-group">
                             <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Police station name</label>
                               <input type="text" ref="policeStationName" id="policeStationName" name="policeStationName" onChange={this.handleChange} value={this.state.policeStationName} className="templateName policeStationName col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid" />
                            </div>
                           </div>
                       </div>
                       <div className="row inputrow">
                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="form-group">
                             <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Address Line 1</label>
                               <input type="text" ref="policeStationAddressLine1" id="policeStationAddressLine1" name="policeStationAddressLine1" onChange={this.handleChange} value={this.state.policeStationAddressLine1} className="templateName policeStationAddressLine1 col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid"/>
                            </div>
                         </div>
                       </div>
                        <div className="row inputrow">
                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="form-group">
                             <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Address Line 2</label>
                               <input type="text" ref="policeStationAddressLine2" id="policeStationAddressLine2" name="policeStationAddressLine2" onChange={this.handleChange} value={this.state.policeStationAddressLine2} className="templateName policeStationAddressLine2 col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid"/>
                            </div>
                         </div>
                       </div>
                       <div className="row inputrow">
                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="form-group">
                             <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Address Line 3</label>
                               <input type="text" ref="policeStationAddressLine3" id="policeStationAddressLine3" name="policeStationAddressLine3" onChange={this.handleChange} value={this.state.policeStationAddressLine3} className="templateName policeStationAddressLine3 col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid"/>
                            </div>
                         </div>
                       </div>
                        <div className="row inputrow">
                         <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group">
                             <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Country</label>
                               <input type="text" ref="country" id="country" name="country" onChange={this.handleChange} value={this.state.country} className="templateName country col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid"/>
                            </div>
                         </div>
                         <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group">
                             <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">State</label>
                               <input type="text" ref="state" id="state" name="state" onChange={this.handleChange} value={this.state.state} className="templateName state col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid"/>
                            </div>
                         </div>
                       </div> 
                       <div className="row inputrow">
                         <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group">
                             <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">City</label>
                               <input type="text" ref="city" id="city" name="city" onChange={this.handleChange} value={this.state.city} className="templateName city col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid"/>
                            </div>
                         </div>
                         <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group">
                             <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Area</label>
                               <input type="text" ref="area" id="area" name="area" onChange={this.handleChange} value={this.state.area} className="templateName area col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid"/>
                            </div>
                         </div>
                       </div> 
                       <div className="row inputrow">
                         <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group">
                             <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Pin Code</label>
                               <input type="text" ref="pinCode" id="pinCode" name="pinCode" onChange={this.handleChange} value={this.state.pinCode} className="templateName pinCode col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid"/>
                            </div>
                         </div>
                       </div>
                       <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12">
                          <button className="col-lg-3 col-md-4 col-xs-12 col-sm-12 col-xs-12 btn btn-primary pull-right" onClick={this.handleSubmit.bind(this)} type="submit" value="" >{this.state.button}</button>
                       </div> 
                    </form>
                  </div>
                  <ListOfPoliceStation />
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
    const postHandle = Meteor.subscribe('singlePoliceStation',_id);
    // var editServices   = this.props.params.id;
    // console.log("Param" +editServices);
    const policeStation  = PoliceStation.findOne({"_id":_id})|| {};
    const loading        = !postHandle.ready();
    
    if(_id){
      var button = "UPDATE";
      return {
          loading,
          policeStation,
          button,
      };
    }else{
       var button = "ADD";
      return {
          loading,
          policeStation,
          button,
      };
    }
})(AddEditPoliceData);
export default EditPageContainer;
