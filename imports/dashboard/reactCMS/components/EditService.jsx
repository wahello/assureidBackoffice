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
import {Services} from '../api/Services';
import {TempServiceImages} from '../api/Services';
import {browserHistory} from 'react-router';


class EditService extends TrackerReact (Component){
  constructor(props) {
	  super(props); 
    var metaContext = {id: Meteor.userId(), dir: "images" , name: "serviceImage"};
    // var uploader    = new Slingshot.Upload("myFileUploads" ,metaContext);
	  this.state = {
      serviceName         : '',
	    serviceRate         : '',
	    serviceDuration     : '',
      servicesDescription : '',
      id                  : '',
      services            : [],
      ProfileForms        : false,
       StatutoryForm       : false,
       AddressForm         : false,
       EducationForm       : false,
       WorkForm            : false,
       SkillsCertificate   : false,
       OtherInfoForm       : false,
      isUploading         : false,
      // progressValue     : "0%",
      edit                : false,
      "subscription"  : {
        "singleServices" : Meteor.subscribe("singleServices"),
        "projectSettingsPublish" : Meteor.subscribe("projectSettingsPublish"),
        "tempServiceImages" : Meteor.subscribe("tempServiceImages"),
      }  
	  }; 
    this.handleChange = this.handleChange.bind(this);
	}
  componentWillReceiveProps(nextProps) {
    if(!nextProps.loading){
      if(nextProps.services){
        console.log("nextProps.services",nextProps.services);
         this.setState({
             serviceName         : nextProps.services.serviceName,
             serviceRate         : nextProps.services.serviceRate,
             serviceDuration     : nextProps.services.serviceDuration,
             servicesDescription : nextProps.services.servicesDescription,
             image               : nextProps.services.image,
             ProfileForms        : nextProps.services.ProfileForms,
             StatutoryForm       : nextProps.services.StatutoryForm,
             AddressForm         : nextProps.services.AddressForm,
             EducationForm       : nextProps.services.EducationForm,
             WorkForm            : nextProps.services.WorkForm,
             SkillsCertificate   : nextProps.services.SkillsCertificate,
             OtherInfoForm       : nextProps.services.OtherInfoForm,
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
             ProfileForms        : false,
             StatutoryForm       : false,
             AddressForm         : false,
             EducationForm       : false,
             WorkForm            : false,
             SkillsCertificate   : false,
             OtherInfoForm       : false,
      });
    }
    console.log("nextProps.services",nextProps.services);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
   const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // console.log("name",name);
    // console.log("value",value);
    this.setState({
      [name]: value
    });
  }
  componentDidMount() {
   $("html,body").scrollTop(0);
    $(".serviceName").focus();
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
    // $('#servicesDescription').summernote({
    //   height: 190,
    //   maxHeight:190,
    //   minHeight:175,
    // });
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
  componentWillUnmount() {
      $("script[src='/js/adminLte.js']").remove(); 
     // $("link[href='/css/dashboard.css']").remove(); 
    // const tempServiceImages = TempServiceImages.find().fetch();
    // for(i=0;i<tempServiceImages.length;i++){
    //   if(!tempServiceImages[i].submitted)
    //     Meteor.call('removeS3Data',tempServiceImages[i].amazonUrl);
    // }
    // Meteor.call('removeServiceUnsubmitImages',Meteor.userId());
    // console.log('unmounted');
    if (this.serviceTracker) {
    this.serviceTracker.stop();
    }
    if (this.tempServiceImageTracker) {
      this.tempServiceImageTracker.stop();
    }
  }
  // handleClose(e){
  //   e.preventDefault();
  //   console.log('deleting ' + e.target.getAttribute('id'));
  //   if(this.props.params.id&&this.state.edit){
  //     Meteor.call('removeS3Data',e.target.getAttribute('id'));
  //     Meteor.call('updateEditService',e.target.getAttribute('id'));
  //   }
  //   Meteor.call('removeServiceUrlImages',e.target.getAttribute('id'));
  //   Meteor.call('removeS3Data',e.target.getAttribute('id'));
  // }
  handleUpload(event){
    event.preventDefault();
    let self = this;
     this.setState({isUploading: true});
     //  this.calculateProgress();
    // if (event.currentTarget.files && event.currentTarget.files[0]) {
    //     var file = event.currentTarget.files[0];
    //     if (file) {
    //         addServicesImgsToS3Function(file,self);
    //     }
    // }
    if (event.currentTarget.files && event.currentTarget.files[0]) {   
      var dataImg =event.currentTarget.files[0];   
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
      let serviceName         = this.refs.serviceName.value;
      let serviceRate         = this.refs.serviceRate.value;
      let serviceDuration     = this.refs.serviceDuration.value;
      // let servicesDescription = $('#servicesDescription').summernote('code');
      let servicesDescription = this.refs.servicesDescription.value;
      let userId              = Meteor.userId();
      var id                  = this.props.params.id;
      if(this.refs.ProfileForms.value =='true'){ var ProfileForms = true;}else{var ProfileForms = false;}
      if(this.refs.StatutoryForm.value =='true'){ var StatutoryForm = true;}else{var StatutoryForm = false;}
      if(this.refs.AddressForm.value =='true'){ var AddressForm = true;}else{var AddressForm = false;}
      if(this.refs.EducationForm.value =='true'){ var EducationForm = true;}else{var EducationForm = false;}
      if(this.refs.WorkForm.value =='true'){ var WorkForm = true;}else{var WorkForm = false;}
      if(this.refs.SkillsCertificate.value =='true'){ var SkillsCertificate = true;}else{var SkillsCertificate = false;}
      if(this.refs.OtherInfoForm.value =='true'){ var OtherInfoForm = true;}else{var OtherInfoForm = false;}
       
      if (id) {
        let lastModified        = new Date();
         Meteor.call('updateService',id,ProfileForms,StatutoryForm,AddressForm,EducationForm,WorkForm,SkillsCertificate,OtherInfoForm,serviceName,serviceRate,serviceDuration,servicesDescription,userId,lastModified,(error,result)=>{
            if(error){
                console.log(error.reason);
            }else{               
                swal("Done","Your service has been Updated!.","success");
                $('.uploadedImageFromLocl').attr('src', "");
                $("#serviceName").val("");
                var path = "/admin/ListOfServices";
                browserHistory.replace(path);
                 $('.uploadedImageFromLocl').attr('src', "");
                  $(".serviceName").val("");   
                  $(".serviceRate").val("");   
                  $(".serviceDuration").val("");   
                  $(".servicesDescription").val("");  
                  // $('#servicesDescription').summernote('code','');
            }
        });
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
              <li className="active">Edit Service</li>
            </ol>
          </section>
          {/* Main content */}
          <section className="content">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="box box-primary">
                  <div className="box-header with-border">
                    <h3 className="box-title">
                      Edit Service
                    </h3>
                    <div className="box-tools pull-right">
                      {/*<button type="button" className="btn btn-box-tool btn-minus" data-widget="collapse">
                        <i className="fa fa-minus" />
                      </button>
                      <div className="btn-group">
                        <button type="button" className="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">
                          <i className="fa fa-wrench" /></button>
                        <ul className="dropdown-menu" role="menu">
                          <li>
                            <a href="#">Action</a>
                          </li>
                          <li>
                            <a href="#">Another action </a>
                          </li>
                          <li>
                            <a href="#">Something else here</a>
                          </li>
                          <li className="divider" />
                          <li>
                            <a href="#">
                            Separated link
                            </a>
                          </li>
                        </ul>
                      </div>
                      <button type="button" className="btn btn-box-tool" data-widget="remove">
                        <i className="fa fa-times" />
                      </button>*/}
                    </div>
                  </div>
                  {/* /.box-header */}
                  <div className="box-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="notifWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
                				
                					<div className="create-email-template-wrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
                						<form className="newTemplateForm">
                              <div className="row inputrow">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="form-group">
                                   <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Service Name<span className="astrick">*</span>:</label>
                                     <input type="text" ref="serviceName" id="serviceName" name="serviceName" value={this.state.serviceName}  onChange={this.handleChange} className="templateName serviceName col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid" />
                                  </div>
                                </div>
                              </div>
                              <div className="row inputrow">
                								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                									<div className="form-group">
                									 <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Service Rate<span className="astrick">*</span>:</label>
                								     <input type="number" ref="serviceRate" id="serviceRate" name="serviceRate" value={this.state.serviceRate}  onChange={this.handleChange} className="templateName serviceRate col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid" />
                									</div>
                								</div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="form-group">
                                   <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Service Duration<span className="astrick">*</span>:</label>
                                     <input type="text" ref="serviceDuration" id="serviceDuration" name="serviceDuration" value={this.state.serviceDuration}  onChange={this.handleChange} className="templateName serviceDuration col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid" />
                                  </div>
                                </div>
                							</div>
                              <div className="row inputrow">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="form-group">
                                      <label className="label-category">Description<span className="astrick">*</span>:</label>
                                      {/*<div id="servicesDescription" className="col-lg-12 col-md-12 col-sm-12 col-xs-12" name="servicesDescription" ref="servicesDescription" value={this.state.servicesDescription} onChange={this.handleChange} ></div>*/}
                                      <textarea name="servicesDescription" ref="servicesDescription" value={this.state.servicesDescription} onChange={this.handleChange} className="form-control servicesDescription col-lg-12 col-md-12 col-sm-12 col-xs-12" rows="10"></textarea>                            
                                   </div>
                                </div>
                              </div>
                            <div className="row inputrow subjectRow">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="col-lg-6 uploadedImageFromLocl1">
                                     <div className="form-group subjectDiv">
                                       <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Image Upload<span className="astrick">*</span>:</label>
                                        <input type="file" ref="serviceImageFile" id="s3file" name="serviceImageFile"  onChange={this.handleUpload.bind(this)}  className="subject col-lg-12 col-md-12 col-sm-12 col-xs-12 inputValid" />      
                                      </div>  
                                  </div>
                                  <div className="col-lg-6 uploadedImageFromLocl2">     
                                      <div className="uploadedImageFromLocl3">        
                                          <img src={this.state.image} alt="" className="img-responsive uploadedImageFromLocl"/>    
                                      </div>
                                  </div>
                                
                                </div>
                              </div>

                            <div className="row inputrow subjectRow">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <div className="col-lg-12 uploadedImageFromLocl1">
                                     <div className="form-group subjectDiv">
                                       <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 label-category">Required Information for verification<span className="astrick">*</span>:</label>
                                      </div> 
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="form-group">
                                      <input type="checkbox" name="ProfileForms"  onChange={this.handleChange} ref="ProfileForms" value={this.state.ProfileForms} checked={this.state.ProfileForms}/> Basic Information
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
                              </div>
                						<div className="savetemp col-lg-12 col-md-12 col-sm-12 col-xs-12">
                								<button onClick={this.handleSubmit.bind(this)} type="submit" className="col-lg-2 col-md-3 col-sm-6 col-xs-12 btn btn-primary pull-right sendtxtmsgbtn">UPDATE</button>
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
EditPageContainer = withTracker(({params}) => {
    var _id = params.id;
    const postHandle = Meteor.subscribe('singleServices',_id);
	  // var editServices   = this.props.params.id;
    // console.log("Param" +editServices);
    const services = Services.findOne({"_id":_id})|| {};
    const loading = !postHandle.ready();
    
    if(_id){
      return {
          loading,
          services,
      };
    }
})(EditService);

export default EditPageContainer;


