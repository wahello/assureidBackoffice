import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import Validation from 'react-validation'; 
import validator from 'validator';
import {Tracker} from 'meteor/tracker';
import { Link } from 'react-router';
import {Services} from '../api/Services.js';
import {TempServiceImages} from '../api/Services.js';
// import { ChecklistFieldExpert } from '../api/Services.js';
import {browserHistory} from 'react-router';

export default class ServicePage extends TrackerReact (Component){ 
  constructor(props) {
  super(props);
  this.state = {
      serviceName       : '',
      serviceRate       : '',
      serviceFor        : 'user',
      serviceDuration   : '',
      servicesDescription : '',
      id                : '',
      // fieldChecklist    : '',
      services          : [], 
      isUploading       : false,
      progressValue     : "0%",
      serviceRequired   : 'ProfileForms',
      "subscription"  : {
        "singleServices" : Meteor.subscribe("singleServices"),
        "projectSettingsPublish" : Meteor.subscribe("projectSettingsPublish"),
        "tempServiceImages" : Meteor.subscribe("tempServiceImages"),
      } 
  };
    this.handleChange = this.handleChange.bind(this);
}
  // calculateProgress(){
  //   this.uploadComputation = Tracker.autorun(() => {
  //        const uploadProgress = Math.round(this.state.upload.progress() * 100);
  //        if (!isNaN(uploadProgress)) this.setState({progressValue: uploadProgress +"%" });
  //   });
  // }
  handleChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    
    const name = target.name;
    this.setState({
      [name] : value
    });
  }
  componentDidMount() {
    $("html,body").scrollTop(0);
    if (!$("#adminLte").length>0 && !$('body').hasClass('adminLte')) {
     var adminLte = document.createElement("script");
     adminLte.type="text/javascript"; 
     adminLte.src = "/js/adminLte.js"; 
     $("body").append(adminLte); 
    }
    this.serviceTracker = Tracker.autorun( ()=> {
      Meteor.subscribe("services"); 
      const services = Services.find().fetch();
      this.setState({services: services});
    });
    this.tempServiceImageTracker = Tracker.autorun(()=>{
      Meteor.subscribe('tempServiceImages');
      const tempServiceImages = TempServiceImages.find().fetch();
      this.setState({tempServiceImages});
    });
    $("#serviceForm").validate({
        rules: {
          serviceName: {
            required: true, 
          },
          serviceRate: {
            required: true,
          },  
          servicesDescription: {
            required: true,
          },  
          // serviceRate: {
          //   required: true,
          // },  
        },
        messages: {
          serviceName: {
            required: "Please enter Service Name!",
          },
          serviceRate: {
            required: "Please enter Service Rate!",
          },
          servicesDescription: {
            required: "Please enter Services Description!",
          },
        }
    });
  }
  componentWillUnmount() {
     $("script[src='/js/adminLte.js']").remove();  

    if (this.serviceTracker) {
    this.serviceTracker.stop();
    }
    if (this.tempServiceImageTracker) {
      this.tempServiceImageTracker.stop();
    }
  }
  handleUpload(event){
    event.preventDefault();
    let self = this;
    Session.set("uploadServiceProgressPercent","");
      if (event.currentTarget.files && event.currentTarget.files[0]) { 
        var dataImg = event.currentTarget.files[0];  
         if(dataImg.type == "image/jpeg" || dataImg.type == "image/png"){      
           var reader = new FileReader();        reader.onload = function (e) {          
             $('.uploadedImageFromLocl').attr('src', e.target.result);      
           };        
           reader.readAsDataURL(event.currentTarget.files[0]);      
           var file = event.currentTarget.files[0];      
            if (file) {         
              addServicesImgsToS3Function(file,self);       
            }   
         } else { 
          swal({    
             position: 'top-right',     
             type: 'error',    
             title: 'Please select image',       
             showConfirmButton: false,      
             timer: 1500      
           });   
        }
      }
  }

  handleSubmit(e){
    e.preventDefault();
      if($("#serviceForm").valid()){ 
        var serviceName       = this.refs.serviceName.value;
        // 
        var serviceRate       = this.refs.serviceRate.value;
        // 
        var serviceDayNumbers = this.refs.serviceDayNumbers.value;
        // var serviceDuration   = this.refs.serviceDuration.value;
        // console.log('serviceDuration :',serviceDuration); 
        // let servicesDescription = $('#servicesDescription').summernote('code');
        var servicesDescription  = this.refs.servicesDescription.value;
        // var serviceFor           = $('input[name=serviceFor]:checked', '.newTemplateForm').val();
        var serviceFor          = "user";
        var serviceRequired     = this.state.serviceRequired;
        // console.log("serviceRequired",serviceRequired);        
        var userId              = Meteor.userId();
        var pageNameExist       = Services.findOne({'serviceName': serviceName});
        var lastModified        = "";
         if(pageNameExist){
          swal("Oops...!","This service name is already taken!","error");
          }else{
              Meteor.call('createService',serviceName,serviceRate,serviceDayNumbers,servicesDescription,serviceRequired,userId,lastModified,serviceFor,(error,result)=>{
                  if(error){
                      
                  }else{                     
                     swal("Done","Your page has been Created!.","success");
                      $('.uploadedImageFromLocl').attr('src', "");
                      $('.uploadServiceImage').val("");
                      $(".serviceName").val("");  
                      $(".serviceRate").val("");  
                      $(".serviceDuration").val("");  
                      $(".servicesDescription").val("");  
                      // $('#servicesDescription').summernote('code','');
                  }
              });
          }
      }    
  }
  getUploadImagePercentage(){
    var uploadProgressPercent = Session.get("uploadServiceProgressPercent");
    console.log("uploadProgressPercent",uploadProgressPercent);
    if(uploadProgressPercent){
        var percentVal = parseInt(uploadProgressPercent);
        if(percentVal){
            
            var styleC = {
                width:percentVal + "%",
                display:"block",
            }
            var styleCBar = {
                display:"block",
                marginTop:5,
            }
        }
        if(!percentVal){
            var percentVal = 0;

            var styleC = {
                width:0 + "%",
                display:"none",
            }
            var styleCBar = {
                display:"none",
                marginTop:5,
            }
        }
        if(parseInt(percentVal)==100){
            setTimeout(()=>{ 
                Session.set("uploadServiceProgressPercent",0); 
            }, 5000);
            
             
        }
        return (
          <div className="progress"  style= {styleCBar}>
            <div className="progress-bar progress-bar-striped active" role="progressbar"
            aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style= {styleC}>
              {percentVal} %
            </div>
          </div>
        );
    }
  }
  render(){
   // $('.note-editable').html(this.state.servicesDescription);
    return(
      <div>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <h1> Service Management </h1>
            <ol className="breadcrumb">
              <li>
                <a href="#"><i className="fa fa-briefcase" />Service Management</a></li>
              <li className="active">Add Service</li>
            </ol>
          </section>
          {/* Main content */}
          <section className="content">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="box box-primary">
                  <div className="box-header with-border">
                    <h3 className="box-title">
                      Add Service
                    </h3>
                  </div>
                  {/* /.box-header */}
                  <div className="box-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="create-email-template-wrapper col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
                            <form className="newTemplateForm" id="serviceForm">
                              <div className="row inputrow">
                                {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="form-group">
                                    <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Service For:</label>
                                    <label className="radio-inline" style={{fontSize : '13' + 'px'}}><input value="user" type="radio" name="serviceFor" ref="serviceFor" checked={this.state.serviceFor === 'user'} onChange={this.handleChange} />User</label>
                                    <label className="radio-inline" style={{fontSize : '13' + 'px', marginLeft : '30' + 'px'}}><input value="company" type="radio" name="serviceFor" checked={this.state.serviceFor === 'company'} ref="serviceFor" onChange={this.handleChange}/>Company</label>
                                  </div>
                                </div>*/}
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="form-group">
                                   <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Service Name:</label>
                                     <input type="text" ref="serviceName" id="serviceName" name="serviceName" onChange={this.handleChange} className="templateName serviceName col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid" />
                                  </div>
                                </div>
                              </div>
                              <div className="row inputrow">
                                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                  <div className="form-group">
                                    <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Service Rate:</label>
                                    <input type="number" ref="serviceRate" id="serviceRate" name="serviceRate"  onChange={this.handleChange} className="templateName serviceRate col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid" />
                                  </div> 
                                </div>
                                 <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                  <div className="form-group">
                                   <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Duration (In Days):</label>
{/*                                      <label className="col-lg-4 col-md-12 col-sm-12 col-xs-12 label-category">Service Rate:</label>
*/}                                 <div className="col-lg-12 servicesDays">
                                      <input type="number" className="templateName serviceRate col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control inputValid"
                                      ref="serviceDayNumbers" id="serviceDayNumbers" name="serviceDayNumbers"  onChange={this.handleChange}/>
                                    </div>
                                    {/*<div className="col-lg-8">
                                      <select className="form-control inputText serviceDuration col-lg-8 " ref="serviceDuration" value={this.state.serviceDuration} onChange={this.handleChange} id="serviceDuration" name="serviceDuration" required>
                                        <option value="Days">Days</option>
                                        <option value="Weeks">Weeks</option>
                                        <option value="Months">Months</option>
                                      </select> 
                                    </div>*/}                         
                                  </div>

                                  {/*<div className="form-group">
                                   <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">No of Days:</label>
                                     <input type="text" ref="serviceDuration" id="serviceDuration" name="serviceDuration" onChange={this.handleChange} className="templateName serviceDuration col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid" />
                                  </div>*/}
                                </div>
                              </div>
                              <div className="row inputrow">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="form-group">
                                      <label className="label-category">Description:</label>
                                      {/*<div id="servicesDescription" className="col-lg-12 col-md-12 col-sm-12 col-xs-12" name="servicesDescription" ref="servicesDescription" value={this.state.servicesDescription} onChange={this.handleChange} ></div>*/}
                                      <textarea name="servicesDescription" ref="servicesDescription" id="servicesDescription"  onChange={this.handleChange} className="form-control servicesDescription col-lg-12 col-md-12 col-sm-12 col-xs-12" rows="5"></textarea>                           
                                   </div>
                                </div>
                              </div>
                             <div className="row inputrow subjectRow">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="col-lg-6 uploadedImageFromLocl1">
                                     <div className="form-group subjectDiv">
                                       <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Image Upload<span className="astrick">*</span>:</label>
                                        <input type="file" ref="serviceImageFile" id="s3file" name="serviceImageFile"  onChange={this.handleUpload.bind(this)}  className="subject uploadServiceImage col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid"  required/>     
                                      </div> 
                                  </div>

                                  <div className="col-lg-6 uploadedImageFromLocl2">    
                                      <div className="uploadedImageFromLocl3">       
                                          <img src="" alt="" className="img-responsive uploadedImageFromLocl"/>   
                                      </div>
                                  </div>
                               
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                  {this.getUploadImagePercentage()}
                                </div>
                              </div>
                             {/* <div className="row inputrow">
                                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                  <div className="form-group">
                                    <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Checklist for field expert:</label>
                                    <input type="text" ref="fieldChecklist" id="fieldChecklist" name="fieldChecklist"  onChange={this.handleChange} className="templateName serviceRate col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid" />
                                  </div> 
                                </div>
                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 checkListOuterBlock">
                                  <button className="btn btn-primary sendtxtmsgbtn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.addCheckList.bind(this)}>ADD</button>
                                </div>
                              </div>
                              <div className="row inputrow">
                                {this.props.checklistFieldExpert ?
                                  this.props.checklistFieldExpert.map((checklistDetails,index)=> {
                                    return(
                                       <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 checkListDataOuter" key={index}>
                                         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 checkListDataInner">
                                            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 taskName">
                                              <p>{checklistDetails.task}</p> 
                                            </div>
                                            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 deleteTask">
                                              <i className="fa fa-times" id={checklistDetails._id} onClick={this.deleteTask.bind(this)}></i>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                  })
                                  :
                                  ""
                                }
                              </div>*/}
                              {/*<div className="row inputrow subjectRow">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="col-lg-12 uploadedImageFromLocl1">
                                     <div className="form-group subjectDiv">
                                       <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Required Information for verification<span className="astrick">*</span>:</label>
                                      </div> 
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="form-group">
                                      <input type="radio" name="ProfileForms"  onChange={this.handleChange} ref="ProfileForms" value={this.state.ProfileForms} checked={this.state.ProfileForms}/> Basic Information
                                    </div> 
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="form-group">
                                      <input type="checkbox" name="StatutoryForm" onChange={this.handleChange} ref="StatutoryForm" value={this.state.StatutoryForm} checked={this.state.StatutoryForm}/> Identity Information
                                    </div> 
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="form-group ">
                                          <input type="checkbox" name="AddressForm" onChange={this.handleChange} ref="AddressForm" value={this.state.AddressForm} checked={this.state.AddressForm}/> Address Information
                                    </div> 
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="form-group ">
                                          <input type="checkbox" name="EducationForm" onChange={this.handleChange} ref="EducationForm" value={this.state.EducationForm} checked={this.state.EducationForm}/> Academic Information
                                    </div> 
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="form-group">
                                          <input type="checkbox" name="WorkForm" onChange={this.handleChange} ref="WorkForm" value={this.state.WorkForm} checked={this.state.WorkForm}/> Employment Information
                                    </div> 
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="form-group">
                                          <input type="checkbox" name="SkillsCertificate" onChange={this.handleChange} ref="SkillsCertificate" value={this.state.SkillsCertificate} checked={this.state.SkillsCertificate}/> Skills & Certification Information
                                    </div> 
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="form-group">
                                          <input type="checkbox" name="OtherInfoForm" onChange={this.handleChange} ref="OtherInfoForm" value={this.state.OtherInfoForm} checked={this.state.OtherInfoForm}/> Other Information
                                    </div> 
                                  </div>
                                </div>
                              </div>*/}  
                              <div className="row inputrow subjectRow">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="col-lg-12 uploadedImageFromLocl1">
                                     <div className="form-group subjectDiv">
                                       <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Required Information for verification<span className="astrick">*</span>:</label>
                                      </div> 
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="form-group">
                                      <input type="radio" name="serviceRequired"  onChange={this.handleChange} ref="serviceRequired" value="ProfileForms" checked={this.state.serviceRequired === 'ProfileForms'}/> Basic Information
                                    </div> 
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="form-group">
                                      <input type="radio" name="serviceRequired" onChange={this.handleChange} ref="serviceRequired" value="StatutoryForm" checked={this.state.serviceRequired === 'StatutoryForm'}/> Identity Information
                                    </div> 
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="form-group ">
                                      <input type="radio" name="serviceRequired" onChange={this.handleChange} ref="serviceRequired" value="AddressForm" checked={this.state.serviceRequired === 'AddressForm'}/> Address Information
                                    </div> 
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="form-group ">
                                     <input type="radio" name="serviceRequired" onChange={this.handleChange} ref="serviceRequired" value="EducationForm" checked={this.state.serviceRequired === 'EducationForm'}/> Academic Information
                                    </div> 
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="form-group">
                                      <input type="radio" name="serviceRequired" onChange={this.handleChange} ref="serviceRequired" value="WorkForm" checked={this.state.serviceRequired  === 'WorkForm'}/> Employment Information
                                    </div> 
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="form-group">
                                      <input type="radio" name="serviceRequired" onChange={this.handleChange} ref="serviceRequired" value="SkillsCertificate" checked={this.state.serviceRequired  === 'SkillsCertificate'}/> Skills & Certification Information
                                    </div> 
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="form-group">
                                     <input type="radio" name="serviceRequired" onChange={this.handleChange} ref="serviceRequired" value="OtherInfoForm" checked={this.state.serviceRequired  === 'OtherInfoForm'}/> Other Information
                                    </div> 
                                  </div>
                                </div>
                              </div>
                              <div className="savetemp col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <button onClick={this.handleSubmit.bind(this)} type="submit" className="col-lg-2 col-md-3 col-sm-6 col-xs-12 btn btn-primary pull-right sendtxtmsgbtn">ADD</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* /.content */}
        </div>
        {/* /.content-wrapper */}
      </div>
    );
  }
}
// AddServicesContainer = withTracker(({props}) => {
//     const postHandle    = Meteor.subscribe("checklistFieldExpert");
//     const loading       = !postHandle.ready();
//     const checklistFieldExpert  = ChecklistFieldExpert.find({}).fetch()||[];
//     //   
//     return {
//       loading,
//       // checklistFieldExpert,
//     };
// })(ServicePage);
// export default AddServicesContainer;