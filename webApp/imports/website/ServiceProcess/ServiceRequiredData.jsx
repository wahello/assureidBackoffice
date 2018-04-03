import React,{Component} from 'react';
import {render} from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import {Services} from '../../dashboard/reactCMS/api/Services.js';
import { CompanySettings } from '../../dashboard/companySetting/api/CompanySettingMaster.js';

export default class ServiceRequiredData extends TrackerReact(Component){
  constructor(){
    super();
     this.state ={
        serviceName         : '',
        serviceRate         : '',
        serviceDuration     : '',
        servicesDescription : '',
        id                  : '',
        "subscription" : {
          "services" : Meteor.subscribe("services"),
          "userfunction"   : Meteor.subscribe("userfunction"),
          "companyData"    : Meteor.subscribe("companyData"),
        }
      }
  }
  componentWillMount(){
  }
  componentWillUnmount(){
  }
  componentDidMount(){  
    $('html, body').scrollTop(0);
  }
  backClick(event){
    event.preventDefault();
    var path = "/profile";
    browserHistory.replace(path);
  } 
  purchaseClick(event){
    event.preventDefault();
    // var path = "/ServiceInvoice";
    // browserHistory.replace(path);
    var tax  = [];
    var id               = this.props.params.id;
    var services         = Services.findOne({"_id": id});
    var serviceId        = services._id;
    var serviceName      = services.serviceName;
    var serviceRate      = services.serviceRate;
    var serviceDuration  = services.serviceDuration;
    var getUser          = Meteor.user();
    var userId           = getUser._id;
    var userName         = getUser.profile.firstname+' '+getUser.profile.lastname;
    var companyData      = CompanySettings.findOne({"companyId": 1});
    if (companyData) {
      var companyName         = companyData.companyName;
      var companyAddressFeild = companyData.companyLocationsInfo[0];
      var companyAddress      = companyAddressFeild.companyAddress;
      var companyCity         = companyAddressFeild.companyCity;
      var companyCountry      = companyAddressFeild.companyCountry;
      var companyPincode      = companyAddressFeild.companyPincode;
      var companyState        = companyAddressFeild.companyState;
      var newDate             = new Date();
      var currentDate         = moment(newDate).format("YYYY-MM-DD");
      if (companyData.taxSettings) {
         for (var i = 0; i < companyData.taxSettings.length; i++) {
          if (currentDate == companyData.taxSettings[i].effectiveFrom) {
             tax.push( companyData.taxSettings[i]);
          }
        }
      }
  
      Meteor.call("insertInvoice",companyName,serviceId,serviceName,serviceRate,serviceDuration,userId,userName,companyAddress,companyCity,companyState,companyCountry,companyPincode,tax,function(error,result){
       if (error) {
        console.log("error",error.reason);
       }else{
        swal("Done","Invoice Genrated!");  
        var path = "/ServiceInvoice/"+result;
        browserHistory.replace(path);
       }
      });
    }
    
  }

   
  render(){
    return(
      <div className="outerServiceBlock col-lg-12 col-md-12 col-sm-12 col-xs-1">
        <div className="servieInnerBlock col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
            <h1 className="text-center">Reuired Information</h1>
            <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>
             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerButtonDiv">
              <button className="col-lg-3 col-md-4 col-xs-12 col-sm-12 col-xs-12 btn ServiceProcessButtons pull-left" onClick={this.backClick.bind(this)} value="" >Cancel</button>
              <button className="col-lg-3 col-md-4 col-xs-12 col-sm-12 col-xs-12 btn ServiceProcessButtons pull-right" onClick={this.purchaseClick.bind(this)} type="submit" value="" >Purchase</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
