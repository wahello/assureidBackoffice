import React,{Component} from 'react';
import {render} from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import {Services} from '../../dashboard/reactCMS/api/Services.js';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';



class ServiceInfo extends TrackerReact(Component){
  constructor(){
    super();
    this.state ={
      serviceName         : '',
      serviceRate         : '',
      serviceDuration     : '',
      servicesDescription : '',
      id                  : '',
      "subscription" : {
        "singleServices" : Meteor.subscribe("singleServices"),
        "projectSettingsPublish" : Meteor.subscribe("projectSettingsPublish"),
        "tempServiceImages" : Meteor.subscribe("tempServiceImages"),
        // "userProfileData" : Meteor.subscribe("userProfileData"),
      }
    };
    // this.handleChange = this.handleChange.bind(this);
  }
   componentWillReceiveProps(nextProps) {
    if(!nextProps.loading){
      if(nextProps.services){
         this.setState({
             serviceName         : nextProps.services.serviceName,
             serviceRate         : nextProps.services.serviceRate,
             serviceDuration     : nextProps.services.serviceDuration,
             servicesDescription : nextProps.services.servicesDescription,
             image               : nextProps.services.image,
             id                  : nextProps.services._id,
         });
      }
    }else{
      this.setState({
             serviceName         : '',
             serviceRate         : '',
             serviceDuration     : '',
             servicesDescription : '',
             image               : '',
             id                  : '',
      });
    }
  }
  componentWillMount(){
  }
  componentWillUnmount(){
  }
  componentDidMount(){ 
  }
  backClick(event){
    event.preventDefault();
    var path = "/profile";
    browserHistory.replace(path);
  }
  proceedClick(event){
    event.preventDefault();
    var id = $(event.currentTarget).attr('id');
     console.log("id",id);
     var path = "/ServiceRequiredData/"+id;
     console.log("path",path);
     browserHistory.replace(path);
  }
  
  render(){
    return(
      <div className="outerServiceBlock col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="servieInnerBlock col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <h1 className="text-center"> {this.state.serviceName} </h1>    
          <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 outerServiceImage">
              <img src={this.state.image} className="img-responsive serviceImage" />
            </div>
            <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 serviceInfoColumn">
                  <span className="">Rate : <i className="fa fa-inr" aria-hidden="true"></i> {this.state.serviceRate}</span>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-right serviceInfoColumn">
                  <span className="">Duration : {this.state.serviceDuration}</span>
              </div> 
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 serviceInfoDesc">
                  <span className="">{this.state.servicesDescription}</span>
              </div>

            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerButtonDiv">
              <button className="col-lg-3 col-md-4 col-xs-12 col-sm-12 col-xs-12 btn ServiceProcessButtons pull-left" onClick={this.backClick.bind(this)} value="" >Back</button>
              <button className="col-lg-3 col-md-4 col-xs-12 col-sm-12 col-xs-12 btn ServiceProcessButtons pull-right" id={this.state.id} onClick={this.proceedClick.bind(this)} type="submit" value="" >Continue</button>
            </div>
            
          </div>                    
        </div>
      </div>
    );
  }
}

EditPageContainer = withTracker(({params}) => {
    var _id = params.id;
    // console.log("_id",_id);
    const postHandle = Meteor.subscribe('singleServices',_id);
    // var editServices   = this.props.params.id;
    // console.log("Param" +editServices);
    const services = Services.findOne({"_id":_id});
    // console.log('services ', services);
    const loading = !postHandle.ready();
    
    // if(_id){
      return {
          loading,
          services,
      };
    // }
})(ServiceInfo);
export default EditPageContainer;

