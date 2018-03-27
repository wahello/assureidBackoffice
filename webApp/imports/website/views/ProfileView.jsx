import React, { Component }  from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import { UserProfile } from '../forms/api/userProfile.js';
import AddressRequired from './AddressRequired.jsx';
import EmploymentRequired from './EmploymentRequired.jsx';
import AcademiceRequired from './AcademiceRequired.jsx';
import BasicInfoRequired from './BasicInfoRequired.jsx';
// import BasicForm from '../forms/BasicForm.jsx';
import CertificateRequired from './CertificateRequired.jsx';
import SkillsRequired from './SkillsRequired.jsx';
// import SkillsForm from '../forms/SkillsForm.jsx';
// import AddressViews from './AddressViews.jsx';

class ProfileView extends TrackerReact(Component){
	 constructor(props) {
    super(props);  
    this.state = {
      "firstName"        : '',
      "lastName"         : '',
      "gender"           : '',
      "dateofbirth"      : '',
      "mobileNo"         : '',
      "altMobileNo"      : '',
      "emailId"          : '',
      'education'        : [],
      'employment'       : [],
      'permanentAddress' : [],
      'currentAddress'   : [],
      "subscription"  : {
        "userprofile" : Meteor.subscribe("userprofile"),
      }  
    }; 
  }
	render(){
   if(!this.props.loading){
    return (
      <div className="content-wrapper">
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="box">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <hr className="col-lg-11 col-md-12 col-sm-12 col-xs-12 horizontalLine" />
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">
                  <i className="fa fa-file-text-o col-lg-1 col-md-1 col-sm-1 col-xs-1 viewlogo"></i> 
                  <span className="col-lg-11 col-md-11 col-sm-11 col-xs-11 viewTitle">Summary</span>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 summeryContent">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  </p>
                </div>
                <hr className="col-lg-11 col-md-12 col-sm-12 col-xs-12 horizontalLine" />
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">
                  <i className="fa fa-user col-lg-1 col-md-1 col-sm-1 col-xs-1 viewlogo"></i> 
                  <span className="col-lg-9 col-md-9 col-sm-9 col-xs-9 viewTitle">Basic Information</span>
                  {
                    // browserHistory.getCurrentLocation().pathname == "/viewProfile/"+this.props._id ?
                    //   Meteor.userId() == this.props._id ?
                    //    <i className="fa fa-pencil add-btn pull-right col-lg-1 col-md-1 col-sm-1 col-xs-1 text-right" data-toggle="modal" data-target="#basicinfoModal"></i>
                    //   :
                    //   ""
                    // :
                    // <i className="fa fa-pencil add-btn pull-right col-lg-1 col-md-1 col-sm-1 col-xs-1 text-right" data-toggle="modal" data-target="#basicinfoModal"></i>
                  }
                  <div className="modal fade" id="basicinfoModal" role="dialog">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-body">
                          <button type="button" className="close" data-dismiss="modal">&times;</button>
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <h4 className="text-center">Edit Basic Information</h4>
                              <br/>
                              {/* <BasicForm basicValues={this.props.userData}/> */}
                            </div>
                          </div>
                        </div>
                      </div> 
                    </div>
                  </div>
                </div>
                <BasicInfoRequired userData={this.props.userData}/> 
                <hr className="col-lg-11 col-md-12 col-sm-12 col-xs-12 horizontalLine" />
                <AddressRequired profileId={this.props.userData._id} permanentAddress={this.props.userData.permanentAddress} currentAddress={this.props.userData.currentAddress} currentUrl={this.props._id}/>
                <hr className="col-lg-11 col-md-12 col-sm-12 col-xs-12 horizontalLine" />  
                <AcademiceRequired key={this.props.userData._id + '-academics'} academicsData={this.props.userData.education} professionalData={this.props.userData.professionalEducation} currentUrl={this.props._id} />  
                <hr className="col-lg-11 col-md-12 col-sm-12 col-xs-12 horizontalLine" />
                <EmploymentRequired key={this.props.userData._id + '-employement'} employeeData={this.props.userData.employement} currentUrl={this.props._id} />	      
                <hr className="col-lg-11 col-md-12 col-sm-12 col-xs-12 horizontalLine" />
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noProfilePadding">
                  <i className="fa fa-certificate col-lg-1 col-md-1 col-sm-1 col-xs-1 viewlogo"></i> 
                  <span className="col-lg-10 col-md-10 col-sm-10 col-xs-10 viewTitle">Skills</span>
                  {
                    // browserHistory.getCurrentLocation().pathname == "/viewProfile/"+this.props._id ?
                    //   Meteor.userId() == this.props._id ?
                    //     <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 add-btn">
                    //       <i className="fa fa-plus add-plus pull-right" data-toggle="modal" data-target="#skillsinfo"></i>
                    //     </div>
                    //   :
                    //   ""
                    // :
                    // <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 add-btn">
                    //   <i className="fa fa-plus add-plus pull-right" data-toggle="modal" data-target="#skillsinfo"></i>
                    // </div>
                  }
                  {/* <SkillsRequired userId={this.props.userData.userId} skillData={this.props.userData.skills} currentUrl={this.props._id} /> */}
                  <div className="modal fade" id="skillsinfo" role="dialog">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-body">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <h4 className="text-center">Add Skills</h4>
                                <br/>
                                {/* <SkillsForm /> */}
                              </div>
                            </div>
                          </div>
                        </div> 
                      </div>
                  </div>
                </div>
                <hr className="col-lg-11 col-md-12 col-sm-12 col-xs-12 horizontalLine" />
                <CertificateRequired key={this.props.userData._id + '-certificate'} certificateData={this.props.userData.certificates} currentUrl={this.props._id} />
              </div>
          </div>
        </div>
        </div>
        </section>
    </div>
    );
    }else{
      return(
        <span></span>
      );
    }
  }
} 
EditPageContainer = withTracker(({props}) => {
  var currentLocation = browserHistory.getCurrentLocation();
  var splitUrl = currentLocation.pathname.split('/');
  if(splitUrl[1] == 'profileForms'){
    var _id = Meteor.userId();
  }else{
    var _id = splitUrl[3];
  }
  const postHandle = Meteor.subscribe('userprofile',_id);
  const userData  = UserProfile.findOne({"userId" : _id})|| {};
  console.log("userData",userData);
  const loading   = !postHandle.ready();
   
  return {
    loading,
    userData,
    _id,
  };
})(ProfileView);

export default EditPageContainer;